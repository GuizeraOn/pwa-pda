import { useMemo, useState, useEffect, useRef } from 'react'
import ProgressRing from '../components/ProgressRing'
import InstallBanner from '../components/InstallBanner'
import { SYMPTOM_DAYS, SYMPTOM_QUESTIONS, EMOJI_SCALE, LESSONS, RECIPE_ITEMS, PHASE_RECIPES } from '../data'
import { DAILY_TIPS, TESTIMONIALS, VINEGAR_FACTS } from '../data/daily'

// ── Phase helpers ─────────────────────────────────────────────────────────────

function getPhase(day) {
  if (day < 7) return 1
  if (day < 14) return 2
  return 3
}

const PHASE_TEASERS = {
  1: 'En el Día 7 agregas el ingrediente que penetra más profundo',
  2: 'Faltan 5 días para la Fase 2 — el paso que la mayoría no conoce',
  3: 'En 4 días tu protocolo cambia. Sigue para llegar ahí',
  4: '3 días para la Activación Profunda',
  5: 'Pasado mañana empieza la parte más importante del protocolo',
  6: 'Mañana es el Día 7. Tu protocolo entra en Fase 2 🔓',
  8: 'En el Día 14 completas el protocolo con el ingrediente final',
  9: 'Faltan 5 días para la Fase 3 — el sellado definitivo',
  10: '4 días para el Sellado y Protección',
  11: '3 días para la Fase 3',
  12: 'Pasado mañana llega el ingrediente final del protocolo',
  13: 'Mañana es el Día 14. Tu protocolo entra en Fase 3 🔓',
}

function hasSeenPhaseUnlock(email, phase) {
  try { return localStorage.getItem(`protocolo_phase${phase}seen_${email}`) === '1' } catch { return true }
}
function markPhaseUnlockSeen(email, phase) {
  try { localStorage.setItem(`protocolo_phase${phase}seen_${email}`, '1') } catch {}
}

function RecipeCard({ daysCompleted, recipe }) {
  const [expanded, setExpanded] = useState(daysCompleted < 7)
  return (
    <div
      className="mx-4 rounded-[20px] overflow-hidden"
      style={{ background: 'hsl(var(--card))', border: '1.5px solid hsl(var(--primary) / .2)', boxShadow: '0 2px 10px hsla(var(--foreground) / .05)' }}
    >
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-5 py-3.5"
        style={{ background: 'transparent', cursor: 'pointer' }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.05rem' }}>📋</span>
          <span className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>Tu Receta</span>
          <span className="text-[.6rem] font-bold px-2 py-0.5 rounded-full" style={{ background: 'hsl(var(--green-pale))', color: 'hsl(var(--primary))' }}>
            {recipe.length} ingredientes
          </span>
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'hsl(var(--muted-foreground))', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: expanded ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s cubic-bezier(.4,0,.2,1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: '0 1.25rem 1rem', opacity: expanded ? 1 : 0, transform: expanded ? 'none' : 'translateY(-4px)', transition: 'opacity 0.22s ease, transform 0.22s ease', transitionDelay: expanded ? '0.05s' : '0s' }}>
            {recipe.map(({ icon, text, isNew }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.55rem' }}>
                <span style={{ fontSize: '1.15rem' }}>{icon}</span>
                <span className="text-sm" style={{ color: 'hsl(var(--foreground))', flex: 1 }}>{text}</span>
                {isNew && <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '0.18rem 0.5rem', borderRadius: '99px', background: 'hsl(36 66% 52%)', color: 'white', flexShrink: 0 }}>NUEVO</span>}
              </div>
            ))}
            <p style={{ marginTop: '0.65rem', paddingTop: '0.65rem', borderTop: '1px solid hsl(var(--border))', fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>
              Mezcla todo. Toma en ayunas cada mañana.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Bloom block wrapper ───────────────────────────────────────────────────────
// justBloomed = true  → animate in with delay
// justBloomed = false → already done on mount, appear instantly

function BloomBlock({ delay = 0, justBloomed, children }) {
  return (
    <div
      style={
        justBloomed
          ? { animation: `fadeSlideUp .55s cubic-bezier(.2,.9,.4,1) ${delay}s both` }
          : undefined
      }
    >
      {children}
    </div>
  )
}

// ── Block 1: Action hero ──────────────────────────────────────────────────────

function ActionCard({ day, todayDone, onComplete, compact, phase, phaseRecipe, phaseTeaser }) {
  return (
    <div
      className="mx-4 rounded-[24px] overflow-hidden transition-all duration-500"
      style={{
        background: todayDone ? 'hsl(var(--green-pale))' : 'hsl(var(--card))',
        border: todayDone
          ? '2px solid hsl(var(--primary) / .3)'
          : '2px solid hsl(var(--primary) / .18)',
        boxShadow: todayDone
          ? 'none'
          : '0 8px 32px hsla(var(--foreground) / .09), 0 2px 6px hsla(var(--foreground) / .05)',
      }}
    >
      {/* Top accent stripe — only on the active (not-done) card */}
      {!todayDone && (
        <div
          aria-hidden="true"
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, hsl(128 30% 42%), hsl(128 22% 50%), hsl(36 66% 52%))',
          }}
        />
      )}

      <div className={compact ? 'px-5 py-4' : 'px-6 pt-5 pb-0'}>
        {/* Day + Phase badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="inline-flex items-center text-xs font-bold tracking-[.1em] uppercase px-3 py-1 rounded-full"
            style={{ background: 'hsl(var(--accent-pale))', color: 'hsl(var(--accent))' }}
          >
            Día {day} de 21
          </span>
          {phase && (
            <span
              className="inline-flex items-center text-xs font-bold tracking-[.1em] uppercase px-3 py-1 rounded-full"
              style={{ background: 'hsl(var(--green-pale))', color: 'hsl(var(--primary))' }}
            >
              FASE {phase}
            </span>
          )}
        </div>

        {!compact && (
          <>
            <h1
              className="font-display font-bold text-balance leading-snug mt-3"
              style={{ fontSize: 'clamp(1.4rem, 5.5vw, 1.7rem)', color: 'hsl(var(--foreground))' }}
            >
              Toma tu preparación<br />de vinagre ahora
            </h1>

            {/* Inline ingredients */}
            <div
              className="mt-3 mb-5 px-4 py-3 rounded-[14px]"
              style={{ background: 'hsl(var(--green-pale))' }}
            >
              {(phaseRecipe || RECIPE_ITEMS).map(({ icon, text, isNew }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.42rem' }}>
                  <span style={{ fontSize: '1.05rem', flexShrink: 0 }}>{icon}</span>
                  <span className="text-sm font-medium leading-snug" style={{ color: 'hsl(var(--foreground) / .82)', flex: 1 }}>{text}</span>
                  {isNew && <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '99px', background: 'hsl(36 66% 52%)', color: 'white', flexShrink: 0 }}>NUEVO</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {compact && (
          <p className="font-display font-semibold text-[1.05rem] text-foreground mt-1.5">
            ¡Ya hiciste lo más importante de hoy! 🌿
          </p>
        )}
      </div>

      <div className={compact ? 'px-5 pb-4 pt-2' : 'px-5 pb-6'}>
        <button
          onClick={onComplete}
          disabled={todayDone}
          className="w-full flex items-center justify-center gap-3 rounded-[16px] font-semibold transition-all active:scale-[.97]"
          style={{
            padding: compact ? '14px 20px' : '18px 24px',
            fontSize: compact ? '.95rem' : '1.05rem',
            ...(todayDone
              ? { background: 'hsl(var(--primary) / .12)', color: 'hsl(var(--primary))', cursor: 'default' }
              : {
                  background: 'hsl(128 28% 36%)',
                  color: '#fff',
                  boxShadow: '0 4px 20px hsl(128 28% 36% / .38), 0 1px 4px hsl(128 28% 36% / .2)',
                  animation: 'checkPulse 3s ease infinite',
                }),
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          {todayDone ? `Día ${day - 1} completado` : 'Marcar como completado'}
        </button>

        {!todayDone && phaseTeaser && (
          <div style={{ marginTop: '0.6rem', padding: '0.55rem 0.75rem', borderRadius: '10px', background: 'hsl(36 66% 52% / .1)', border: '1px solid hsl(36 66% 52% / .25)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', flexShrink: 0, marginTop: '0.05rem' }}>⏳</span>
            <p style={{ fontSize: '0.73rem', color: 'hsl(var(--accent))', lineHeight: 1.4, margin: 0 }}>{phaseTeaser}</p>
          </div>
        )}
        {!todayDone && !phaseTeaser && (
          <p className="text-center text-xs mt-2.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Tócalo después de tomar tu preparación
          </p>
        )}
      </div>
    </div>
  )
}

// ── Phase reveal card (shown days 1–6) ───────────────────────────────────────

function PhaseRevealCard({ day, phase }) {
  const [expanded, setExpanded] = useState(day === 1)
  if (phase > 1) return null

  const phases = [
    { p: 1, emoji: '🫙', name: 'Preparación Base', days: 'Días 1 al 6', desc: 'El vinagre disuelve el moco acumulado. Las bases se establecen.', active: true },
    { p: 2, emoji: '⚡', name: 'Activación Profunda', days: 'Día 7 en adelante', desc: 'Se agrega el ingrediente que penetra los alvéolos más dañados.', active: false },
    { p: 3, emoji: '🏆', name: 'Sellado y Protección', days: 'Día 14 en adelante', desc: 'El ingrediente final sella el tejido pulmonar regenerado.', active: false },
  ]

  return (
    <div
      className="mx-4 rounded-[20px] overflow-hidden"
      style={{ background: 'hsl(var(--card))', border: '1.5px solid hsl(var(--primary) / .2)', boxShadow: '0 2px 10px hsla(var(--foreground) / .05)' }}
    >
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-5 py-3.5"
        style={{ background: 'transparent', cursor: 'pointer' }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.05rem' }}>📋</span>
          <span className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>Tu protocolo tiene 3 Fases</span>
          <span className="text-[.6rem] font-bold px-2 py-0.5 rounded-full" style={{ background: 'hsl(var(--green-pale))', color: 'hsl(var(--primary))' }}>
            Fase 1 activa
          </span>
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'hsl(var(--muted-foreground))', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: expanded ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s cubic-bezier(.4,0,.2,1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: '0 1rem 1rem', opacity: expanded ? 1 : 0, transform: expanded ? 'none' : 'translateY(-4px)', transition: 'opacity 0.22s ease, transform 0.22s ease', transitionDelay: expanded ? '0.05s' : '0s' }}>
            <p className="text-xs mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Cada fase agrega un ingrediente. Llegarás aquí si sigues el protocolo.
            </p>
            {phases.map(({ p, emoji, name, days: pDays, desc, active }) => (
              <div
                key={p}
                style={{
                  display: 'flex', gap: '0.75rem', padding: '0.7rem', borderRadius: '14px', marginBottom: '0.45rem',
                  background: active ? 'hsl(var(--green-pale))' : 'hsl(var(--background))',
                  border: `1.5px solid ${active ? 'hsl(var(--primary) / .3)' : 'hsl(var(--border))'}`,
                  opacity: active ? 1 : 0.65,
                }}
              >
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', background: active ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}>
                  {active ? emoji : '🔒'}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.18rem' }}>
                    <span className="text-[.62rem] font-bold tracking-[.1em] uppercase" style={{ color: active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}>FASE {p}</span>
                    <span className="text-[.62rem]" style={{ color: 'hsl(var(--muted-foreground))' }}>· {pDays}</span>
                    {active && <span className="text-[.58rem] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'hsl(var(--primary))', color: 'white' }}>← Estás aquí</span>}
                  </div>
                  <p className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{name}</p>
                  <p className="text-[.72rem] mt-0.5 leading-snug" style={{ color: 'hsl(var(--muted-foreground))' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Phase unlock celebration card ─────────────────────────────────────────────

function PhaseUnlockCard({ phase, onDismiss }) {
  const recipe = PHASE_RECIPES[phase]
  const isPhase2 = phase === 2
  const explanation = isPhase2
    ? { headline: 'Por qué la cúrcuma ahora:', body: 'La curcumina activa los cilios pulmonares que el vinagre acaba de liberar. Sin ella, el proceso de limpieza para a la mitad.' }
    : { headline: 'Por qué la miel ahora:', body: 'La miel cruda sella el tejido regenerado y potencia la absorción final, completando el ciclo de limpieza profunda.' }
  const congratsText = isPhase2
    ? 'Completaste tu primera semana. Eso te pone en el grupo del 30% que llega hasta aquí.'
    : 'Completaste dos semanas. Estás en el grupo del 8% que llega al protocolo completo.'

  return (
    <div
      className="mx-4 rounded-[24px] overflow-hidden"
      style={{ border: '2px solid hsl(var(--primary) / .35)', boxShadow: '0 8px 32px hsla(var(--foreground) / .12)' }}
    >
      {/* Celebration header */}
      <div style={{ background: 'linear-gradient(135deg, hsl(128 28% 36%), hsl(128 22% 30%))', padding: '1.4rem 1.25rem 1.2rem', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '2rem' }}>🔓</span>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '0.15rem' }}>
              FASE {phase} DESBLOQUEADA
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.25, margin: 0 }}>
              {isPhase2 ? '¡Activación Profunda!' : '¡Sellado y Protección!'}
            </h2>
          </div>
        </div>
        <p style={{ fontSize: '0.81rem', opacity: 0.9, lineHeight: 1.5, margin: 0 }}>{congratsText}</p>
      </div>

      {/* Phase recipe */}
      <div style={{ padding: '1rem 1.25rem', background: 'hsl(var(--card))', borderTop: '1px solid hsl(var(--border))' }}>
        <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(var(--primary))', marginBottom: '0.75rem' }}>
          ⚡ RECETA FASE {phase} — {isPhase2 ? 'Activación Profunda' : 'Sellado y Protección'}
        </p>
        {recipe.map(({ icon, text, isNew }) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
            <span style={{ fontSize: '1.05rem', flexShrink: 0 }}>{icon}</span>
            <span style={{ fontSize: '0.88rem', color: 'hsl(var(--foreground))', flex: 1 }}>{text}</span>
            {isNew && (
              <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '99px', background: 'hsl(36 66% 52%)', color: 'white', flexShrink: 0 }}>
                ← NUEVO
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div style={{ padding: '0.9rem 1.25rem', background: 'hsl(var(--green-pale))', borderTop: '1px solid hsl(var(--primary) / .15)' }}>
        <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(var(--primary))', marginBottom: '0.4rem' }}>
          {explanation.headline}
        </p>
        <p style={{ fontSize: '0.84rem', color: 'hsl(var(--foreground))', lineHeight: 1.55, margin: 0 }}>
          {explanation.body}
        </p>
      </div>

      {/* CTA */}
      <div style={{ padding: '1rem 1.25rem', background: 'hsl(var(--card))' }}>
        <button
          onClick={onDismiss}
          className="w-full transition-all active:scale-[.97]"
          style={{ padding: '16px 24px', borderRadius: '16px', background: 'hsl(128 28% 36%)', color: '#fff', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 20px hsl(128 28% 36% / .35)' }}
        >
          ✓ Entendido — empezar Fase {phase}
        </button>
      </div>
    </div>
  )
}

// ── Block 2: Celebration banner ───────────────────────────────────────────────

function CelebrationBanner({ streak, daysCompleted }) {
  return (
    <div
      className="mx-4 rounded-[20px] p-5 flex items-center gap-4"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(128 22% 36%))',
        color: 'white',
        boxShadow: '0 4px 20px hsla(var(--primary) / .3)',
      }}
    >
      <div className="text-[2.2rem] shrink-0">🎉</div>
      <div>
        <p className="font-display font-bold text-[1.1rem] leading-tight">
          {daysCompleted === 21 ? '¡Protocolo completo!' : `¡Día ${daysCompleted} listo!`}
        </p>
        <p className="text-sm mt-0.5 opacity-90">
          {streak > 1 ? `${streak} días seguidos 🔥 — ¡sigue así!` : 'Hoy sumaste un día más a tu salud.'}
        </p>
      </div>
    </div>
  )
}

// ── Block 3: Progress ring ────────────────────────────────────────────────────

function ProgressSection({ percent }) {
  return (
    <div>
      <p
        className="text-center text-xs font-bold tracking-widest uppercase mb-3"
        style={{ color: 'hsl(var(--muted-foreground))' }}
      >
        Tu progreso total
      </p>
      <ProgressRing percent={percent} size={130} strokeWidth={10} />
    </div>
  )
}

// ── Block 4: Dica del día ─────────────────────────────────────────────────────

function TipBlock({ tip }) {
  return (
    <div
      className="mx-4 rounded-[20px] p-5 border"
      style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[1.2rem]">{tip.icon}</span>
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'hsl(var(--accent))' }}>
          Consejo del día
        </p>
      </div>
      <p className="font-display font-semibold text-[1rem] text-foreground mb-1.5">{tip.title}</p>
      <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{tip.body}</p>
    </div>
  )
}

// ── Block 5: Symptom check ────────────────────────────────────────────────────

function SymptomCard({ checkDay, question, onRecord }) {
  return (
    <div
      className="mx-4 rounded-[20px] p-5 border"
      style={{ background: 'hsl(var(--green-pale))', borderColor: 'hsl(var(--primary) / .3)' }}
    >
      <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'hsl(var(--primary))' }}>
        Control del Día {checkDay}
      </p>
      <p className="font-display font-semibold text-base text-foreground mb-4 text-balance">{question}</p>
      <div className="flex justify-around">
        {EMOJI_SCALE.map((emoji, i) => (
          <button
            key={i}
            onClick={() => onRecord(checkDay, i + 1)}
            className="text-[1.9rem] p-2 rounded-xl border-2 border-transparent transition-all active:scale-110 hover:scale-110"
            aria-label={`Puntaje ${i + 1} de 5`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Block 6: Testimonial ──────────────────────────────────────────────────────

function TestimonialBlock({ t }) {
  return (
    <div
      className="mx-4 rounded-[20px] p-5 border"
      style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))',
        borderLeft: '3px solid hsl(var(--accent) / .5)',
      }}
    >
      <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Experiencia real
      </p>
      <p className="font-display italic text-[1rem] text-foreground leading-[1.6] text-balance mb-3">
        "{t.text}"
      </p>
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
          style={{ background: 'hsl(var(--accent))', color: 'white' }}
        >
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">{t.name}, {t.age} años</p>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{t.city}</p>
        </div>
      </div>
    </div>
  )
}

// ── Block 7: Vinegar fact ─────────────────────────────────────────────────────

function FactBlock({ fact }) {
  return (
    <div
      className="mx-4 rounded-[20px] p-5"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--accent-pale)), hsl(var(--card)))',
        border: '1.5px solid hsl(var(--accent) / .2)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[1.2rem]">{fact.emoji}</span>
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'hsl(var(--accent))' }}>
          {fact.headline}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-foreground">{fact.fact}</p>
    </div>
  )
}

// ── Block 8: Next lesson ──────────────────────────────────────────────────────

function NextLessonBlock({ lessons, setViewer }) {
  const nextIdx = lessons.findIndex(done => !done)
  if (nextIdx === -1) return null
  const lesson = LESSONS[nextIdx]

  return (
    <button
      onClick={() => setViewer({ type: 'lesson', id: nextIdx })}
      className="w-full mx-4 rounded-[20px] p-5 border text-left transition-all active:scale-[.98]"
      style={{
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))',
        width: 'calc(100% - 2rem)',
      }}
    >
      <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'hsl(var(--primary))' }}>
        Continúa aprendiendo
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center font-display font-bold text-lg"
          style={{ background: 'hsl(var(--green-pale))', color: 'hsl(var(--primary))' }}
        >
          {nextIdx + 1}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground leading-snug">{lesson.title}</p>
          <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>Lección {nextIdx + 1} — No leída aún</p>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'hsl(var(--muted-foreground))', flexShrink: 0 }} aria-hidden="true">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </button>
  )
}

// ── Block 8b: Absorción Máxima discovery card ────────────────────────────────
// Aparece a partir do dia 3, uma vez por sessão. Teal, navega para aba Bonos.

function AbsorcionDiscoveryCard({ onGoToBonos }) {
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem('absorcion_seen') === '1' } catch { return false }
  })

  if (dismissed) return null

  const dismiss = () => {
    try { sessionStorage.setItem('absorcion_seen', '1') } catch {}
    setDismissed(true)
  }

  return (
    <div
      className="mx-4 rounded-[20px] p-5 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(168 55% 26%), hsl(172 48% 18%))',
        boxShadow: '0 6px 24px hsl(168 55% 26% / .22)',
      }}
    >
      {/* Dismiss */}
      <button
        onClick={dismiss}
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ background: 'rgba(255,255,255,.18)', color: 'rgba(255,255,255,.8)' }}
        aria-label="Cerrar"
      >
        ✕
      </button>

      <p className="text-[.65rem] font-bold tracking-[.15em] uppercase mb-2" style={{ color: 'rgba(255,255,255,.7)' }}>
        ✨ Acceso especial incluido
      </p>
      <p className="font-display font-bold text-[1.1rem] leading-snug text-white text-balance mb-1">
        El Protocolo Absorción Máxima está listo para maximizar tu resultado desde hoy.
      </p>
      <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,.8)' }}>
        6 materiales exclusivos · incluido con tu programa
      </p>

      <button
        onClick={() => { dismiss(); onGoToBonos() }}
        className="flex items-center gap-2 px-5 py-3 rounded-[12px] font-semibold text-sm transition-all active:scale-[.96]"
        style={{ background: 'rgba(255,255,255,.22)', color: 'white' }}
      >
        Ver el Protocolo →
      </button>
    </div>
  )
}

// ── Block 9: Tomorrow ─────────────────────────────────────────────────────────

function TomorrowBlock({ nextDay }) {
  if (nextDay > 21) return null
  return (
    <div
      className="mx-4 rounded-[20px] p-5 flex items-center gap-4 border"
      style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
    >
      <span className="text-[1.8rem] shrink-0">🌅</span>
      <div>
        <p className="font-display font-semibold text-[.95rem] text-foreground">
          Mañana: Día {nextDay} de 21
        </p>
        <p className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Regresa a la misma hora de siempre. Tu preparación te espera.
        </p>
      </div>
    </div>
  )
}

// ── Pre-bloom hint ────────────────────────────────────────────────────────────

function PreBloomHint({ count }) {
  return (
    <div className="flex items-center justify-center gap-2 py-3 mt-1">
      <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground) / .7)' }}>
        {count} bloques de contenido te esperan
      </span>
      <span className="text-base">⬇️</span>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Inicio({ appState, handlers, setViewer, setTab }) {
  const { day, days, symScores, lessons, pwa, email } = appState
  const { completeToday, recordSymptom } = handlers

  const todayDone = days[day - 1]
  const percent   = Math.round(days.filter(Boolean).length / 21 * 100)

  const streak = useMemo(() => {
    let s = 0
    for (let i = day - 1; i >= 0; i--) { if (days[i]) s++; else break }
    return s
  }, [days, day])

  // Phase state
  const phase = getPhase(day)
  const phaseRecipe = PHASE_RECIPES[phase]
  const phaseTeaser = PHASE_TEASERS[day] || null
  const [seenPhase2, setSeenPhase2] = useState(() => hasSeenPhaseUnlock(email, 2))
  const [seenPhase3, setSeenPhase3] = useState(() => hasSeenPhaseUnlock(email, 3))
  const showPhase2Unlock = phase === 2 && !seenPhase2
  const showPhase3Unlock = phase === 3 && !seenPhase3
  const unlockPhase = showPhase2Unlock ? 2 : showPhase3Unlock ? 3 : null

  function dismissPhaseUnlock() {
    if (unlockPhase) {
      markPhaseUnlockSeen(email, unlockPhase)
      if (unlockPhase === 2) setSeenPhase2(true)
      else setSeenPhase3(true)
    }
  }

  // justBloomed: only true when user clicks the button THIS session
  const [justBloomed, setJustBloomed] = useState(false)
  const justBoomedRef = useRef(false)

  // If todayDone when component mounts, show completed state instantly (no animation)
  const [bloomed, setBloomed] = useState(todayDone)

  useEffect(() => {
    if (todayDone && !bloomed) setBloomed(true)
  }, [todayDone])

  const handleComplete = () => {
    completeToday()
    setBloomed(true)
    setJustBloomed(true)
    justBoomedRef.current = true
  }

  // Rotating content keyed to day number
  const tip         = DAILY_TIPS[day % DAILY_TIPS.length]
  const testimonial = TESTIMONIALS[day % TESTIMONIALS.length]
  const fact        = VINEGAR_FACTS[day % VINEGAR_FACTS.length]
  const daysCompleted = days.filter(Boolean).length
  const nextDay     = Math.min(day + 1, 21)

  // Symptom checks pending AFTER completion
  const pendingSymptomDays = SYMPTOM_DAYS.filter(
    d => day >= d && symScores[d] === undefined
  )

  // Stagger delays for each block
  const delays = [0, .1, .22, .36, .5, .62, .76, .9]
  let di = 0
  const nextDelay = () => delays[di++] ?? (di * .12)

  return (
    <div className="animate-fade flex flex-col gap-3.5 pt-4 pb-4">

      {/* Banner inteligente de instalação PWA */}
      <InstallBanner
        onInstall={pwa?.promptInstall}
        isInstalled={pwa?.isInstalled}
        isIOS={pwa?.isIOS}
      />

      {/* Recipe card — permanent, shows phase-specific recipe */}
      <RecipeCard daysCompleted={daysCompleted} recipe={phaseRecipe} />

      {/* Phase reveal — visible days 1–6, collapses after Phase 1 */}
      <PhaseRevealCard day={day} phase={phase} />

      {/* Block 1 — Phase unlock celebration OR normal action card */}
      {unlockPhase ? (
        <PhaseUnlockCard phase={unlockPhase} onDismiss={dismissPhaseUnlock} />
      ) : (
        <ActionCard
          day={day}
          todayDone={todayDone}
          onComplete={handleComplete}
          compact={bloomed}
          phase={phase}
          phaseRecipe={phaseRecipe}
          phaseTeaser={phaseTeaser}
        />
      )}

      {/* Pre-bloom hint — only before completion */}
      {!bloomed && <PreBloomHint count={8} />}

      {/* Blocks 2–9 — only after bloom */}
      {bloomed && (
        <>
          {/* 2 — Celebration */}
          <BloomBlock delay={nextDelay()} justBloomed={justBloomed}>
            <CelebrationBanner streak={streak} daysCompleted={daysCompleted} />
          </BloomBlock>

          {/* 3 — Progress ring */}
          <BloomBlock delay={nextDelay()} justBloomed={justBloomed}>
            <ProgressSection percent={percent} />
          </BloomBlock>

          {/* 4 — Tip del día */}
          <BloomBlock delay={nextDelay()} justBloomed={justBloomed}>
            <TipBlock tip={tip} />
          </BloomBlock>

          {/* 5 — Symptom check (conditional, one at a time) */}
          {pendingSymptomDays.slice(0, 1).map(d => (
            <BloomBlock key={d} delay={nextDelay()} justBloomed={justBloomed}>
              <SymptomCard
                checkDay={d}
                question={SYMPTOM_QUESTIONS[d]}
                onRecord={recordSymptom}
              />
            </BloomBlock>
          ))}

          {/* 6 — Testimonial */}
          <BloomBlock delay={nextDelay()} justBloomed={justBloomed}>
            <TestimonialBlock t={testimonial} />
          </BloomBlock>

          {/* 7 — Vinegar fact */}
          <BloomBlock delay={nextDelay()} justBloomed={justBloomed}>
            <FactBlock fact={fact} />
          </BloomBlock>

          {/* 8 — Next lesson */}
          <BloomBlock delay={nextDelay()} justBloomed={justBloomed}>
            <NextLessonBlock lessons={lessons} setViewer={setViewer} />
          </BloomBlock>

          {/* 8b — Absorción discovery (day 3+, once per session) */}
          {day >= 3 && (
            <BloomBlock delay={nextDelay()} justBloomed={justBloomed}>
              <AbsorcionDiscoveryCard onGoToBonos={() => setTab('bonos')} />
            </BloomBlock>
          )}

          {/* 9 — Tomorrow */}
          <BloomBlock delay={nextDelay()} justBloomed={justBloomed}>
            <TomorrowBlock nextDay={nextDay} />
          </BloomBlock>
        </>
      )}

    </div>
  )
}
