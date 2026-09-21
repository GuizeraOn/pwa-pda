import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// Chave para cache de autorização no localStorage
const AUTH_CACHE_KEY = 'protocolo_auth_cache'
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 dias

function getAuthCache(email) {
  try {
    const raw = localStorage.getItem(AUTH_CACHE_KEY)
    if (!raw) return null
    const cache = JSON.parse(raw)
    if (cache.email !== email) return null
    if (cache.expiresAt < Date.now()) return null
    return cache.authorized
  } catch { return null }
}

function setAuthCache(email, authorized) {
  try {
    localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify({
      email,
      authorized,
      expiresAt: Date.now() + CACHE_TTL_MS,
    }))
  } catch {}
}

function clearAuthCache() {
  try { localStorage.removeItem(AUTH_CACHE_KEY) } catch {}
}

// ── Tela de loading ────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-4 bg-background px-5">
      <div
        className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: 'hsl(var(--primary) / .3)', borderTopColor: 'hsl(var(--primary))' }}
      />
      <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Verificando acceso…
      </p>
    </div>
  )
}

// ── Tela de acesso negado ──────────────────────────────────────────────
function AccessDeniedScreen({ email, onBack }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-10 bg-background">
      <div className="w-full max-w-sm text-center">
        <div
          className="mx-auto mb-5 w-16 h-16 rounded-[18px] flex items-center justify-center"
          style={{ background: 'hsl(var(--accent) / .12)' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'hsl(var(--accent))' }}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M15 9l-6 6"/>
            <path d="M9 9l6 6"/>
          </svg>
        </div>
        <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
          Acceso no encontrado
        </h2>
        <p className="text-sm mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          No encontramos una compra aprobada asociada a:
        </p>
        <p className="font-semibold text-sm mb-5 break-all" style={{ color: 'hsl(var(--foreground))' }}>
          {email}
        </p>
        <p className="text-xs mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Si realizaste la compra con otro correo o crees que es un error,
          contáctanos por WhatsApp y lo resolvemos.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="w-full py-4 rounded-[14px] font-semibold text-sm tracking-wide transition-all active:scale-[.98]"
          style={{
            background: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
          }}
        >
          Intentar con otro correo
        </button>
      </div>
    </div>
  )
}

// ── Componente principal: processa o retorno do magic link ─────────────
export default function AuthCallback({ onLogin, onDenied }) {
  const [status, setStatus] = useState('loading') // 'loading' | 'denied'
  const [email, setEmail] = useState('')

  useEffect(() => {
    let cancelled = false

    async function handleCallback() {
      try {
        // Supabase detecta o ?code= na URL e troca por uma sessão
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error || !session) {
          console.error('[AuthCallback] Sem sessão após magic link:', error?.message)
          // Volta para login se não tiver sessão válida
          onDenied(null)
          return
        }

        const userEmail = session.user?.email ?? ''
        if (cancelled) return
        setEmail(userEmail)

        // Verifica cache local primeiro (evita chamada desnecessária à API)
        const cached = getAuthCache(userEmail)
        if (cached === true) {
          onLogin(userEmail)
          return
        }
        if (cached === false) {
          setStatus('denied')
          return
        }

        // Chama a Vercel Function para verificar na planilha
        const res = await fetch('/api/check-purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail }),
        })

        if (!res.ok) {
          // Em caso de erro de servidor, deixa entrar (fail open) para não
          // bloquear compradores legítimos por falha técnica
          console.error('[AuthCallback] Erro ao verificar compra:', res.status)
          onLogin(userEmail)
          return
        }

        const { authorized } = await res.json()
        if (cancelled) return

        // Salva no cache por 7 dias
        setAuthCache(userEmail, authorized)

        if (authorized) {
          onLogin(userEmail)
        } else {
          // Faz logout do Supabase para limpar a sessão não autorizada
          await supabase.auth.signOut()
          clearAuthCache()
          setStatus('denied')
        }
      } catch (err) {
        console.error('[AuthCallback] Erro inesperado:', err)
        // Fail open — não bloqueia por erro técnico
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user?.email) {
          onLogin(session.user.email)
        } else {
          onDenied(null)
        }
      }
    }

    handleCallback()
    return () => { cancelled = true }
  }, [onLogin, onDenied])

  if (status === 'loading') return <LoadingScreen />

  if (status === 'denied') {
    return (
      <AccessDeniedScreen
        email={email}
        onBack={async () => {
          await supabase.auth.signOut()
          clearAuthCache()
          onDenied(null)
        }}
      />
    )
  }

  return null
}

// Exporta helpers para uso no App.jsx
export { getAuthCache, setAuthCache, clearAuthCache }
