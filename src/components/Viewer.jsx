import { LESSONS, BONOS } from '../data'
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

export default function Viewer({ viewer, appState, onComplete, onClose }) {
  const { type, id } = viewer
  const isLesson = type === 'lesson'

  const item = isLesson ? LESSONS[id] : BONOS[id]
  const isDone = isLesson ? appState.lessons[id] : appState.bonuses[id]

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
          <p className="text-[.65rem] font-bold tracking-widest uppercase" style={{ color: 'hsl(var(--accent))' }}>
            {isLesson ? item.eyebrow : item.tag}
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
              background: 'hsl(var(--green-pale))',
              borderColor: 'hsl(var(--primary) / .3)',
              color: 'hsl(var(--primary))',
            }}
            aria-label="Descargar archivo PDF"
            title="Descargar archivo PDF"
          >
            <DownloadIcon />
          </a>
        )}
      </div>

      {/* Visualizador de PDF Direto e Nativo via Canvas */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {item.pdf ? (
          <PDFCanvasViewer pdfUrl={item.pdf} title={item.title} />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            No se encontró el documento PDF.
          </div>
        )}
      </div>

      {/* Footer — Botão de Concluir */}
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
