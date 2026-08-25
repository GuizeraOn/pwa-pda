import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url'

// Configurar o worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

export default function PDFCanvasViewer({ pdfUrl, title }) {
  const containerRef = useRef(null)
  const [numPages, setNumPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [scale, setScale] = useState(1.0)
  const [renderedPages, setRenderedPages] = useState({})
  const pdfDocRef = useRef(null)

  // Carregar documento PDF
  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setError(null)
    setRenderedPages({})
    pdfDocRef.current = null

    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/cmaps/',
      cMapPacked: true,
    })

    loadingTask.promise
      .then((pdfDoc) => {
        if (!isMounted) return
        pdfDocRef.current = pdfDoc
        setNumPages(pdfDoc.numPages)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Erro ao carregar PDF:', err)
        if (!isMounted) return
        setError('No se pudo cargar el visor automático. Puedes abrir el archivo directamente.')
        setLoading(false)
      })

    return () => {
      isMounted = false
      loadingTask.destroy().catch(() => {})
    }
  }, [pdfUrl])

  // Renderizar páginas individuais quando o documento carregar ou a escala mudar
  const renderPage = async (pageNumber, canvasElement) => {
    if (!pdfDocRef.current || !canvasElement) return

    try {
      const page = await pdfDocRef.current.getPage(pageNumber)
      const containerWidth = containerRef.current ? containerRef.current.clientWidth - 32 : 360
      const unscaledViewport = page.getViewport({ scale: 1.0 })
      
      // Ajustar escala para caber na largura do celular
      const fitScale = (containerWidth / unscaledViewport.width) * scale
      const viewport = page.getViewport({ scale: fitScale })

      const pixelRatio = window.devicePixelRatio || 1
      canvasElement.width = Math.floor(viewport.width * pixelRatio)
      canvasElement.height = Math.floor(viewport.height * pixelRatio)
      canvasElement.style.width = `${Math.floor(viewport.width)}px`
      canvasElement.style.height = `${Math.floor(viewport.height)}px`

      const ctx = canvasElement.getContext('2d', { alpha: false })
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      }

      await page.render(renderContext).promise
      setRenderedPages((prev) => ({ ...prev, [pageNumber]: true }))
    } catch (err) {
      console.warn(`Erro ao renderizar página ${pageNumber}:`, err)
    }
  }

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-background overflow-hidden relative">
      {/* Barra de Controles do PDF */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b shrink-0 z-10 shadow-xs"
        style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full border"
            style={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
          >
            {loading ? 'Cargando...' : `${numPages} páginas`}
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setScale((s) => Math.max(0.7, +(s - 0.15).toFixed(2)))}
            className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-bold active:scale-95 transition-all"
            style={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            title="Reducir"
            aria-label="Reducir zoom"
          >
            −
          </button>
          <span className="text-xs font-mono w-10 text-center text-muted-foreground">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2.0, +(s + 0.15).toFixed(2)))}
            className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-bold active:scale-95 transition-all"
            style={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            title="Aumentar"
            aria-label="Aumentar zoom"
          >
            +
          </button>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 w-8 h-8 rounded-lg border flex items-center justify-center transition-all active:scale-95"
            style={{ background: 'hsl(var(--green-pale))', borderColor: 'hsl(var(--primary) / 0.3)', color: 'hsl(var(--primary))' }}
            title="Abrir en pestaña nueva"
            aria-label="Abrir en pestaña nueva"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 12-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Área de Visualização do PDF */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 space-y-4">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-sm font-semibold text-foreground">Cargando documento...</p>
            <p className="text-xs text-muted-foreground">Preparando páginas en alta definición</p>
          </div>
        )}

        {error && (
          <div className="p-6 rounded-[20px] border text-center my-8 space-y-3"
            style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
          >
            <div className="text-3xl">📄</div>
            <p className="text-sm font-semibold text-foreground">{error}</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-5 rounded-[12px] font-bold text-xs shadow-md"
              style={{ background: 'hsl(var(--primary))', color: '#fff' }}
            >
              Abrir PDF directamente ↗
            </a>
          </div>
        )}

        {!loading && !error && numPages > 0 && (
          Array.from({ length: numPages }, (_, index) => {
            const pageNum = index + 1
            return (
              <PDFPageItem
                key={`${pdfUrl}-page-${pageNum}-${scale}`}
                pageNumber={pageNum}
                numPages={numPages}
                renderPage={renderPage}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

function PDFPageItem({ pageNumber, numPages, renderPage }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      renderPage(pageNumber, canvasRef.current)
    }
  }, [pageNumber, renderPage])

  return (
    <div className="flex flex-col items-center">
      {/* Indicador sutil de página */}
      <div className="self-center text-[.65rem] font-bold tracking-wider uppercase text-muted-foreground/70 mb-1.5">
        Pág. {pageNumber} de {numPages}
      </div>

      {/* Folha do PDF */}
      <div
        className="rounded-[12px] overflow-hidden shadow-lg border bg-white flex justify-center"
        style={{ borderColor: 'hsl(var(--border))' }}
      >
        <canvas ref={canvasRef} className="block max-w-full" />
      </div>
    </div>
  )
}
