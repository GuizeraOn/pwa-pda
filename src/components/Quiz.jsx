import { useState, useEffect } from 'react'
import { RECIPE_ITEMS } from '../data'

const QUESTIONS = [
  {
    label: '1 de 4',
    question: '¿Cuál describe mejor tu situación?',
    options: [
      'Fumo actualmente y quiero limpiar mis pulmones',
      'Dejé de fumar pero sigo con molestias',
      'Nunca fumé pero tengo problemas respiratorios',
      'Convivo con un fumador y quiero protegerme',
    ],
  },
  {
    label: '2 de 4',
    question: '¿Qué te molesta más en este momento?',
    options: [
      'Tos y moco constante',
      'Falta de aire al subir escaleras',
      'Pecho pesado al despertar',
      'Cansancio sin razón aparente',
    ],
  },
  {
    label: '3 de 4',
    question: '¿A qué hora sueles despertarte?',
    options: [
      'Antes de las 7 AM',
      'Entre 7 y 8 AM',
      'Entre 8 y 9 AM',
      'Después de las 9 AM',
    ],
  },
  {
    label: '4 de 4',
    question: '¿Cómo está tu digestión habitualmente?',
    options: [
      'Bien, sin molestias',
      'A veces pesada o lenta',
      'Hinchazón frecuente',
      'Muy irregular',
    ],
  },
]

const PROFILE_LABELS = [
  'Fumadora activa',
  'Ex fumadora con secuelas',
  'Sin tabaco, con problemas',
  'Expuesta al humo',
]

const SYMPTOM_LABELS = [
  'con tos y moco',
  'con falta de aire',
  'con pecho pesado',
  'con cansancio',
]

const TIMES = ['6:30 AM', '7:30 AM', '8:30 AM', '9:30 AM']

const INSIGHTS = [
  'El jengibre potencia la disolución del pegamento en pulmones con moco activo.',
  'El vinagre acelera la regeneración del epitelio bronquial dañado por el tabaco.',
  'El limón alcaliniza el ambiente bronquial reduciendo la inflamación crónica.',
  'La combinación jengibre+limón neutraliza los oxidantes del humo de segunda mano.',
]

// ── Calculating screen ────────────────────────────────────────────────────────

function CalculatingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [checks, setChecks] = useState([false, false, false])

  useEffect(() => {
    const DURATION = 3800
    const start = Date.now()
    let rafId

    function tick() {
      const elapsed = Date.now() - start
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100))
      setProgress(pct)
      if (pct < 100) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const t1 = setTimeout(() => setChecks(c => [true, c[1], c[2]]), 900)
    const t2 = setTimeout(() => setChecks(c => [c[0], true, c[2]]), 2000)
    const t3 = setTimeout(() => setChecks(c => [c[0], c[1], true]), 3200)
    const t4 = setTimeout(onDone, 3800)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
    }
  }, [onDone])

  const items = [
    { text: 'Analizando tu perfil respiratorio', done: checks[0], active: !checks[0] },
    { text: 'Ajustando proporciones para tu caso', done: checks[1], active: checks[0] && !checks[1] },
    { text: 'Calculando tu horario óptimo...', done: checks[2], active: checks[1] && !checks[2] },
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '2.5rem' }}>🧪</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 700, color: 'hsl(var(--foreground))', marginTop: '0.75rem', lineHeight: 1.25 }}>
          Preparando tu protocolo<br />personal...
        </h2>
      </div>

      <div style={{ width: '100%' }}>
        <div style={{ height: '8px', background: 'hsl(var(--border))', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
          <div style={{ height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg, hsl(128 30% 42%), hsl(128 22% 50%))', width: `${progress}%`, transition: 'width 0.12s linear' }} />
        </div>
        <p style={{ textAlign: 'right', fontSize: '0.78rem', fontWeight: 700, color: 'hsl(var(--primary))' }}>{progress}%</p>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {items.map(({ text, done, active }) => (
          <div
            key={text}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: 'hsl(var(--card))',
              borderRadius: '12px',
              border: `1px solid ${done ? 'hsl(var(--primary) / .3)' : 'hsl(var(--border))'}`,
              transition: 'border-color 0.3s',
            }}
          >
            <div style={{
              width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: done ? 'hsl(var(--primary))' : active ? 'hsl(var(--primary) / .12)' : 'hsl(var(--border))',
              transition: 'background 0.3s',
            }}>
              {done && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              )}
              {active && !done && (
                <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(128, 30%, 42%)" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: '0.88rem', color: done ? 'hsl(var(--foreground))' : active ? 'hsl(var(--foreground) / .75)' : 'hsl(var(--muted-foreground))', transition: 'color 0.3s' }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Result screen ─────────────────────────────────────────────────────────────

function ResultScreen({ answers, name, onComplete }) {
  const q0 = answers[0] ?? 0
  const q1 = answers[1] ?? 0
  const q2 = answers[2] ?? 1

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '2rem' }}>✅</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: 'hsl(var(--foreground))', marginTop: '0.5rem', lineHeight: 1.25 }}>
          Tu protocolo está listo, {name}
        </h2>
      </div>

      {/* Profile */}
      <div style={{ background: 'hsl(var(--green-pale))', borderRadius: '14px', padding: '0.9rem 1rem', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(var(--primary))', marginBottom: '0.5rem' }}>
          Según tu perfil:
        </p>
        <p style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground))', marginBottom: '0.3rem' }}>
          → {PROFILE_LABELS[q0]} {SYMPTOM_LABELS[q1]}
        </p>
        <p style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground))' }}>
          → Mejor horario: {TIMES[q2]} (antes del café)
        </p>
      </div>

      {/* Recipe */}
      <div style={{ background: 'hsl(var(--card))', border: '1.5px solid hsl(var(--primary) / .2)', borderRadius: '18px', overflow: 'hidden', marginBottom: '1rem' }}>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, hsl(128 30% 42%), hsl(36 66% 52%))' }} />
        <div style={{ padding: '0.9rem 1rem' }}>
          <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'hsl(var(--primary))', marginBottom: '0.75rem' }}>
            🫙 Tu Receta Ajustada
          </p>
          {RECIPE_ITEMS.map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '1.05rem' }}>{icon}</span>
              <span style={{ fontSize: '0.88rem', color: 'hsl(var(--foreground))' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Personalized insight */}
      <div style={{ background: 'hsl(var(--accent-pale))', borderRadius: '14px', padding: '0.9rem 1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.05rem' }}>💡</span>
        <div>
          <p style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(var(--accent))', marginBottom: '0.35rem' }}>
            Para tu caso específico:
          </p>
          <p style={{ fontSize: '0.88rem', color: 'hsl(var(--foreground))', lineHeight: 1.5 }}>
            {INSIGHTS[q0]}
          </p>
        </div>
      </div>

      <button
        onClick={onComplete}
        className="w-full transition-all active:scale-[.97]"
        style={{ padding: '18px 24px', borderRadius: '16px', background: 'hsl(128 28% 36%)', color: '#fff', border: 'none', fontSize: '1rem', fontWeight: 600, letterSpacing: '.02em', cursor: 'pointer', boxShadow: '0 4px 20px hsl(128 28% 36% / .35)' }}
      >
        Empezar mi protocolo ahora →
      </button>
    </div>
  )
}

// ── Main Quiz component ───────────────────────────────────────────────────────

export default function Quiz({ name, onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([null, null, null, null])
  const [selected, setSelected] = useState(null)

  const isQuestion = step <= 3
  const currentQ = QUESTIONS[Math.min(step, 3)]

  function selectOption(idx) {
    setSelected(idx)
    setTimeout(() => {
      const next = [...answers]
      next[step] = idx
      setAnswers(next)
      setSelected(null)
      setStep(s => s + 1)
    }, 260)
  }

  return (
    <div
      className="fixed inset-0 z-[400] flex flex-col"
      style={{ background: 'hsl(var(--background))', maxWidth: '430px', margin: '0 auto' }}
    >
      {/* Accent bar */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, hsl(128 30% 42%), hsl(128 22% 50%), hsl(36 66% 52%))', flexShrink: 0 }} />

      {/* Question header */}
      {isQuestion && (
        <div style={{ padding: '1.25rem 1.5rem 0.5rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '1.1rem' }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ height: '4px', flex: 1, borderRadius: '2px', background: i <= step ? 'hsl(var(--primary))' : 'hsl(var(--border))', transition: 'background 0.25s' }} />
            ))}
          </div>
          <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'hsl(var(--primary))', marginBottom: '0.45rem' }}>
            {currentQ.label}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: 'hsl(var(--foreground))', lineHeight: 1.3 }}>
            {currentQ.question}
          </h2>
        </div>
      )}

      {/* Options */}
      {isQuestion && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {currentQ.options.map((opt, i) => {
            const active = selected === i
            return (
              <button
                key={i}
                onClick={() => selectOption(i)}
                style={{
                  width: '100%',
                  padding: '0.95rem 1rem',
                  borderRadius: '14px',
                  textAlign: 'left',
                  fontSize: '0.92rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#fff' : 'hsl(var(--foreground))',
                  background: active ? 'hsl(128 28% 36%)' : 'hsl(var(--card))',
                  border: `1.5px solid ${active ? 'hsl(128 28% 36%)' : 'hsl(var(--border))'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  boxShadow: active ? '0 4px 14px hsl(128 28% 36% / .28)' : 'none',
                }}
              >
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.72rem', fontWeight: 700,
                  background: active ? 'rgba(255,255,255,.22)' : 'hsl(var(--green-pale))',
                  color: active ? '#fff' : 'hsl(var(--primary))',
                  transition: 'all 0.15s',
                }}>
                  {['A','B','C','D'][i]}
                </span>
                {opt}
              </button>
            )
          })}
        </div>
      )}

      {step === 4 && <CalculatingScreen onDone={() => setStep(5)} />}
      {step === 5 && <ResultScreen answers={answers} name={name} onComplete={onComplete} />}
    </div>
  )
}
