import { useState, useEffect } from 'react'
import { LESSONS } from '../data'

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
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

// ── Locked lesson card ────────────────────────────────────────────────────────

function LockedLessonCard({ lesson, startTimestamp, daysSinceStart }) {
  const targetTimestamp = startTimestamp + lesson.unlockDay * 86400000
  const progress = Math.min(100, Math.round((daysSinceStart / lesson.unlockDay) * 100))

  return (
    <div
      className="flex items-start gap-4 p-[17px] rounded-[18px] border"
      style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', opacity: 0.75 }}
    >
      {/* Lock circle */}
      <div
        className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-xl"
        style={{ background: 'hsl(var(--border))' }}
      >
        🔒
      </div>

      <div className="flex-1 min-w-0">
        {/* Eyebrow */}
        <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {lesson.eyebrow}
        </p>
        {/* Title muted */}
        <p className="font-semibold text-sm leading-snug mb-3" style={{ color: 'hsl(var(--foreground) / .55)' }}>
          {lesson.title}
        </p>

        {/* Countdown chip */}
        <div
          className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-[11px] mb-2.5"
          style={{ background: 'hsl(var(--green-pale))' }}
        >
          <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Se desbloquea en:</span>
          <span className="text-xs font-bold" style={{ color: 'hsl(var(--primary))' }}>
            <LockCountdown targetTimestamp={targetTimestamp} />
          </span>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-[.65rem] font-semibold mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <span>Progreso</span>
            <span>Día {lesson.unlockDay} de 21</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(var(--border))' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'hsl(var(--primary))', borderRadius: '99px', transition: 'width .5s' }} />
          </div>
        </div>

        {/* Quote */}
        {lesson.lockQuote && (
          <p className="text-[.72rem] italic leading-snug mt-2.5 pt-2.5" style={{ color: 'hsl(var(--muted-foreground))', borderTop: '1px solid hsl(var(--border))' }}>
            "{lesson.lockQuote.text}" — {lesson.lockQuote.author}
          </p>
        )}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Protocolo({ appState, setViewer }) {
  const { lessons, startTimestamp } = appState
  const daysSinceStart = startTimestamp ? Math.floor((Date.now() - startTimestamp) / 86400000) : 0

  const doneCount = lessons.filter(Boolean).length
  const fillPct = (doneCount / LESSONS.length) * 100

  return (
    <div className="animate-fade">
      <div className="px-5 pt-6 pb-4">
        <h2 className="font-display font-bold text-[1.5rem] text-foreground">El Protocolo</h2>
        <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {doneCount} de {LESSONS.length} lecciones completadas
        </p>
      </div>

      <div className="px-4 flex flex-col gap-3">
        {LESSONS.map((lesson, i) => {
          const locked = lesson.unlockDay > 0 && daysSinceStart < lesson.unlockDay
          const justUnlocked = lesson.unlockDay > 0 && daysSinceStart === lesson.unlockDay

          if (locked) {
            return (
              <LockedLessonCard
                key={lesson.id}
                lesson={lesson}
                startTimestamp={startTimestamp}
                daysSinceStart={daysSinceStart}
              />
            )
          }

          return (
            <button
              key={lesson.id}
              onClick={() => setViewer({ type: 'lesson', id: lesson.id })}
              className="w-full flex items-center gap-4 p-[17px] rounded-[18px] border text-left transition-all active:scale-[.98] hover:border-primary"
              style={{
                background: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                boxShadow: '0 2px 8px hsla(var(--foreground) / .05)',
                animationDelay: `${i * .07}s`,
              }}
            >
              <div
                className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-display font-bold text-lg transition-all"
                style={
                  lessons[i]
                    ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
                    : { background: 'hsl(var(--green-pale))', color: 'hsl(var(--primary))' }
                }
              >
                {lessons[i] ? <CheckIcon /> : i + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {lesson.eyebrow}
                  </p>
                  {lesson.badge && (
                    <span
                      className="text-[.6rem] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: lesson.badge === 'Empieza aquí' ? 'hsl(5 75% 52%)' : 'hsl(var(--accent))',
                        color: 'white',
                      }}
                    >
                      {lesson.badge}
                    </span>
                  )}
                  {justUnlocked && (
                    <span className="text-[.6rem] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'hsl(var(--primary))', color: 'white' }}>
                      ¡Nuevo!
                    </span>
                  )}
                </div>
                <p className="font-semibold text-sm text-foreground mt-0.5 leading-snug">
                  {lesson.title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {lessons[i] ? 'Completada ✓' : lesson.desc}
                </p>
              </div>

              <div style={{ color: 'hsl(var(--muted-foreground))' }}>
                <ChevronRight />
              </div>
            </button>
          )
        })}
      </div>

      {/* Progress bar */}
      <div
        className="mx-4 mt-5 mb-2 p-4 rounded-[16px] border"
        style={{ background: 'hsl(var(--accent-pale))', borderColor: 'hsl(var(--border))' }}
      >
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'hsl(var(--accent))' }}>
          Progreso del protocolo
        </p>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'hsl(var(--border))' }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${fillPct}%`, background: 'hsl(var(--primary))' }} />
        </div>
      </div>
    </div>
  )
}
