import { useState, useEffect } from 'react'
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

// ── Countdown helpers ─────────────────────────────────────────────────────────

function formatRemaining(ms) {
  if (ms <= 0) return 'muy pronto'
  const days = Math.floor(ms / 86400000)
  const hours = Math.floor((ms % 86400000) / 3600000)
  const mins = Math.floor((ms % 3600000) / 60000)
  if (days > 0) return `${days} ${days === 1 ? 'día' : 'días'}, ${hours}h`
  if (hours > 0) return `${hours}h ${mins}min`
  if (mins > 0) return `${mins} min`
  return 'muy pronto'
}

function LockCountdown({ targetTimestamp }) {
  const [text, setText] = useState(() => formatRemaining(targetTimestamp - Date.now()))
  useEffect(() => {
    const id = setInterval(() => setText(formatRemaining(targetTimestamp - Date.now())), 60000)
    return () => clearInterval(id)
  }, [targetTimestamp])
  return <>{text}</>
}

// ── Teaser block with real countdown ─────────────────────────────────────────

function TeaserBlock({ startTimestamp, unlockDay, color }) {
  const daysSince = startTimestamp ? Math.floor((Date.now() - startTimestamp) / 86400000) : 0
  const targetTimestamp = (startTimestamp || Date.now()) + unlockDay * 86400000
  const pct = Math.min(100, Math.round((daysSince / unlockDay) * 100))
  const tc = color === 'teal'
  return (
    <div
      className="px-4 pb-4"
      style={{ background: tc ? 'hsl(168 40% 97%)' : 'hsl(38 80% 97%)' }}
    >
      <div
        className="rounded-[14px] p-4 flex flex-col gap-3"
        style={{ background: tc ? 'hsl(168 40% 92%)' : 'hsl(36 60% 92%)', border: `1px solid ${tc ? 'hsl(168 35% 76%)' : 'hsl(36 50% 76%)'}` }}
      >
        <p className="text-sm font-semibold" style={{ color: tc ? 'hsl(168 42% 18%)' : 'hsl(28 40% 22%)' }}>
          🔒 Disponible el día {unlockDay}
        </p>
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: tc ? 'hsl(168 32% 38%)' : 'hsl(28 30% 42%)' }}>Se desbloquea en:</span>
          <span className="font-bold" style={{ color: tc ? 'hsl(168 48% 26%)' : 'hsl(28 50% 32%)' }}>
            <LockCountdown targetTimestamp={targetTimestamp} />
          </span>
        </div>
        <div>
          <div className="flex justify-between text-[.7rem] font-semibold mb-1.5" style={{ color: tc ? 'hsl(168 38% 34%)' : 'hsl(28 35% 38%)' }}>
            <span>Tu progreso</span>
            <span>{daysSince}/{unlockDay} días</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: tc ? 'hsl(168 30% 80%)' : 'hsl(36 45% 80%)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: tc ? 'hsl(168 48% 36%)' : 'hsl(36 65% 46%)' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Bonos({ appState, setViewer }) {
  const { bonuses, days, absorcionProtocols, absorcionBonuses, ritualProtocols, ritualBonuses, startTimestamp } = appState

  const daysSinceStart = startTimestamp ? Math.floor((Date.now() - startTimestamp) / 86400000) : 0

  const classicLocked = daysSinceStart < 7

  const absorcionCount = absorcionProtocols.filter(Boolean).length + absorcionBonuses.filter(Boolean).length
  const ritualCount    = ritualProtocols.filter(Boolean).length + ritualBonuses.filter(Boolean).length

  const largeProtocols  = ABSORCION_PROTOCOLS.filter(p => p.size === 'large')
  const smallProtocols  = ABSORCION_PROTOCOLS.filter(p => p.size === 'small')
  const regularBonuses  = ABSORCION_BONUSES.filter(b => !b.secret)
  const secretBonus     = ABSORCION_BONUSES.find(b => b.secret)

  const [absorcionOpen, setAbsorcionOpen] = useState(true)
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
        {/* Header teal — always clickable */}
        <button
          onClick={() => setAbsorcionOpen(o => !o)}
          className="w-full px-5 pt-5 pb-4 flex items-start justify-between gap-3 text-left"
          style={{ background: 'linear-gradient(135deg, hsl(168 55% 26%), hsl(172 48% 18%))' }}
        >
          <div>
            <p className="text-[.6rem] font-bold tracking-[.18em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,.7)' }}>
              🎁 Incluido como regalo especial
            </p>
            <h2 className="font-display font-bold text-[1.25rem] leading-tight text-white">
              🧪 Protocolo Absorción Máxima
            </h2>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,.8)' }}>
              Maximiza la acción del vinagre · 6 materiales
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 mt-1">
            <div className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,.2)', color: 'white' }}>
              {absorcionCount}/6
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2.5" style={{ transform: absorcionOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .25s' }}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </button>

        {/* Accordion content */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: absorcionOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div
              className="px-4 pt-4 pb-4"
              style={{
                background: 'hsl(168 40% 97%)',
                opacity: absorcionOpen ? 1 : 0,
                transform: absorcionOpen ? 'translateY(0)' : 'translateY(-6px)',
                transition: 'opacity 0.28s ease, transform 0.28s ease',
                transitionDelay: absorcionOpen ? '0.08s' : '0s',
              }}
            >
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
        {/* Header — always clickable */}
        <button
          onClick={() => setRitualOpen(o => !o)}
          className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left"
          style={{ background: 'linear-gradient(135deg, hsl(36 70% 46%), hsl(28 65% 36%))' }}
        >
          <div>
            <p className="text-[.6rem] font-bold tracking-[.18em] uppercase mb-1" style={{ color: 'rgba(255,255,255,.7)' }}>
              🎁 Incluido como regalo especial
            </p>
            <h3 className="font-display font-bold text-[1.1rem] leading-tight text-white">
              🔥 Ritual Activador Ácido
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.8)' }}>
              Protocolo completo · 7 materiales
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,.2)', color: 'white' }}>
              {ritualCount}/7
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2.5" style={{ transform: ritualOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .25s' }}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </button>

        {/* Conteúdo expandível — grid trick: anima altura real sem max-height fixo */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: ritualOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div
              className="px-4 pt-4 pb-4"
              style={{
                background: 'hsl(38 80% 97%)',
                opacity: ritualOpen ? 1 : 0,
                transform: ritualOpen ? 'translateY(0)' : 'translateY(-6px)',
                transition: 'opacity 0.28s ease, transform 0.28s ease',
                transitionDelay: ritualOpen ? '0.08s' : '0s',
              }}
            >
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
          </div>
        </div>

      </div>

      {/* ── BLOCO SAGE GREEN — Bonos del Protocolo del Vinagre ── */}
      <div className="px-4 mt-2">
        <p className="text-[.65rem] font-bold tracking-[.15em] uppercase mb-3 px-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Bonos del Protocolo del Vinagre
        </p>
        {classicLocked ? (
          <div
            className="rounded-[20px] overflow-hidden"
            style={{ border: '1.5px solid hsl(var(--border))', background: 'hsl(var(--card))' }}
          >
            {/* Locked previews */}
            <div style={{ padding: '0.85rem 1rem', opacity: 0.45, pointerEvents: 'none' }}>
              {BONOS.map((bono) => (
                <div key={bono.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid hsl(var(--border))' }}>
                  <span style={{ fontSize: '1.3rem' }}>{bono.icon}</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'hsl(var(--foreground))' }}>{bono.title}</span>
                </div>
              ))}
            </div>
            {/* Countdown */}
            <div style={{ padding: '0.85rem 1rem', background: 'hsl(var(--green-pale))' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1rem' }}>🔒</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--foreground))' }}>Disponible el día 7</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: 'hsl(var(--muted-foreground))' }}>Se desbloquea en:</span>
                <span style={{ fontWeight: 700, color: 'hsl(var(--primary))' }}>
                  <LockCountdown targetTimestamp={(startTimestamp || Date.now()) + 7 * 86400000} />
                </span>
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>

      {/* ── Reinicio Mitocondrial — siempre accesible (upsell propio) ── */}
      <div className="px-4 mt-4 mb-2">
        <div
          className="rounded-[20px] overflow-hidden"
          style={{ border: '1.5px solid hsl(128 38% 55%)', boxShadow: '0 4px 20px hsl(128 28% 36% / .15)' }}
        >
          <div style={{ height: '3px', background: 'linear-gradient(90deg, hsl(128 30% 42%), hsl(36 66% 52%), hsl(280 50% 60%))' }} />
          <div style={{ padding: '1rem 1.1rem', background: 'hsl(var(--green-pale))' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <div>
                <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))', marginBottom: '0.3rem' }}>
                  🎁 Incluido como regalo especial
                </p>
                <p style={{ fontWeight: 700, fontSize: '1rem', color: 'hsl(var(--foreground))', lineHeight: 1.25 }}>
                  🔋 Reinicio Mitocondrial<br />+ Protocolo 60 Días
                </p>
              </div>
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>🏆</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.65rem' }}>
              El siguiente nivel — para mantener y amplificar tus resultados a largo plazo.
            </p>
            <div style={{ background: 'hsl(var(--primary))', color: '#fff', borderRadius: '12px', padding: '0.6rem 1rem', textAlign: 'center', fontSize: '0.88rem', fontWeight: 600 }}>
              Ver mi protocolo de mantenimiento →
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
