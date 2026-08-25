import { useState } from 'react'

export default function InstallBanner({ onInstall, isInstalled, isIOS }) {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem('protocolo_install_banner_dismissed') === 'true'
    } catch {
      return false
    }
  })

  if (isInstalled || dismissed) return null

  const handleDismiss = (e) => {
    e.stopPropagation()
    setDismissed(true)
    try {
      localStorage.setItem('protocolo_install_banner_dismissed', 'true')
    } catch {}
  }

  return (
    <div
      onClick={onInstall}
      className="mx-4 mb-4 p-4 rounded-[20px] border flex items-center justify-between gap-3 relative overflow-hidden cursor-pointer transition-all active:scale-[.98] shadow-sm animate-fade"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--green-pale)))',
        borderColor: 'hsl(var(--primary) / .25)',
      }}
      role="banner"
    >
      {/* Botão sutil de fechar banner */}
      <button
        onClick={handleDismiss}
        className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: 'hsl(var(--muted-foreground))' }}
        aria-label="Ocultar aviso de instalación"
      >
        ✕
      </button>

      <div className="flex items-center gap-3.5 pr-4">
        <div
          className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm border"
          style={{
            background: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            borderColor: 'hsl(var(--primary) / .2)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
            <path d="M12 6v6" />
            <path d="m9 9 3 3 3-3" />
          </svg>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-display font-bold text-sm leading-tight text-foreground">
              Instala la App en tu Móvil
            </p>
            <span
              className="text-[.65rem] font-bold px-2 py-0.2 rounded-full uppercase tracking-wider"
              style={{
                background: 'hsl(var(--accent-pale))',
                color: 'hsl(var(--accent))',
              }}
            >
              Gratis
            </span>
          </div>
          <p className="text-xs mt-0.5 leading-tight" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {isIOS ? 'Toca para ver cómo agregar a inicio' : 'Acceso rápido con 1 toque en tu pantalla'}
          </p>
        </div>
      </div>

      <button
        className="px-3.5 py-2 rounded-[12px] font-bold text-xs shrink-0 transition-transform shadow-sm flex items-center gap-1.5"
        style={{
          background: 'hsl(var(--primary))',
          color: '#fff',
        }}
        tabIndex={-1}
      >
        Instalar
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
