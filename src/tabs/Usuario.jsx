import { useMemo, useState } from 'react'

// ── Helpers ──────────────────────────────────────────────────────────────────

function getFirstName(email) {
  const n = email.split('@')[0].split('.')[0]
  return n.charAt(0).toUpperCase() + n.slice(1)
}

function getDaysLabel(n) {
  if (n === 0) return 'Hoy empiezas tu camino'
  if (n === 1) return 'Llevas 1 día con nosotros'
  return `Llevas ${n} días con nosotros`
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function SectionTitle({ icon, children }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="text-[1.4rem] leading-none">{icon}</span>
      <h2 className="font-display font-bold text-[1.25rem] text-foreground">{children}</h2>
    </div>
  )
}

function StatPill({ value, label }) {
  return (
    <div
      className="flex-1 rounded-[14px] py-4 px-3 text-center border"
      style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
    >
      <div className="font-display font-bold text-[1.8rem] leading-none text-foreground">{value}</div>
      <div className="text-[.7rem] mt-1.5 font-semibold tracking-wide uppercase" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {label}
      </div>
    </div>
  )
}

function MilestoneRow({ icon, day, label, reached }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0" style={{ borderColor: 'hsl(var(--border))' }}>
      <div
        className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold transition-all"
        style={
          reached
            ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
            : { background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }
        }
      >
        {reached ? '✓' : day}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold" style={!reached ? { color: 'hsl(var(--muted-foreground))' } : {}}>
          {label}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {reached ? '¡Logrado! ✨' : `Día ${day} del protocolo`}
        </p>
      </div>
      <span className="text-[1.2rem]">{icon}</span>
    </div>
  )
}

// ── Second-offer card ─────────────────────────────────────────────────────────

function OfferCard({ icon, tag, title, description, unlocked, unlockHint }) {
  const isLocked = unlocked === false
  const isSoon   = unlocked === 'soon'
  const isOpen   = unlocked === true

  return (
    <div
      className="rounded-[20px] p-5 border relative overflow-hidden transition-all"
      style={{
        background: isOpen
          ? 'linear-gradient(135deg, hsl(var(--green-pale)), hsl(var(--accent-pale)))'
          : 'hsl(var(--card))',
        borderColor: isOpen ? 'hsl(var(--primary))' : 'hsl(var(--border))',
        opacity: isLocked ? .75 : 1,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={
            isSoon
              ? { background: 'hsl(var(--accent-pale))', color: 'hsl(var(--accent))' }
              : isOpen
              ? { background: 'hsl(var(--green-pale))', color: 'hsl(var(--primary))' }
              : { background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }
          }
        >
          {isSoon ? 'Próximamente' : isOpen ? 'Disponible' : 'Bloqueado'}
        </span>
        <span className="text-[1.4rem]">{isLocked ? '🔒' : icon}</span>
      </div>

      <div style={{ filter: isLocked ? 'blur(.4px)' : 'none' }}>
        <p className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {tag}
        </p>
        <h3 className="font-display font-bold text-[1.05rem] text-foreground leading-snug text-balance mb-2">
          {title}
        </h3>
        <p className="text-sm leading-snug" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {description}
        </p>
      </div>

      <div className="mt-4">
        {isOpen && (
          <button
            className="w-full py-3.5 rounded-[12px] font-semibold text-sm transition-all active:scale-[.97]"
            style={{ background: 'hsl(128 28% 36%)', color: '#fff' }}
            onClick={() => {}}
          >
            Ver ahora →
          </button>
        )}
        {isSoon && (
          <p className="text-xs font-medium text-center py-2" style={{ color: 'hsl(var(--accent))' }}>
            Te avisaremos cuando esté listo
          </p>
        )}
        {isLocked && unlockHint && (
          <p className="text-xs font-medium text-center py-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            🔓 {unlockHint}
          </p>
        )}
      </div>
    </div>
  )
}

// ── Toggle component ──────────────────────────────────────────────────────────

function Toggle({ checked, onChange, id }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={onChange}
      className="relative shrink-0 rounded-full transition-all duration-200 focus-visible:outline-2"
      style={{
        width: '52px',
        height: '30px',
        background: checked ? 'hsl(128 28% 36%)' : 'hsl(var(--border))',
      }}
      aria-label={checked ? 'Activado' : 'Desactivado'}
    >
      <span
        className="absolute top-[3px] left-[3px] w-6 h-6 rounded-full bg-white transition-transform duration-200 shadow-sm"
        style={{ transform: checked ? 'translateX(22px)' : 'translateX(0)' }}
      />
    </button>
  )
}

function SettingRow({ icon, label, description, children }) {
  return (
    <div className="flex items-start gap-3.5 py-4 border-b last:border-0" style={{ borderColor: 'hsl(var(--border))' }}>
      <span className="text-[1.3rem] mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[.95rem] text-foreground">{label}</p>
        <p className="text-xs mt-0.5 leading-snug" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {description}
        </p>
      </div>
      <div className="shrink-0 pt-0.5">{children}</div>
    </div>
  )
}

// ── Help link row ─────────────────────────────────────────────────────────────

function HelpRow({ icon, label, href, onClick, badge }) {
  const chevron = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
      style={{ color: 'hsl(var(--muted-foreground))' }}>
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
  const inner = (
    <div className="flex items-center gap-4 px-5 py-4 border-b last:border-0" style={{ borderColor: 'hsl(var(--border))', minHeight: '60px' }}>
      <span className="text-[1.3rem] shrink-0">{icon}</span>
      <span className="flex-1 font-medium text-[.95rem] text-foreground leading-snug">{label}</span>
      {badge && (
        <span
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full mr-1 shrink-0"
          style={{
            background: badge.includes('✓') ? 'hsl(var(--green-pale))' : 'hsl(var(--accent-pale))',
            color: badge.includes('✓') ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
          }}
        >
          {badge}
        </span>
      )}
      {chevron}
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block active:opacity-70 transition-opacity">
        {inner}
      </a>
    )
  }
  return (
    <button onClick={onClick} className="w-full text-left active:opacity-70 transition-opacity">
      {inner}
    </button>
  )
}

// ── Main tab ──────────────────────────────────────────────────────────────────

export default function Usuario({ appState, handlers }) {
  const { day, days, lessons, bonuses, email, vibrationEnabled, pwa } = appState
  const { toggleVibration, handleLogout } = handlers

  const name             = getFirstName(email)
  const daysCompleted    = days.filter(Boolean).length
  const lessonsCompleted = lessons.filter(Boolean).length
  const percent          = Math.round(daysCompleted / 21 * 100)
  const protocolDone     = days.every(Boolean)
  const halfwayDone      = daysCompleted >= 10

  const [confirmLogout, setConfirmLogout] = useState(false)

  const streak = useMemo(() => {
    let s = 0
    for (let i = day - 1; i >= 0; i--) { if (days[i]) s++; else break }
    return s
  }, [days, day])

  return (
    <div className="animate-fade pb-4">

      {/* ── PROFILE CARD ─────────────────────────────────────── */}
      <div
        className="mx-4 mt-6 mb-5 rounded-[22px] p-5 border"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--green-pale)), hsl(var(--card)))',
          borderColor: 'hsl(var(--border))',
          boxShadow: '0 4px 20px hsla(var(--foreground) / .06)',
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center font-display font-bold text-[1.5rem]"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            {name.charAt(0)}
          </div>
          <div>
            <h2 className="font-display font-bold text-[1.3rem] text-foreground leading-tight">
              Hola, {name} 👋
            </h2>
            <p className="text-sm mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {getDaysLabel(daysCompleted)}
            </p>
          </div>
        </div>

        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Tu protocolo
          </span>
          <span className="text-xs font-bold" style={{ color: 'hsl(var(--primary))' }}>
            {percent}%
          </span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'hsl(var(--border))' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${percent}%`, background: 'hsl(128 28% 36%)' }}
          />
        </div>
        <p className="text-xs mt-2 text-center font-medium" style={{ color: 'hsl(var(--primary))' }}>
          {protocolDone
            ? '¡Completaste el protocolo! 🏆'
            : `${21 - daysCompleted} días para terminar el protocolo`}
        </p>
      </div>

      {/* ── TU AVANCE ────────────────────────────────────────── */}
      <div className="mx-4 mb-5">
        <SectionTitle icon="📊">Tu avance</SectionTitle>

        <div className="flex gap-2.5 mb-4">
          <StatPill value={daysCompleted}    label="Días completados" />
          <StatPill value={streak}           label="Días seguidos" />
          <StatPill value={lessonsCompleted} label="Lecciones leídas" />
        </div>

        <div
          className="rounded-[18px] px-4 border"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
        >
          <MilestoneRow day={1}  icon="🌱" label="Dar el primer paso"        reached={days[0]} />
          <MilestoneRow day={3}  icon="🔬" label="Primeros efectos"           reached={days[2]} />
          <MilestoneRow day={7}  icon="⭐" label="Primera semana completa"    reached={days.slice(0, 7).every(Boolean)} />
          <MilestoneRow day={10} icon="🏅" label="Mitad del camino"           reached={halfwayDone} />
          <MilestoneRow day={21} icon="🏆" label="Protocolo completo"         reached={protocolDone} />
        </div>
      </div>

      {/* ── ESTAMOS CONTIGO ──────────────────────────────────── */}
      <div className="mx-4 mb-5">
        <SectionTitle icon="💬">Estamos contigo</SectionTitle>

        <div
          className="rounded-[20px] p-5 border"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
        >
          <p className="font-display font-semibold text-[1rem] text-foreground mb-2 text-balance">
            ¿Tienes alguna pregunta sobre el protocolo?
          </p>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Nuestro equipo está disponible para ayudarte. No estás solo en este camino.
          </p>

          <a
            href="mailto:soporte@protocolodelvinagre.com"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-[14px] font-semibold text-sm transition-all active:scale-[.97] border-2"
            style={{
              borderColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary))',
              background: 'hsl(var(--green-pale))',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Escribir al equipo
          </a>

          <div className="flex items-center gap-2 mt-3 justify-center">
            <div className="flex -space-x-2">
              {['C','M','R'].map((l, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: ['hsl(var(--primary))','hsl(var(--accent))','hsl(128 18% 60%)'][i],
                    color: 'white',
                    borderColor: 'hsl(var(--card))',
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Respondemos en menos de 24 horas
            </p>
          </div>
        </div>
      </div>

      {/* ── SOLO PARA TI (segunda oferta) ────────────────────── */}
      <div className="mx-4 mb-5">
        <SectionTitle icon="🔐">Solo para ti</SectionTitle>
        <p className="text-sm mb-4 -mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Contenido especial que se desbloquea con tu progreso.
        </p>

        <div className="flex flex-col gap-3">
          <OfferCard
            icon="🫁"
            tag="Programa Avanzado"
            title="Protocolo Intensivo 60 Días"
            description="La versión profunda del protocolo para resultados duraderos. Incluye plan de alimentación y seguimiento personalizado."
            unlocked={protocolDone}
            unlockHint="Completa los 21 días para desbloquear"
          />
          <OfferCard
            icon="🥗"
            tag="Guía de Alimentación"
            title="Plan Antiinflamatorio de 30 días"
            description="Cada comida diseñada para potenciar el vinagre. Recetas, lista de compras y horarios listos para usar."
            unlocked="soon"
          />
          <OfferCard
            icon="🎙️"
            tag="Sesión en Vivo"
            title="Consulta Grupal con el Especialista"
            description="Pregunta en vivo al Dr. Méndez sobre tu caso específico. Cupos limitados cada mes."
            unlocked="soon"
          />
        </div>
      </div>

      {/* ── PREFERENCIAS ─────────────────────────────────────── */}
      <div className="mx-4 mb-5">
        <SectionTitle icon="⚙️">Preferencias</SectionTitle>

        <div
          className="rounded-[20px] px-4 border"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
        >
          <SettingRow
            icon="📳"
            label="Vibración al completar"
            description="Recibe una pequeña vibración cuando marcas un día como completado. Solo funciona en dispositivos móviles."
          >
            <Toggle
              id="vibration-toggle"
              checked={vibrationEnabled}
              onChange={toggleVibration}
            />
          </SettingRow>
        </div>
      </div>

      {/* ── INFORMACIÓN Y AYUDA ──────────────────────────────── */}
      <div className="mx-4 mb-5">
        <SectionTitle icon="❓">Información y ayuda</SectionTitle>

        <div
          className="rounded-[20px] overflow-hidden border"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
        >
          <HelpRow
            icon="💬"
            label="Preguntas frecuentes"
            onClick={() => {}}
          />
          <HelpRow
            icon="📲"
            label={pwa?.isInstalled ? "App instalada en tu dispositivo" : "Instalar la app en tu móvil"}
            badge={pwa?.isInstalled ? "✓ Instalada" : "Instalar"}
            onClick={() => {
              if (pwa) {
                pwa.promptInstall()
              }
            }}
          />
          <HelpRow
            icon="📖"
            label="Guía paso a paso (iPhone y Android)"
            onClick={() => {
              if (pwa) {
                pwa.openTutorial()
              }
            }}
          />
          <HelpRow
            icon="💚"
            label="Contactar soporte"
            href="https://wa.me/5511999999999"
          />
          <HelpRow
            icon="📄"
            label="Términos y condiciones"
            href="#"
          />
          <HelpRow
            icon="🔒"
            label="Política de privacidad"
            href="#"
          />
        </div>
      </div>

      {/* ── CERRAR SESIÓN ────────────────────────────────────── */}
      <div className="mx-4 mb-2">
        {!confirmLogout ? (
          <button
            onClick={() => setConfirmLogout(true)}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-[16px] font-semibold text-sm border-2 transition-all active:scale-[.97]"
            style={{ borderColor: 'hsl(0 60% 50% / .35)', color: 'hsl(0 60% 42%)' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Cerrar sesión
          </button>
        ) : (
          <div
            className="rounded-[20px] p-5 border-2"
            style={{
              borderColor: 'hsl(0 60% 50% / .3)',
              background: 'hsl(var(--card))',
            }}
          >
            <p className="font-display font-bold text-[1rem] text-foreground mb-1">
              ¿Cerrar sesión?
            </p>
            <p className="text-sm mb-5 leading-snug" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Tu progreso está guardado. Puedes volver a entrar en cualquier momento con tu correo.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmLogout(false)}
                className="flex-1 py-4 rounded-[12px] font-semibold text-sm border transition-all active:scale-[.97]"
                style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-4 rounded-[12px] font-semibold text-sm transition-all active:scale-[.97]"
                style={{ background: 'hsl(0 60% 42%)', color: '#fff' }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── VERSIÓN ──────────────────────────────────────────── */}
      <p
        className="text-center text-xs mt-5 mb-2 pb-2"
        style={{ color: 'hsl(var(--muted-foreground) / .5)' }}
      >
        Versión 1.0 · El Protocolo del Vinagre
      </p>

    </div>
  )
}
