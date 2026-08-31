import { useState } from 'react'
import { BONOS, ABSORCION_PROTOCOLS, ABSORCION_BONUSES, RITUAL_PROTOCOLS, RITUAL_BONUSES } from '../data'

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}

// ── Absorción Máxima — large protocol card (full width) ───────────────────────

function LargeProtocolCard({ item, done, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="w-full flex flex-col p-5 rounded-[18px] text-left transition-all active:scale-[.97] relative overflow-hidden"
      style={{
        background: done
          ? 'hsl(168 40% 88%)'
          : 'linear-gradient(135deg, hsl(168 45% 92%), hsl(168 38% 86%))',
        border: done
          ? '1.5px solid hsl(168 40% 68%)'
          : '1.5px solid hsl(168 38% 78%)',
      }}
    >
      {done && (
        <span
          className="absolute top-3 right-3 text-[.6rem] font-bold tracking-wide px-2 py-0.5 rounded-full"
          style={{ background: 'hsl(168 48% 30%)', color: '#fff' }}
        >
          ✓ Completado
        </span>
      )}
      <span className="text-[1.8rem] mb-3">{item.icon}</span>
      <p className="font-display font-bold text-[1rem] leading-snug text-balance" style={{ color: 'hsl(168 42% 14%)' }}>
        {item.title}
      </p>
      <p className="text-[.78rem] mt-1.5 mb-3" style={{ color: 'hsl(168 32% 38%)' }}>
        {item.subtitle}
      </p>
      <span
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full self-start"
        style={{ background: 'hsl(168 40% 82%)', color: 'hsl(168 48% 22%)' }}
      >
        Ver guía <ChevronRight />
      </span>
    </button>
  )
}

// ── Absorción Máxima — small protocol card (2×2 grid) ────────────────────────

function SmallProtocolCard({ item, done, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="flex flex-col items-start p-4 rounded-[18px] text-left transition-all active:scale-[.96] relative overflow-hidden"
      style={{
        background: done
          ? 'hsl(168 40% 88%)'
          : 'linear-gradient(145deg, hsl(168 42% 94%), hsl(168 36% 88%))',
        border: done
          ? '1.5px solid hsl(168 40% 68%)'
          : '1.5px solid hsl(168 35% 80%)',
      }}
    >
      {done && (
        <span
          className="absolute top-2.5 right-2.5 text-[.6rem] font-bold px-1.5 py-0.5 rounded-full"
          style={{ background: 'hsl(168 48% 30%)', color: '#fff' }}
        >
          ✓
        </span>
      )}
      <span className="text-[1.6rem] mb-2">{item.icon}</span>
      <p className="font-display font-bold text-[.9rem] leading-snug text-balance" style={{ color: 'hsl(168 42% 14%)' }}>
        {item.title}
      </p>
      <p className="text-[.72rem] mt-1" style={{ color: 'hsl(168 32% 38%)' }}>
        {item.subtitle}
      </p>
    </button>
  )
}

// ── Absorción Máxima — regular bonus list card ────────────────────────────────

function AbsorcionBonusCard({ item, done, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="w-full flex items-center gap-4 p-4 rounded-[18px] text-left transition-all active:scale-[.97]"
      style={{
        background: done
          ? 'hsl(168 40% 88%)'
          : 'linear-gradient(135deg, hsl(168 38% 92%), hsl(168 30% 86%))',
        border: '1.5px solid hsl(168 35% 78%)',
      }}
    >
      <div
        className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center text-[1.4rem]"
        style={{ background: 'hsl(168 42% 30% / .12)' }}
      >
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-[.95rem] leading-snug" style={{ color: 'hsl(168 42% 14%)' }}>
          {item.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'hsl(168 32% 38%)' }}>
          {item.subtitle}
        </p>
      </div>
      {done
        ? <span className="text-xs font-bold shrink-0" style={{ color: 'hsl(168 48% 30%)' }}>✓ Visto</span>
        : <span style={{ color: 'hsl(168 38% 48%)' }}><ChevronRight /></span>
      }
    </button>
  )
}

// ── Absorción Máxima — El Día Cero (secret card) ─────────────────────────────

function SecretCard({ item, done, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="w-full flex items-center gap-4 p-4 rounded-[18px] text-left transition-all active:scale-[.97] relative overflow-hidden"
      style={{
        background: done ? 'hsl(168 60% 14%)' : 'hsl(168 80% 8%)',
        border: '1.5px solid hsl(168 55% 18%)',
      }}
    >
      {/* Gold shimmer accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(42 70% 50% / .08) 0%, transparent 70%)',
          transform: 'translate(35%, -35%)',
        }}
      />
      <div
        className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center text-[1.4rem] relative"
        style={{ background: 'hsl(42 70% 50% / .15)', border: '1px solid hsl(42 65% 50% / .25)' }}
      >
        {item.icon}
      </div>
      <div className="flex-1 min-w-0 relative">
        <span
          className="inline-block text-[.55rem] font-bold tracking-[.15em] uppercase px-2 py-0.5 rounded-full mb-1.5"
          style={{ background: 'hsl(42 75% 50% / .18)', color: 'hsl(42 80% 72%)' }}
        >
          EXCLUSIVO
        </span>
        <p className="font-display font-bold text-[.95rem] leading-snug" style={{ color: 'hsl(42 85% 80%)' }}>
          {item.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'hsl(168 25% 48%)' }}>
          {item.subtitle}
        </p>
      </div>
      {done
        ? <span className="text-xs font-bold shrink-0" style={{ color: 'hsl(42 75% 65%)' }}>✓ Visto</span>
        : <span style={{ color: 'hsl(168 35% 46%)' }}><ChevronRight /></span>
      }
    </button>
  )
}

// ── Ritual Activador Ácido — protocol grid card (2×2) ────────────────────────

function RitualProtocolCard({ item, done, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="flex flex-col items-start p-4 rounded-[18px] text-left transition-all active:scale-[.96] relative overflow-hidden"
      style={{
        background: done ? 'hsl(36 55% 88%)' : 'linear-gradient(145deg, hsl(36 70% 94%), hsl(38 60% 88%))',
        border: done ? '1.5px solid hsl(36 55% 70%)' : '1.5px solid hsl(36 60% 80%)',
      }}
    >
      {done && (
        <span className="absolute top-2.5 right-2.5 text-[.6rem] font-bold px-1.5 py-0.5 rounded-full"
          style={{ background: 'hsl(36 60% 50%)', color: '#fff' }}>✓</span>
      )}
      <span className="text-[1.6rem] mb-2">{item.icon}</span>
      <p className="font-display font-bold text-[.9rem] leading-snug text-balance" style={{ color: 'hsl(28 40% 22%)' }}>
        {item.title}
      </p>
      <p className="text-[.72rem] mt-1" style={{ color: 'hsl(28 30% 42%)' }}>{item.subtitle}</p>
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
        background: done ? 'hsl(36 55% 88%)' : 'linear-gradient(135deg, hsl(36 65% 92%), hsl(38 55% 86%))',
        border: '1.5px solid hsl(36 55% 78%)',
      }}
    >
      <div className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center text-[1.4rem]"
        style={{ background: 'rgba(180,110,30,.15)' }}>
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-[.95rem] leading-snug" style={{ color: 'hsl(28 40% 22%)' }}>
          {item.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'hsl(28 30% 44%)' }}>{item.subtitle}</p>
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

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[.65rem] font-bold tracking-[.15em] uppercase mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
      {children}
    </p>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Bonos({ appState, setViewer }) {
  const { bonuses, absorcionProtocols, absorcionBonuses, ritualProtocols, ritualBonuses } = appState

  const absorcionCount = absorcionProtocols.filter(Boolean).length + absorcionBonuses.filter(Boolean).length
  const ritualCount    = ritualProtocols.filter(Boolean).length + ritualBonuses.filter(Boolean).length

  const largeProtocols  = ABSORCION_PROTOCOLS.filter(p => p.size === 'large')
  const smallProtocols  = ABSORCION_PROTOCOLS.filter(p => p.size === 'small')
  const regularBonuses  = ABSORCION_BONUSES.filter(b => !b.secret)
  const secretBonus     = ABSORCION_BONUSES.find(b => b.secret)

  const [ritualOpen, setRitualOpen] = useState(false)

  return (
    <div className="animate-fade pb-4">

      {/* ── BLOCO TEAL — Protocolo Absorción Máxima ────────────── */}
      <div
        className="mx-4 mt-5 mb-4 rounded-[24px] overflow-hidden"
        style={{
          border: '1.5px solid hsl(168 38% 70%)',
          boxShadow: '0 6px 28px hsl(168 55% 26% / .12)',
        }}
      >
        {/* Header teal */}
        <div
          className="px-5 pt-5 pb-4"
          style={{ background: 'linear-gradient(135deg, hsl(168 55% 26%), hsl(172 48% 18%))' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[.6rem] font-bold tracking-[.18em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,.7)' }}>
                Acceso especial incluido
              </p>
              <h2 className="font-display font-bold text-[1.25rem] leading-tight text-white">
                🧪 Protocolo Absorción Máxima
              </h2>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,.8)' }}>
                Maximiza la acción del vinagre · 6 materiales
              </p>
            </div>
            <div
              className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full mt-1"
              style={{ background: 'rgba(255,255,255,.2)', color: 'white' }}
            >
              {absorcionCount}/6
            </div>
          </div>
        </div>

        {/* Content area teal pale */}
        <div className="px-4 pt-4 pb-4" style={{ background: 'hsl(168 40% 97%)' }}>

          <SectionLabel>Protocolos</SectionLabel>

          {/* Large protocol card */}
          <div className="flex flex-col gap-2.5 mb-3">
            {largeProtocols.map(p => (
              <LargeProtocolCard
                key={p.id}
                item={p}
                done={absorcionProtocols[p.id]}
                onOpen={() => setViewer({ type: 'absorcion-protocol', id: p.id })}
              />
            ))}
          </div>

          {/* Small protocol 2-col grid */}
          {smallProtocols.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {smallProtocols.map(p => (
                <SmallProtocolCard
                  key={p.id}
                  item={p}
                  done={absorcionProtocols[p.id]}
                  onOpen={() => setViewer({ type: 'absorcion-protocol', id: p.id })}
                />
              ))}
            </div>
          )}

          <SectionLabel>Bonos del Protocolo</SectionLabel>

          <div className="flex flex-col gap-2.5">
            {regularBonuses.map(b => (
              <AbsorcionBonusCard
                key={b.id}
                item={b}
                done={absorcionBonuses[b.id]}
                onOpen={() => setViewer({ type: 'absorcion-bonus', id: b.id })}
              />
            ))}
            {secretBonus && (
              <SecretCard
                item={secretBonus}
                done={absorcionBonuses[secretBonus.id]}
                onOpen={() => setViewer({ type: 'absorcion-bonus', id: secretBonus.id })}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── BLOCO ÂMBAR — Ritual Activador Ácido (colapsável) ── */}
      <div
        className="mx-4 mb-4 rounded-[24px] overflow-hidden"
        style={{
          border: '1.5px solid hsl(36 55% 72%)',
          boxShadow: '0 4px 20px hsl(36 60% 50% / .10)',
        }}
      >
        {/* Header — clicável para abrir/fechar */}
        <button
          onClick={() => setRitualOpen(o => !o)}
          className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left"
          style={{ background: 'linear-gradient(135deg, hsl(36 70% 46%), hsl(28 65% 36%))' }}
        >
          <div>
            <p className="text-[.6rem] font-bold tracking-[.18em] uppercase mb-1" style={{ color: 'rgba(255,255,255,.7)' }}>
              Incluido con tu programa
            </p>
            <h3 className="font-display font-bold text-[1.1rem] leading-tight text-white">
              🔥 Ritual Activador Ácido
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.8)' }}>
              Protocolo completo · 7 materiales
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,.2)', color: 'white' }}
            >
              {ritualCount}/7
            </span>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,.8)" strokeWidth="2.5"
              style={{ transform: ritualOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .25s' }}
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </button>

        {/* Conteúdo expandível */}
        {ritualOpen && (
          <div className="px-4 pt-4 pb-4" style={{ background: 'hsl(38 80% 97%)' }}>
            <SectionLabel>Protocolos</SectionLabel>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {RITUAL_PROTOCOLS.map((p) => (
                <RitualProtocolCard
                  key={p.id}
                  item={p}
                  done={ritualProtocols[p.id]}
                  onOpen={() => setViewer({ type: 'ritual-protocol', id: p.id })}
                />
              ))}
            </div>

            <SectionLabel>Bonos del Ritual</SectionLabel>
            <div className="flex flex-col gap-2.5">
              {RITUAL_BONUSES.map((b) => (
                <RitualBonusCard
                  key={b.id}
                  item={b}
                  done={ritualBonuses[b.id]}
                  onOpen={() => setViewer({ type: 'ritual-bonus', id: b.id })}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── BLOCO SAGE GREEN — Bonos del Protocolo del Vinagre ── */}
      <div className="px-4 mt-2">
        <p className="text-[.65rem] font-bold tracking-[.15em] uppercase mb-3 px-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Bonos del Protocolo del Vinagre
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
