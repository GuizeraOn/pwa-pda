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

export default function Protocolo({ appState, setViewer }) {
  const { lessons } = appState
  const doneCount = lessons.filter(Boolean).length
  const fillPct = (doneCount / 4) * 100

  return (
    <div className="animate-fade">
      <div className="px-5 pt-6 pb-4">
        <h2 className="font-display font-bold text-[1.5rem] text-foreground">El Protocolo</h2>
        <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {doneCount} de 4 lecciones completadas
        </p>
      </div>

      <div className="px-4 flex flex-col gap-3">
        {LESSONS.map((lesson, i) => (
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
            {/* Number / check circle */}
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

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {lesson.eyebrow}
              </p>
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
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="mx-4 mt-5 mb-2 p-4 rounded-[16px] border"
        style={{ background: 'hsl(var(--accent-pale))', borderColor: 'hsl(var(--border))' }}
      >
        <p
          className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ color: 'hsl(var(--accent))' }}
        >
          Progreso del protocolo
        </p>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: 'hsl(var(--border))' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${fillPct}%`, background: 'hsl(var(--primary))' }}
          />
        </div>
      </div>
    </div>
  )
}
