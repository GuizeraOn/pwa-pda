import { BONOS } from '../data'

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}

export default function Bonos({ setViewer }) {
  return (
    <div className="animate-fade">
      <div className="px-5 pt-6 pb-4">
        <h2 className="font-display font-bold text-[1.5rem] text-foreground">Tus Bonos</h2>
        <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          3 guías de apoyo incluidas con tu programa
        </p>
      </div>

      <div className="px-4 flex flex-col gap-3.5">
        {BONOS.map((bono, i) => (
          <button
            key={bono.id}
            onClick={() => setViewer({ type: 'bonus', id: bono.id })}
            className="w-full flex gap-4 p-5 rounded-[22px] text-left transition-all active:scale-[.97]"
            style={{
              background: `linear-gradient(135deg, ${bono.gradient.replace('from-[', '').replace('] to-[', ', ').replace(']', '')})`,
              color: bono.textColor,
              boxShadow: '0 6px 24px rgba(0,0,0,.14)',
              animationDelay: `${i * .1}s`,
            }}
          >
            {/* Icon */}
            <div
              className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center text-[1.6rem]"
              style={{ background: 'rgba(255,255,255,.18)' }}
            >
              {bono.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold tracking-widest uppercase opacity-75 mb-1">
                {bono.tag}
              </p>
              <p className="font-display font-bold text-[1.05rem] leading-snug text-balance">
                {bono.title}
              </p>
              <p className="text-xs opacity-80 mt-1.5 leading-snug">
                {bono.desc}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold mt-3.5 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,.2)' }}
              >
                Ver guía <ChevronRight />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
