import { LESSONS, BONOS, RITUAL_PROTOCOLS, RITUAL_BONUSES } from '../data'
import PDFCanvasViewer from './PDFCanvasViewer'

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

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function NoPdfPlaceholder({ icon, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
      <span className="text-[3rem]">{icon}</span>
      <p className="font-display font-semibold text-[1.1rem] text-foreground">{subtitle}</p>
      <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
        El contenido de este material estará disponible muy pronto.
        Cuando esté listo, aparecerá aquí automáticamente.
      </p>
    </div>
  )
}

function resolveViewer(type, id, appState) {
  switch (type) {
    case 'lesson':
      return {
        item: LESSONS[id],
        isDone: appState.lessons[id],
        eyebrow: LESSONS[id]?.eyebrow,
        doneLabel: 'Lección completada',
      }
    case 'bonus':
      return {
        item: BONOS[id],
        isDone: appState.bonuses[id],
        eyebrow: BONOS[id]?.tag,
        doneLabel: 'Bono revisado',
      }
    case 'ritual-protocol':
      return {
        item: RITUAL_PROTOCOLS[id],
        isDone: appState.ritualProtocols?.[id],
        eyebrow: 'Ritual Activador Ácido',
        doneLabel: 'Protocolo completado',
      }
    case 'ritual-bonus':
      return {
        item: RITUAL_BONUSES[id],
        isDone: appState.ritualBonuses?.[id],
        eyebrow: 'Bono del Ritual',
        doneLabel: 'Bono revisado',
      }
    default:
      return { item: null, isDone: false, eyebrow: '', doneLabel: 'Completado' }
  }
}

export default function Viewer({ viewer, appState, onComplete, onClose }) {
  const { type, id } = viewer
  const { item, isDone, eyebrow, doneLabel } = resolveViewer(type, id, appState)

  if (!item) return null

  const isRitual = type === 'ritual-protocol' || type === 'ritual-bonus'

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-background animate-slide-up"
      style={{ maxWidth: '430px', margin: '0 auto' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3.5 border-b shrink-0"
        style={{
          borderColor: 'hsl(var(--border))',
          background: 'hsl(var(--background))',
        }}
      >
        <button
          onClick={onClose}
          className="w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all active:scale-[.92]"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
          aria-label="Volver"
        >
          <BackIcon />
        </button>

        <div className="flex-1 min-w-0">
          <p
            className="text-[.65rem] font-bold tracking-widest uppercase"
            style={{ color: isRitual ? 'hsl(var(--accent))' : 'hsl(var(--primary))' }}
          >
            {eyebrow}
          </p>
          <h2 className="font-display font-semibold text-[.95rem] text-foreground leading-snug text-balance truncate">
            {item.title}
          </h2>
        </div>

        {item.pdf && (
          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all active:scale-[.92]"
            style={{
              background: isRitual ? 'hsl(var(--accent-pale))' : 'hsl(var(--green-pale))',
              borderColor: isRitual ? 'hsl(var(--accent) / .3)' : 'hsl(var(--primary) / .3)',
              color: isRitual ? 'hsl(var(--accent))' : 'hsl(var(--primary))',
            }}
            aria-label="Descargar archivo PDF"
            title="Descargar archivo PDF"
          >
            <DownloadIcon />
          </a>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {item.pdf ? (
          <PDFCanvasViewer pdfUrl={item.pdf} title={item.title} />
        ) : (
          <NoPdfPlaceholder icon={item.icon ?? '📄'} subtitle={item.subtitle ?? item.desc ?? item.title} />
        )}
      </div>

      {/* Footer — complete button */}
      <div
        className="px-4 py-3.5 border-t shrink-0 z-10"
        style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--background))' }}
      >
        <button
          onClick={() => !isDone && onComplete(id)}
          disabled={isDone}
          className="w-full flex items-center justify-center gap-2.5 py-[15px] rounded-[14px] font-semibold text-base transition-all active:scale-[.97]"
          style={
            isDone
              ? { background: isRitual ? 'hsl(var(--accent-pale))' : 'hsl(var(--green-pale))', color: isRitual ? 'hsl(var(--accent))' : 'hsl(var(--primary))', cursor: 'default' }
              : {
                  background: isRitual ? 'hsl(36 66% 42%)' : 'hsl(128 28% 36%)',
                  color: '#fff',
                  boxShadow: isRitual ? '0 4px 16px hsl(36 66% 42% / .3)' : '0 4px 16px hsl(128 28% 36% / .3)',
                }
          }
        >
          <CheckIcon />
          {isDone ? doneLabel : 'Marcar como completado'}
        </button>
      </div>
    </div>
  )
}
