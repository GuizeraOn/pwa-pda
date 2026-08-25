import Inicio from '../tabs/Inicio'
import Protocolo from '../tabs/Protocolo'
import Bonos from '../tabs/Bonos'
import Progreso from '../tabs/Progreso'
import Usuario from '../tabs/Usuario'

const TABS = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'protocolo',
    label: 'Protocolo',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
  },
  {
    id: 'bonos',
    label: 'Bonos',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5"/>
        <path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
      </svg>
    ),
  },
  {
    id: 'progreso',
    label: 'Progreso',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    id: 'usuario',
    label: 'Yo',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 18) return 'Buenas tardes'
  return 'Buenas noches'
}

function getFirstName(email) {
  const n = email.split('@')[0].split('.')[0]
  return n.charAt(0).toUpperCase() + n.slice(1)
}

export default function Shell({ tab, setTab, setViewer, appState, handlers }) {
  const { day, email } = appState
  const name = getFirstName(email)

  const tabProps = { appState, handlers, setViewer, setTab }

  return (
    <div className="flex flex-col min-h-dvh">
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-5 py-3 border-b"
        style={{
          background: 'hsl(var(--background) / .95)',
          borderColor: 'hsl(var(--border))',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div>
          <p className="font-display font-semibold text-[1.05rem] text-foreground leading-tight">
            {getGreeting()}, {name}
          </p>
          <span
            className="inline-block text-xs font-bold tracking-wide px-2.5 py-0.5 rounded-full mt-0.5"
            style={{
              background: 'hsl(var(--accent-pale))',
              color: 'hsl(var(--accent))',
            }}
          >
            Día {day} de 21
          </span>
        </div>

        {/* Avatar — clickable, navega a "Yo" */}
        <button
          onClick={() => setTab('usuario')}
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-transform active:scale-[.92]"
          style={{
            background: tab === 'usuario' ? 'hsl(var(--accent))' : 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            boxShadow: tab === 'usuario' ? '0 0 0 2px hsl(var(--accent) / .3)' : 'none',
          }}
          aria-label="Mi perfil"
        >
          {name.charAt(0)}
        </button>
      </header>

      {/* Tab content */}
      <main
        className="flex-1 overflow-y-auto no-scrollbar"
        style={{ paddingBottom: 'calc(var(--nav-height) + 4px)' }}
      >
        {tab === 'inicio'    && <Inicio    key="inicio"    {...tabProps} />}
        {tab === 'protocolo' && <Protocolo key="protocolo" {...tabProps} />}
        {tab === 'bonos'     && <Bonos     key="bonos"     {...tabProps} />}
        {tab === 'progreso'  && <Progreso  key="progreso"  {...tabProps} />}
        {tab === 'usuario'   && <Usuario   key="usuario"   {...tabProps} />}
      </main>

      {/* Bottom nav — 5 tabs, ícones menores */}
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] grid grid-cols-5 z-50 border-t"
        style={{
          height: 'var(--nav-height)',
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))',
          boxShadow: '0 -2px 16px rgba(0,0,0,.06)',
        }}
      >
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex flex-col items-center justify-center gap-0.5 pb-3 pt-2 text-[.6rem] font-semibold tracking-wide uppercase transition-colors"
            style={{ color: tab === t.id ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}
            aria-current={tab === t.id ? 'page' : undefined}
          >
            <div
              className="w-10 h-7 rounded-[12px] flex items-center justify-center transition-colors"
              style={{
                background: tab === t.id ? 'hsl(var(--green-pale))' : 'transparent',
              }}
            >
              {t.icon}
            </div>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
