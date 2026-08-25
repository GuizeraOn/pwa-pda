import { useState, useEffect } from 'react'

export default function InstallModal({ isOpen, onClose, defaultTab = 'ios', onTriggerNative, isNativeAvailable }) {
  const [tab, setTab] = useState(defaultTab)

  // Sincroniza a tab ativa sempre que o modal abre ou a prop muda
  useEffect(() => {
    if (isOpen && defaultTab) {
      setTab(defaultTab)
    }
  }, [isOpen, defaultTab])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop com desfoque */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-[430px] rounded-t-[28px] sm:rounded-[28px] p-6 max-h-[92dvh] overflow-y-auto no-scrollbar border z-10 animate-slide-up shadow-2xl"
        style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))',
          color: 'hsl(var(--foreground))',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-modal-title"
      >
        {/* Barra superior de arrasto (mobile indicator) */}
        <div className="w-12 h-1.5 bg-black/15 dark:bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm border"
              style={{
                background: 'linear-gradient(135deg, #567856, #3f5b3f)',
                borderColor: 'hsl(var(--border))',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F4EFE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v8" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m16 6-4-4-4 4" />
                <path d="M16 18a4 4 0 0 0-8 0" />
              </svg>
            </div>
            <div>
              <h2 id="install-modal-title" className="font-display font-bold text-[1.2rem] leading-tight text-foreground">
                Instalar en tu Pantalla
              </h2>
              <p className="text-xs font-medium mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Acceso rápido, sin ocupar memoria y funciona sin conexión
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all active:scale-95"
            style={{
              background: 'hsl(var(--muted) / 0.5)',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--muted-foreground))',
            }}
            aria-label="Cerrar modal de instalación"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Seletor de Abas (Segmented Control iPhone / Android) */}
        <div
          className="flex p-1 rounded-[16px] mb-5 border"
          style={{
            background: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
          }}
        >
          <button
            onClick={() => setTab('ios')}
            className="flex-1 py-2.5 px-3 rounded-[12px] font-semibold text-xs transition-all flex items-center justify-center gap-2"
            style={{
              background: tab === 'ios' ? 'hsl(var(--card))' : 'transparent',
              color: tab === 'ios' ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
              boxShadow: tab === 'ios' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.92.04-2.03.62-2.69 1.37-.58.65-1.09 1.71-1.05 2.74 1.03.08 2.11-.51 2.73-1.26z"/>
            </svg>
            iPhone (Safari)
          </button>

          <button
            onClick={() => setTab('android')}
            className="flex-1 py-2.5 px-3 rounded-[12px] font-semibold text-xs transition-all flex items-center justify-center gap-2"
            style={{
              background: tab === 'android' ? 'hsl(var(--card))' : 'transparent',
              color: tab === 'android' ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
              boxShadow: tab === 'android' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.411 13.8566 8.1 12 8.1s-3.5902.311-5.1368.8497L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
            </svg>
            Android (Chrome)
          </button>
        </div>

        {/* ── CONTEÚDO DA ABA: IPHONE / SAFARI ──────────────────────────────── */}
        {tab === 'ios' && (
          <div className="space-y-3.5 animate-fade">
            {/* Passo 1 */}
            <div
              className="p-4 rounded-[18px] border flex items-start gap-3.5"
              style={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: 'hsl(var(--primary))', color: '#fff' }}
              >
                1
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Toca en el botón <span className="font-bold text-accent underline underline-offset-2">Compartir</span>
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  En la barra inferior de Safari, presiona el ícono del cuadrado con la flecha hacia arriba.
                </p>
              </div>
              {/* Ícone Safari Share visual */}
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border"
                style={{
                  background: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(210 100% 50%)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </div>
            </div>

            {/* Passo 2 */}
            <div
              className="p-4 rounded-[18px] border flex items-start gap-3.5"
              style={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: 'hsl(var(--primary))', color: '#fff' }}
              >
                2
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Elige <span className="font-bold text-accent">"Agregar a Inicio"</span>
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Baja por el menú de opciones hasta encontrar el ícono del cuadrado con un signo más (+).
                </p>
              </div>
              {/* Ícone Add to Home Screen */}
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border"
                style={{
                  background: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
            </div>

            {/* Passo 3 */}
            <div
              className="p-4 rounded-[18px] border flex items-start gap-3.5"
              style={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: 'hsl(var(--primary))', color: '#fff' }}
              >
                3
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Presiona <span className="font-bold text-accent">"Agregar"</span>
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  En la esquina superior derecha, toca Agregar para confirmar y ¡listo! Aparecerá en tu pantalla principal.
                </p>
              </div>
              <div
                className="px-2.5 py-1 rounded-[8px] text-[.75rem] font-bold shrink-0 self-center"
                style={{
                  background: 'hsl(210 100% 50%)',
                  color: '#fff',
                }}
              >
                Agregar
              </div>
            </div>

            {/* Dica Safari / In-App Browser Callout */}
            <div
              className="p-3.5 rounded-[16px] text-xs flex items-start gap-2.5 border"
              style={{
                background: 'hsl(var(--accent-pale))',
                borderColor: 'hsl(var(--accent) / 0.25)',
                color: 'hsl(var(--foreground))',
              }}
            >
              <span className="text-[1.15rem] leading-none shrink-0 mt-0.5">💡</span>
              <p className="leading-snug">
                <strong>Importante en iPhone:</strong> Debe abrirse desde <strong>Safari</strong>. Si estás en Chrome, WhatsApp o Instagram, copia el enlace y pégalo directamente en Safari.
              </p>
            </div>
          </div>
        )}

        {/* ── CONTEÚDO DA ABA: ANDROID / CHROME ─────────────────────────────── */}
        {tab === 'android' && (
          <div className="space-y-3.5 animate-fade">
            {/* Se o evento nativo estiver disponível no Android, oferece botão 1-clique */}
            {isNativeAvailable && onTriggerNative && (
              <div
                className="p-4 rounded-[18px] border text-center"
                style={{
                  background: 'hsl(var(--green-pale))',
                  borderColor: 'hsl(var(--primary) / 0.3)',
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--primary))' }}>
                  Instalación automática disponible
                </p>
                <button
                  onClick={() => {
                    onClose()
                    onTriggerNative()
                  }}
                  className="w-full py-3 px-4 rounded-[14px] font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  style={{
                    background: 'hsl(128 28% 36%)',
                    color: '#fff',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Instalar ahora (1 toque)
                </button>
              </div>
            )}

            {/* Passo 1 Android */}
            <div
              className="p-4 rounded-[18px] border flex items-start gap-3.5"
              style={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: 'hsl(var(--primary))', color: '#fff' }}
              >
                1
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Abre el <span className="font-bold text-accent">menú de 3 puntos (⋮)</span>
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  En la esquina superior derecha del navegador Chrome o Samsung Internet.
                </p>
              </div>
              {/* Ícone 3 pontos */}
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border"
                style={{
                  background: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </div>
            </div>

            {/* Passo 2 Android */}
            <div
              className="p-4 rounded-[18px] border flex items-start gap-3.5"
              style={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: 'hsl(var(--primary))', color: '#fff' }}
              >
                2
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Toca en <span className="font-bold text-accent">"Instalar aplicación"</span>
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  O también puede llamarse <em>"Agregar a la pantalla principal"</em>.
                </p>
              </div>
              {/* Ícone Instalar */}
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border"
                style={{
                  background: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--primary))',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
                  <path d="M12 7v6" />
                  <path d="m9 10 3 3 3-3" />
                </svg>
              </div>
            </div>

            {/* Passo 3 Android */}
            <div
              className="p-4 rounded-[18px] border flex items-start gap-3.5"
              style={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: 'hsl(var(--primary))', color: '#fff' }}
              >
                3
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Confirma en <span className="font-bold text-accent">"Instalar"</span>
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  El icono de la aplicación se creará en tu pantalla junto a tus otras aplicaciones.
                </p>
              </div>
              <div
                className="px-2.5 py-1 rounded-[8px] text-[.75rem] font-bold shrink-0 self-center"
                style={{
                  background: 'hsl(var(--primary))',
                  color: '#fff',
                }}
              >
                Instalar
              </div>
            </div>
          </div>
        )}

        {/* Botão de Fechar / Ação */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-[16px] font-semibold text-sm transition-all active:scale-[.98] border"
            style={{
              background: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              borderColor: 'transparent',
              boxShadow: '0 4px 14px hsl(var(--primary) / 0.25)',
            }}
          >
            ¡Entendido, lo haré ahora!
          </button>
        </div>
      </div>
    </div>
  )
}
