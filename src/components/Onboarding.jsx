import { useState } from 'react'
import { RECIPE_ITEMS } from '../data'

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const isLast = step === 2

  const goNext = () => isLast ? onComplete() : setStep(s => s + 1)
  const goBack = () => setStep(s => s - 1)

  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col"
      style={{ background: 'hsl(var(--background))', maxWidth: '430px', margin: '0 auto' }}
    >
      {/* Top accent bar */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, hsl(128 30% 42%), hsl(128 22% 50%), hsl(36 66% 52%))', flexShrink: 0 }} />

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-5 pb-3 flex-shrink-0">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: i === step ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i <= step ? 'hsl(var(--primary))' : 'hsl(var(--border))',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Carousel */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            width: '300%',
            height: '100%',
            transform: `translateX(-${step * 33.333}%)`,
            transition: 'transform 0.38s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {/* Slide 0: Recipe */}
          <div style={{ width: '33.333%', flexShrink: 0, padding: '0.5rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '2.2rem' }}>🎉</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.35rem, 5vw, 1.7rem)', fontWeight: 700, lineHeight: 1.15, marginTop: '0.4rem', color: 'hsl(var(--foreground))' }}>
                ¡Tu programa<br />está listo!
              </h2>
              <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.88rem', marginTop: '0.35rem' }}>
                Esto es exactamente lo que compraste:
              </p>
            </div>
            <div style={{ background: 'hsl(var(--card))', border: '1.5px solid hsl(var(--primary) / .25)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ height: '4px', background: 'linear-gradient(90deg, hsl(128 30% 42%), hsl(36 66% 52%))' }} />
              <div style={{ padding: '1rem 1.25rem' }}>
                <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'hsl(var(--primary))', marginBottom: '0.85rem' }}>
                  🫙 Tu Receta del Vinagre
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {RECIPE_ITEMS.map(({ icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{icon}</span>
                      <span style={{ fontSize: '0.88rem', color: 'hsl(var(--foreground))' }}>{text}</span>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '0.9rem', paddingTop: '0.8rem', borderTop: '1px solid hsl(var(--border))', fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>
                  Mezcla en un vaso. Toma en ayunas cada mañana.
                </p>
              </div>
            </div>
          </div>

          {/* Slide 1: Preparation */}
          <div style={{ width: '33.333%', flexShrink: 0, padding: '0.5rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '2.2rem' }}>🥤</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.35rem, 5vw, 1.7rem)', fontWeight: 700, lineHeight: 1.15, marginTop: '0.4rem', color: 'hsl(var(--foreground))' }}>
                Cómo preparar<br />tu mezcla
              </h2>
              <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.88rem', marginTop: '0.35rem' }}>
                Tres pasos, menos de 2 minutos
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { num: '1', text: 'Vierte los 4 ingredientes en un vaso con 200 ml de agua tibia' },
                { num: '2', text: 'Agita bien con una cuchara hasta integrar todo' },
                { num: '3', text: 'Toma despacio, sin apresurarte — los beneficios empiezan ahí' },
              ].map(({ num, text }) => (
                <div key={num} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', padding: '0.85rem 1rem', background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '14px' }}>
                  <span style={{ width: '1.7rem', height: '1.7rem', borderRadius: '50%', background: 'hsl(var(--green-pale))', color: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, flexShrink: 0 }}>{num}</span>
                  <span style={{ fontSize: '0.88rem', color: 'hsl(var(--foreground))', lineHeight: 1.45, paddingTop: '0.1rem' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slide 2: Timing */}
          <div style={{ width: '33.333%', flexShrink: 0, padding: '0.5rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '2.2rem' }}>⏰</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.35rem, 5vw, 1.7rem)', fontWeight: 700, lineHeight: 1.15, marginTop: '0.4rem', color: 'hsl(var(--foreground))' }}>
                ¿Cuándo tomar<br />tu mezcla?
              </h2>
              <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.88rem', marginTop: '0.35rem' }}>
                El momento clave para mejores resultados
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { icon: '☀️', title: 'En ayunas, cada mañana', desc: 'Antes de cualquier alimento o bebida' },
                { icon: '⏳', title: 'Espera 30 minutos', desc: 'Antes de tomar café, té o desayuno' },
                { icon: '📅', title: '21 días seguidos', desc: 'La constancia es lo que genera el cambio' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem 1rem', background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '14px' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'hsl(var(--foreground))', lineHeight: 1.3 }}>{title}</p>
                    <p style={{ fontSize: '0.77rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.12rem' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ padding: '0.75rem 1.5rem 2rem', flexShrink: 0 }}>
        <button
          onClick={goNext}
          className="w-full transition-all active:scale-[.97]"
          style={{ padding: '18px 24px', borderRadius: '16px', background: 'hsl(128 28% 36%)', color: '#fff', border: 'none', fontSize: '1rem', fontWeight: 600, letterSpacing: '.02em', cursor: 'pointer', boxShadow: '0 4px 20px hsl(128 28% 36% / .35)' }}
        >
          {isLast ? 'Entrar al programa →' : 'Siguiente →'}
        </button>
        {step > 0 && (
          <button
            onClick={goBack}
            style={{ width: '100%', padding: '10px', marginTop: '6px', background: 'none', border: 'none', color: 'hsl(var(--muted-foreground))', fontSize: '0.88rem', cursor: 'pointer' }}
          >
            ← Atrás
          </button>
        )}
      </div>
    </div>
  )
}
