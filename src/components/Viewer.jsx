import { useState } from 'react'
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

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 12-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

export default function Viewer({ viewer, appState, onComplete, onClose }) {
  const { type, id } = viewer
  const isLesson = type === 'lesson'

  const item = isLesson ? LESSONS[id] : BONOS[id]
  const isDone = isLesson ? appState.lessons[id] : appState.bonuses[id]

  const hasPdf = Boolean(item.pdf)
  const ContentComponent = isLesson ? LESSON_CONTENT[id] : BONUS_CONTENT[id]
  const [viewMode, setViewMode] = useState('reader') // 'reader' | 'pdf'

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

        {hasPdf && (
          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all active:scale-[.92]"
            style={{ background: 'hsl(var(--green-pale))', borderColor: 'hsl(var(--primary) / .3)', color: 'hsl(var(--primary))' }}
            aria-label="Descargar PDF"
            title="Descargar PDF"
          >
            <DownloadIcon />
          </a>
        )}
      </div>

      {/* Selector de Modo de Visualización (si tiene PDF) */}
      {hasPdf && (
        <div
          className="flex px-4 py-2 border-b shrink-0 items-center justify-between"
          style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
        >
          <div
            className="flex p-0.5 rounded-[12px] border w-full"
            style={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
          >
            <button
              onClick={() => setViewMode('reader')}
              className="flex-1 py-1.5 px-3 rounded-[9px] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              style={{
                background: viewMode === 'reader' ? 'hsl(var(--card))' : 'transparent',
                color: viewMode === 'reader' ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                boxShadow: viewMode === 'reader' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <span>📖</span> Lectura Rápida
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className="flex-1 py-1.5 px-3 rounded-[9px] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              style={{
                background: viewMode === 'pdf' ? 'hsl(var(--card))' : 'transparent',
                color: viewMode === 'pdf' ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                boxShadow: viewMode === 'pdf' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <span>📄</span> PDF Original
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        {viewMode === 'reader' ? (
          <div className="px-5 py-6 space-y-4">
            {ContentComponent && <ContentComponent />}

            {/* Banner de PDF anexado */}
            {hasPdf && (
              <div
                className="mt-8 p-4 rounded-[18px] border flex items-center justify-between gap-3 shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--green-pale)))',
                  borderColor: 'hsl(var(--primary) / 0.25)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border"
                    style={{ background: 'hsl(var(--primary))', color: '#fff', borderColor: 'transparent' }}
                  >
                    📄
                  </div>
                  <div>
                    <p className="font-display font-semibold text-xs text-foreground">
                      Documento PDF Original
                    </p>
                    <p className="text-[.7rem]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Descárgalo para guardar o imprimir
                    </p>
                  </div>
                </div>

                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-[10px] text-xs font-bold shrink-0 flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                  style={{ background: 'hsl(var(--primary))', color: '#fff' }}
                >
                  Abrir <ExternalIcon />
                </a>
              </div>
            )}
          </div>
        ) : (
          /* Visualizador de PDF / Ações de PDF */
          <div className="p-5 flex flex-col items-center justify-center min-h-full text-center space-y-4">
            <div
              className="w-16 h-16 rounded-[22px] flex items-center justify-center text-2xl shadow-sm border"
              style={{ background: 'hsl(var(--green-pale))', borderColor: 'hsl(var(--primary) / 0.3)' }}
            >
              📄
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-foreground">
                {item.title}
              </h3>
              <p className="text-xs mt-1 max-w-xs mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Puedes abrir el documento oficial en pantalla completa o descargarlo a tu dispositivo.
              </p>
            </div>

            <div className="w-full max-w-xs space-y-2.5 pt-2">
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-[14px] font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                style={{ background: 'hsl(var(--primary))', color: '#fff' }}
              >
                Abrir PDF en pantalla completa <ExternalIcon />
              </a>

              <a
                href={item.pdf}
                download
                className="w-full py-3 px-4 rounded-[14px] font-semibold text-xs flex items-center justify-center gap-2 border transition-all active:scale-95"
                style={{
                  background: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
              >
                <DownloadIcon /> Descargar archivo PDF
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer — Botão de Concluir */}
      <div
        className="px-4 py-3.5 border-t shrink-0"
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
