import { useMemo, useState, useEffect, useRef } from 'react'
import ProgressRing from '../components/ProgressRing'
import InstallBanner from '../components/InstallBanner'
import { SYMPTOM_DAYS, SYMPTOM_QUESTIONS, EMOJI_SCALE, LESSONS } from '../data'
import { DAILY_TIPS, TESTIMONIALS, VINEGAR_FACTS } from '../data/daily'

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

function ActionCard({ day, todayDone, onComplete, compact }) {
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
        {/* Day badge */}
        <span
          className="inline-flex items-center text-xs font-bold tracking-[.1em] uppercase px-3 py-1 rounded-full"
          style={{ background: 'hsl(var(--accent-pale))', color: 'hsl(var(--accent))' }}
        >
          Día {day} de 21
        </span>

        {!compact && (
          <>
            <h1
              className="font-display font-bold text-balance leading-snug mt-3"
              style={{ fontSize: 'clamp(1.4rem, 5.5vw, 1.7rem)', color: 'hsl(var(--foreground))' }}
            >
              Toma tu preparación<br />de vinagre ahora
            </h1>

            {/* Instruction chip */}
            <div
              className="flex items-center gap-2.5 mt-3 mb-5 px-4 py-3 rounded-[14px]"
              style={{ background: 'hsl(var(--green-pale))' }}
            >
              <span className="text-[1.15rem] shrink-0" aria-hidden="true">🫙</span>
              <p className="text-sm font-medium leading-snug" style={{ color: 'hsl(var(--foreground) / .78)' }}>
                2 cucharadas en 200 ml de agua tibia
              </p>
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

        {!todayDone && (
          <p className="text-center text-xs mt-2.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Tócalo después de tomar tu preparación
          </p>
        )}
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

export default function Inicio({ appState, handlers, setViewer }) {
  const { day, days, symScores, lessons, pwa } = appState
  const { completeToday, recordSymptom } = handlers

  const todayDone = days[day - 1]
  const percent   = Math.round(days.filter(Boolean).length / 21 * 100)

  const streak = useMemo(() => {
    let s = 0
    for (let i = day - 1; i >= 0; i--) { if (days[i]) s++; else break }
    return s
  }, [days, day])

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

      {/* Block 1 — Action card (always, transforms on complete) */}
      <ActionCard
        day={day}
        todayDone={todayDone}
        onComplete={handleComplete}
        compact={bloomed}
      />

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

          {/* 9 — Tomorrow */}
          <BloomBlock delay={nextDelay()} justBloomed={justBloomed}>
            <TomorrowBlock nextDay={nextDay} />
          </BloomBlock>
        </>
      )}

    </div>
  )
}
