import { useState } from 'react'

function LungsIcon() {
  return (
    <svg width="50" height="52" viewBox="0 0 50 52" fill="none" aria-hidden="true">
      <path d="M25 8 C25 8 25 18 25 26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M25 14 C22 14 18 14 14 18 C8 24 8 34 8 38 C8 44 12 48 17 46 C21 44 23 40 25 36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M25 14 C28 14 32 14 36 18 C42 24 42 34 42 38 C42 44 38 48 33 46 C29 44 27 40 25 36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="12" cy="30" r="2.5" fill="white" opacity=".35"/>
      <circle cx="38" cy="30" r="2.5" fill="white" opacity=".35"/>
      <circle cx="10" cy="38" r="2" fill="white" opacity=".3"/>
      <circle cx="40" cy="38" r="2" fill="white" opacity=".3"/>
      <circle cx="16" cy="43" r="2.5" fill="white" opacity=".35"/>
      <circle cx="34" cy="43" r="2.5" fill="white" opacity=".35"/>
      <path d="M14 22 C14 22 11 26 11 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
      <path d="M36 22 C36 22 39 26 39 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
    </svg>
  )
}

function LeafDeco() {
  return (
    <svg width="80" height="80" viewBox="0 0 140 140" fill="none" aria-hidden="true">
      <path d="M10 130 C10 130 40 80 80 60 C120 40 130 10 130 10 C130 10 100 40 80 70 C60 100 30 120 10 130Z" fill="currentColor"/>
    </svg>
  )
}

export default function Login({ onLogin, pwa }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (email.includes('@') && email.includes('.')) {
      onLogin(email.trim())
    } else {
      setError(true)
    }
  }

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center px-5 py-10 overflow-hidden bg-background">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, hsl(var(--green-pale)) 0%, transparent 50%, hsl(var(--accent-pale)) 100%)',
          opacity: .55,
        }}
      />

      {/* Leaf decorations */}
      <div className="absolute top-0 left-0 text-primary opacity-10 pointer-events-none">
        <LeafDeco />
      </div>
      <div className="absolute bottom-0 right-0 text-accent opacity-10 pointer-events-none rotate-180">
        <LeafDeco />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-sm flex flex-col items-center animate-fade">
        {/* Brand mark */}
        <div className="mb-6 flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 rounded-[22px] flex items-center justify-center shadow-lg"
            style={{ background: 'hsl(var(--primary))' }}
          >
            <LungsIcon />
          </div>
          <div className="text-center">
            <h1 className="font-display text-[1.85rem] font-bold text-foreground leading-tight">
              El Protocolo<br />
              <em className="not-italic" style={{ color: 'hsl(var(--accent))' }}>del</em>
              {' '}
              <span>Vinagre</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 tracking-wide">
              Programa natural de 21 días
            </p>
          </div>
        </div>

        {/* Login card */}
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-[24px] p-7 shadow-xl border"
          style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
          }}
        >
          <label
            htmlFor="email"
            className="block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Tu correo electrónico
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="nombre@correo.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(false) }}
            className="w-full rounded-[14px] px-4 py-4 text-base outline-none transition-colors border-2 bg-background"
            style={{
              borderColor: error ? 'hsl(var(--accent))' : 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
            onFocus={e => e.target.style.borderColor = 'hsl(var(--primary))'}
            onBlur={e => e.target.style.borderColor = error ? 'hsl(var(--accent))' : 'hsl(var(--border))'}
          />
          {error && (
            <p className="text-sm mt-2" style={{ color: 'hsl(var(--accent))' }}>
              Ingresa un correo válido para continuar
            </p>
          )}
          <button
            type="submit"
            className="w-full mt-5 py-[18px] rounded-[14px] font-semibold text-base tracking-wide transition-all active:scale-[.98]"
            style={{
              background: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              boxShadow: '0 4px 18px hsla(var(--primary) / .28)',
            }}
          >
            Ingresar al Programa
          </button>
        </form>

        {/* Trust line */}
        <div className="flex items-center gap-2 mt-5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Acceso seguro y privado — solo para ti
        </div>

        {/* Install app shortcut button on Login screen */}
        {pwa && !pwa.isInstalled && (
          <button
            type="button"
            onClick={pwa.promptInstall}
            className="mt-5 flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full border transition-all active:scale-95"
            style={{
              background: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
              <path d="M12 6v6" />
              <path d="m9 9 3 3 3-3" />
            </svg>
            Instalar app en tu celular
          </button>
        )}
      </div>
    </div>
  )
}
