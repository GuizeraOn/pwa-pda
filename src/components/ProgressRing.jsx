import { useEffect, useRef } from 'react'

export default function ProgressRing({ percent, size = 176, strokeWidth = 12 }) {
  const r    = (size / 2) - (strokeWidth / 2) - 2
  const circ = 2 * Math.PI * r
  const circleRef = useRef(null)

  useEffect(() => {
    const el = circleRef.current
    if (!el) return
    const target = circ - (percent / 100) * circ
    el.style.strokeDashoffset = circ
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)'
        el.style.strokeDashoffset = target
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [percent, circ])

  const fontSize = size < 150 ? '1.6rem' : '2.6rem'
  const labelSize = size < 150 ? '.62rem' : '.7rem'

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        <circle
          ref={circleRef}
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display font-bold leading-none text-foreground"
          style={{ fontSize }}
        >
          {percent}%
        </span>
        <span
          className="font-semibold uppercase tracking-[.08em] mt-1"
          style={{ fontSize: labelSize, color: 'hsl(var(--muted-foreground))' }}
        >
          Completado
        </span>
      </div>
    </div>
  )
}
