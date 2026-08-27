import { BONOS, RITUAL_PROTOCOLS, RITUAL_BONUSES } from '../data'

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}

// ── Ritual Activador Ácido — protocol grid card (2×2) ────────────────────────

function RitualProtocolCard({ item, done, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="flex flex-col items-start p-4 rounded-[18px] text-left transition-all active:scale-[.96] relative overflow-hidden"
      style={{
        background: done
          ? 'hsl(36 55% 88%)'
          : 'linear-gradient(145deg, hsl(36 70% 94%), hsl(38 60% 88%))',
        border: done
          ? '1.5px solid hsl(36 55% 70%)'
          : '1.5px solid hsl(36 60% 80%)',
      }}
    >
      {done && (
        <span
          className="absolute top-2.5 right-2.5 text-[.6rem] font-bold tracking-wide px-1.5 py-0.5 rounded-full"
          style={{ background: 'hsl(36 60% 50%)', color: '#fff' }}
        >
          ✓
        </span>
      )}
      <span className="text-[1.6rem] mb-2">{item.icon}</span>
      <p className="font-display font-bold text-[.9rem] leading-snug text-balance" style={{ color: 'hsl(28 40% 22%)' }}>
        {item.title}
      </p>
      <p className="text-[.72rem] mt-1" style={{ color: 'hsl(28 30% 42%)' }}>
        {item.subtitle}
      </p>
    </button>
  )
}

// ── Ritual Activador Ácido — bonus list card ──────────────────────────────────

function RitualBonusCard({ item, done, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="w-full flex items-center gap-4 p-4 rounded-[18px] text-left transition-all active:scale-[.97]"
      style={{
        background: done
          ? 'hsl(36 55% 88%)'
          : 'linear-gradient(135deg, hsl(36 65% 92%), hsl(38 55% 86%))',
        border: '1.5px solid hsl(36 55% 78%)',
      }}
    >
      <div
        className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center text-[1.4rem]"
        style={{ background: 'rgba(180,110,30,.15)' }}
      >
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-[.95rem] leading-snug" style={{ color: 'hsl(28 40% 22%)' }}>
          {item.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'hsl(28 30% 44%)' }}>
          {item.subtitle}
        </p>
      </div>
      {done
        ? <span className="text-xs font-bold shrink-0" style={{ color: 'hsl(36 60% 42%)' }}>✓ Visto</span>
        : <span style={{ color: 'hsl(36 55% 50%)' }}><ChevronRight /></span>
      }
    </button>
  )
}

// ── Protocolo principal — lista card (estilo original) ───────────────────────

function MainBonoCard({ bono, done, onOpen, delay }) {
  return (
    <button
      onClick={onOpen}
      className="w-full flex gap-4 p-5 rounded-[22px] text-left transition-all active:scale-[.97] relative"
      style={{
        background: `linear-gradient(135deg, ${bono.gradient.replace('from-[', '').replace('] to-[', ', ').replace(']', '')})`,
        color: bono.textColor,
        boxShadow: '0 6px 24px rgba(0,0,0,.14)',
        animationDelay: `${delay * .1}s`,
      }}
    >
      {done && (
        <span
          className="absolute top-3.5 right-3.5 text-[.65rem] font-bold px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(255,255,255,.25)', color: 'white' }}
        >
          ✓ Visto
        </span>
      )}
      <div
        className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center text-[1.6rem]"
        style={{ background: 'rgba(255,255,255,.18)' }}
      >
        {bono.icon}
      </div>
      <div className="flex-1 min-w-0 pr-10">
        <p className="text-xs font-bold tracking-widest uppercase opacity-75 mb-1">{bono.tag}</p>
        <p className="font-display font-bold text-[1.05rem] leading-snug text-balance">{bono.title}</p>
        <p className="text-xs opacity-80 mt-1.5 leading-snug">{bono.desc}</p>
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold mt-3.5 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(255,255,255,.2)' }}
        >
          Ver guía <ChevronRight />
        </span>
      </div>
    </button>
  )
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[.65rem] font-bold tracking-[.15em] uppercase mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
      {children}
    </p>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Bonos({ appState, setViewer }) {
  const { bonuses, ritualProtocols, ritualBonuses } = appState

  const ritualDone   = ritualProtocols.every(Boolean) && ritualBonuses.every(Boolean)
  const ritualCount  = ritualProtocols.filter(Boolean).length + ritualBonuses.filter(Boolean).length

  return (
    <div className="animate-fade pb-4">

      {/* ── BLOCO ÂMBAR — Ritual Activador Ácido ───────────────────── */}
      <div
        className="mx-4 mt-5 mb-4 rounded-[24px] overflow-hidden"
        style={{
          border: '1.5px solid hsl(36 55% 72%)',
          boxShadow: '0 6px 28px hsl(36 60% 50% / .14)',
        }}
      >
        {/* Header âmbar */}
        <div
          className="px-5 pt-5 pb-4"
          style={{
            background: 'linear-gradient(135deg, hsl(36 70% 46%), hsl(28 65% 36%))',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[.6rem] font-bold tracking-[.18em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,.7)' }}>
                Acceso especial incluido
              </p>
              <h2 className="font-display font-bold text-[1.25rem] leading-tight text-white">
                🧪 Ritual Activador Ácido
              </h2>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,.8)' }}>
                Programa completo · 7 materiales incluidos
              </p>
            </div>
            {/* Progress pill */}
            <div
              className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full mt-1"
              style={{ background: 'rgba(255,255,255,.2)', color: 'white' }}
            >
              {ritualCount}/7
            </div>
          </div>
        </div>

        {/* Protocol grid 2×2 */}
        <div className="px-4 pt-4 pb-2" style={{ background: 'hsl(38 80% 97%)' }}>
          <SectionLabel>Protocolos</SectionLabel>
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {RITUAL_PROTOCOLS.map((p, i) => (
              <RitualProtocolCard
                key={p.id}
                item={p}
                done={ritualProtocols[i]}
                onOpen={() => setViewer({ type: 'ritual-protocol', id: i })}
              />
            ))}
          </div>

          {/* Ritual bonuses list */}
          <SectionLabel>Bonos del Ritual</SectionLabel>
          <div className="flex flex-col gap-2.5 pb-4">
            {RITUAL_BONUSES.map((b, i) => (
              <RitualBonusCard
                key={b.id}
                item={b}
                done={ritualBonuses[i]}
                onOpen={() => setViewer({ type: 'ritual-bonus', id: i })}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── BLOCO SAGE GREEN — Bonos del Protocolo ─────────────────── */}
      <div className="px-4 mt-2">
        <p className="text-[.65rem] font-bold tracking-[.15em] uppercase mb-3 px-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Bonos del Protocolo
        </p>
        <div className="flex flex-col gap-3.5">
          {BONOS.map((bono, i) => (
            <MainBonoCard
              key={bono.id}
              bono={bono}
              done={bonuses[i]}
              delay={i}
              onOpen={() => setViewer({ type: 'bonus', id: bono.id })}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
