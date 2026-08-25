import { useMemo } from 'react'
import { ACHIEVEMENTS, EMOJI_SCALE } from '../data'

export default function Progreso({ appState }) {
  const { day, days, symScores } = appState

  const percent = Math.round(days.filter(Boolean).length / 21 * 100)
  const streak = useMemo(() => {
    let s = 0
    for (let i = day - 1; i >= 0; i--) { if (days[i]) s++; else break }
    return s
  }, [days, day])

  const unlockedIds = useMemo(
    () => ACHIEVEMENTS.filter(a => a.condition(days)).map(a => a.id),
    [days]
  )

  const symEntries = Object.entries(symScores)

  return (
    <div className="animate-fade">
      <div className="px-5 pt-6 pb-4">
        <h2 className="font-display font-bold text-[1.5rem] text-foreground">Mi Progreso</h2>
        <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Día {day} de 21 — {percent}% del protocolo
        </p>
      </div>

      {/* Streak card */}
      <div className="mx-4 mb-5">
        <div
          className="flex items-center gap-5 p-5 rounded-[20px]"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(36 66% 32%))',
            color: 'white',
            boxShadow: '0 6px 24px hsla(var(--accent) / .28)',
          }}
        >
          <div>
            <div className="font-display font-bold text-[3rem] leading-none">{streak}</div>
          </div>
          <div>
            <p className="text-sm opacity-90 mt-0.5">días seguidos 🔥</p>
            {streak >= 7 && (
              <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,.2)' }}>
                ¡Una semana! ⭐
              </span>
            )}
            <p className="text-xs mt-2 opacity-80">El hábito se forma a los 21 días.</p>
          </div>
        </div>
      </div>

      {/* 21-day grid */}
      <div className="mx-4 mb-5">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Los 21 días
        </p>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 21 }, (_, i) => {
            const done = days[i]
            const isToday = i === day - 1
            const isFuture = i > day - 1

            return (
              <div
                key={i}
                className="aspect-square rounded-[8px] flex items-center justify-center text-xs font-bold border-2 transition-all"
                style={
                  done
                    ? { background: 'hsl(var(--primary))', borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
                    : isToday
                    ? { background: 'hsl(var(--card))', borderColor: 'hsl(var(--accent))', color: 'hsl(var(--accent))' }
                    : { background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))', opacity: isFuture ? .4 : 1 }
                }
              >
                {done ? '✓' : i + 1}
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="mx-4 mb-5">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Logros
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {ACHIEVEMENTS.map(a => {
            const isUnlocked = unlockedIds.includes(a.id)
            return (
              <div
                key={a.id}
                className="rounded-[16px] p-4 border-2 text-center transition-all"
                style={
                  isUnlocked
                    ? {
                        borderColor: 'hsl(var(--accent))',
                        background: 'hsl(var(--accent-pale))',
                        animation: 'badgePop .5s ease both',
                      }
                    : {
                        borderColor: 'hsl(var(--border))',
                        background: 'hsl(var(--card))',
                        opacity: .5,
                        filter: 'grayscale(.6)',
                      }
                }
              >
                <div className="text-[2rem] mb-1.5">{a.icon}</div>
                <p className="text-xs font-bold text-foreground leading-snug">{a.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{a.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Symptom log */}
      {symEntries.length > 0 && (
        <div className="mx-4 mb-5">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Controles de salud
          </p>
          <div className="flex flex-col gap-2">
            {symEntries.map(([d, score]) => (
              <div
                key={d}
                className="flex items-center justify-between p-4 rounded-[12px] border"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
              >
                <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Control día {d}
                </span>
                <span className="text-[1.5rem]">{EMOJI_SCALE[score - 1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
