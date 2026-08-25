import { LESSONS, BONOS } from '../data'
import { Lesson1, Lesson2, Lesson3, Lesson4 } from '../content/lessons'
import { Bonus1, Bonus2, Bonus3 } from '../content/bonuses'

const LESSON_CONTENT = [Lesson1, Lesson2, Lesson3, Lesson4]
const BONUS_CONTENT  = [Bonus1, Bonus2, Bonus3]

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
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
function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function PdfViewer({ pdf, title }) {
  return (
    <div className="flex flex-col h-full">
      {/* Hint bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b shrink-0"
        style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
      >
        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Desliza para leer el documento completo
        </p>
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold transition-opacity active:opacity-70"
          style={{ color: 'hsl(var(--primary))' }}
        >
          Abrir <ExternalIcon />
        </a>
      </div>

      {/* PDF iframe — takes all remaining space */}
      <div className="flex-1 min-h-0">
        <iframe
          src={pdf}
          title={title}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>
    </div>
  )
}

export default function Viewer({ viewer, appState, onComplete, onClose }) {
  const { type, id } = viewer
  const isLesson = type === 'lesson'

  const item = isLesson ? LESSONS[id] : BONOS[id]
  const isDone = isLesson ? appState.lessons[id] : appState.bonuses[id]

  const hasPdf = !!item.pdf
  const ContentComponent = isLesson ? LESSON_CONTENT[id] : BONUS_CONTENT[id]

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-background animate-slide-up"
      style={{ maxWidth: '430px', margin: '0 auto' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-4 border-b shrink-0"
        style={{ borderColor: 'hsl(var(--border))' }}
      >
        <button
          onClick={onClose}
          className="w-11 h-11 shrink-0 rounded-full border flex items-center justify-center transition-all active:scale-[.92]"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
          aria-label="Volver"
        >
          <BackIcon />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[.65rem] font-bold tracking-widest uppercase" style={{ color: 'hsl(var(--accent))' }}>
            {isLesson ? item.eyebrow : item.tag}
          </p>
          <h2 className="font-display font-semibold text-[.95rem] text-foreground leading-snug text-balance truncate">
            {item.title}
          </h2>
        </div>
        {hasPdf && (
          <a
            href={item.pdf}
            download
            className="w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all active:scale-[.92]"
            style={{ background: 'hsl(var(--green-pale))', borderColor: 'hsl(var(--primary) / .3)' }}
            aria-label="Descargar PDF"
            title="Descargar PDF"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'hsl(var(--primary))' }} aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </a>
        )}
      </div>

      {/* Scrollable content / PDF viewer */}
      <div className={`flex-1 min-h-0 ${hasPdf ? 'overflow-hidden flex flex-col' : 'overflow-y-auto no-scrollbar px-5 py-6'}`}>
        {hasPdf
          ? <PdfViewer pdf={item.pdf} title={item.title} />
          : ContentComponent && <ContentComponent />
        }
      </div>

      {/* Footer — complete button */}
      <div
        className="px-4 py-4 border-t shrink-0"
        style={{ borderColor: 'hsl(var(--border))' }}
      >
        <button
          onClick={() => !isDone && onComplete(id)}
          disabled={isDone}
          className="w-full flex items-center justify-center gap-2.5 py-[17px] rounded-[14px] font-semibold text-base transition-all active:scale-[.97]"
          style={
            isDone
              ? { background: 'hsl(var(--green-pale))', color: 'hsl(var(--primary))', cursor: 'default' }
              : {
                  background: 'hsl(128 28% 36%)',
                  color: '#fff',
                  boxShadow: '0 4px 16px hsl(128 28% 36% / .3)',
                }
          }
        >
          <CheckIcon />
          {isDone
            ? (isLesson ? 'Lección completada' : 'Bono revisado')
            : 'Marcar como completado'}
        </button>
      </div>
    </div>
  )
}
