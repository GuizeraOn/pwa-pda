import { useState, useEffect, useCallback } from 'react'
import Login from './components/Login'
import Shell from './components/Shell'
import Viewer from './components/Viewer'
import InstallModal from './components/InstallModal'
import { usePWAInstall } from './hooks/usePWAInstall'

const STORAGE_KEY = 'protocolo_state'

function loadState(email) {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${email}`)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveState(email, state) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${email}`, JSON.stringify(state))
  } catch {}
}

function buildInitialState() {
  return {
    day: 1,
    days: Array(21).fill(false),
    lessons: [false, false, false, false, false],
    bonuses: [false, false, false],
    absorcionProtocols: [false, false, false],
    absorcionBonuses: [false, false, false],
    symScores: {},
  }
}

export default function App() {
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState('inicio')
  const [viewer, setViewer] = useState(null) // { type: 'lesson'|'bonus', id: number }

  const [day, setDay] = useState(1)
  const [days, setDays] = useState(() => Array(21).fill(false))
  const [lessons, setLessons] = useState([false, false, false, false, false])
  const [bonuses, setBonuses] = useState([false, false, false])
  const [absorcionProtocols, setAbsorcionProtocols] = useState([false, false, false])
  const [absorcionBonuses, setAbsorcionBonuses] = useState([false, false, false])
  const [symScores, setSymScores] = useState({})

  // Device-level preference — not per-user, so stored globally
  const [vibrationEnabled, setVibrationEnabled] = useState(() => {
    try { return localStorage.getItem('protocolo_vibration') !== 'false' } catch { return true }
  })

  // PWA Install management (3-layer logic)
  const pwa = usePWAInstall()

  // Load persisted state when email is set
  const handleLogin = useCallback((inputEmail) => {
    setEmail(inputEmail)
    const saved = loadState(inputEmail)
    if (saved) {
      setDay(saved.day)
      setDays(saved.days)
      setLessons((saved.lessons?.length ?? 0) >= 5 ? saved.lessons : [...(saved.lessons || [false,false,false,false]), false])
      setBonuses(saved.bonuses)
      setAbsorcionProtocols(saved.absorcionProtocols || [false, false, false])
      setAbsorcionBonuses(saved.absorcionBonuses || [false, false, false])
      setSymScores(saved.symScores || {})
    } else {
      // Fresh start — keep demo state
      const initial = buildInitialState()
      setDay(initial.day)
      setDays(initial.days)
      setLessons(initial.lessons)
      setBonuses(initial.bonuses)
      setSymScores({})
    }
    setLoggedIn(true)
  }, [])

  // Persist on every state change after login
  useEffect(() => {
    if (!loggedIn || !email) return
    saveState(email, { day, days, lessons, bonuses, absorcionProtocols, absorcionBonuses, symScores })
  }, [loggedIn, email, day, days, lessons, bonuses, absorcionProtocols, absorcionBonuses, symScores])

  function buzz(pattern) {
    if (vibrationEnabled && navigator.vibrate) navigator.vibrate(pattern)
  }

  const completeToday = useCallback(() => {
    if (days[day - 1]) return
    setDays(prev => { const n = [...prev]; n[day - 1] = true; return n })
    setDay(prev => Math.min(prev + 1, 21))
    buzz([50, 30, 80])
    triggerConfetti()
  }, [day, days, vibrationEnabled])

  const completeLesson = useCallback((id) => {
    setLessons(prev => { const n = [...prev]; n[id] = true; return n })
    setViewer(null)
    buzz(60)
    triggerConfetti()
  }, [vibrationEnabled])

  const completeBonus = useCallback((id) => {
    setBonuses(prev => { const n = [...prev]; n[id] = true; return n })
    setViewer(null)
    buzz(60)
    triggerConfetti()
  }, [vibrationEnabled])

  const completeAbsorcionProtocol = useCallback((id) => {
    setAbsorcionProtocols(prev => { const n = [...prev]; n[id] = true; return n })
    setViewer(null)
    buzz(60)
    triggerConfetti()
  }, [vibrationEnabled])

  const completeAbsorcionBonus = useCallback((id) => {
    setAbsorcionBonuses(prev => { const n = [...prev]; n[id] = true; return n })
    setViewer(null)
    buzz(60)
    triggerConfetti()
  }, [vibrationEnabled])

  const recordSymptom = useCallback((checkDay, score) => {
    setSymScores(prev => ({ ...prev, [checkDay]: score }))
  }, [])

  const toggleVibration = useCallback(() => {
    setVibrationEnabled(prev => {
      const next = !prev
      try { localStorage.setItem('protocolo_vibration', next) } catch {}
      if (next && navigator.vibrate) navigator.vibrate(50)
      return next
    })
  }, [])

  const handleLogout = useCallback(() => {
    setLoggedIn(false)
    setEmail('')
    setTab('inicio')
  }, [])

  const appState = { day, days, lessons, bonuses, absorcionProtocols, absorcionBonuses, symScores, email, vibrationEnabled, pwa }
  const handlers = { completeToday, completeLesson, completeBonus, completeAbsorcionProtocol, completeAbsorcionBonus, recordSymptom, toggleVibration, handleLogout, pwa }

  return (
    <>
      {!loggedIn ? (
        <Login onLogin={handleLogin} pwa={pwa} />
      ) : (
        <Shell
          tab={tab}
          setTab={setTab}
          setViewer={setViewer}
          appState={appState}
          handlers={handlers}
          pwa={pwa}
        />
      )}

      {viewer && (
        <Viewer
          key={`${viewer.type}-${viewer.id}`}
          viewer={viewer}
          appState={appState}
          onComplete={
            viewer.type === 'lesson'              ? completeLesson :
            viewer.type === 'bonus'               ? completeBonus  :
            viewer.type === 'absorcion-protocol'  ? completeAbsorcionProtocol :
                                                    completeAbsorcionBonus
          }
          onClose={() => setViewer(null)}
        />
      )}

      {/* Modal global de instalação com as 3 camadas / abas iOS e Android */}
      <InstallModal
        isOpen={pwa.isModalOpen}
        onClose={pwa.closeModal}
        defaultTab={pwa.activeTab}
        onTriggerNative={pwa.promptInstall}
        isNativeAvailable={pwa.isNativeAvailable}
      />
    </>
  )
}

function triggerConfetti() {
  const colors = ['#567856', '#B87823', '#8FAF8F', '#E8A84F', '#fff', '#D4963A']
  for (let i = 0; i < 22; i++) {
    setTimeout(() => {
      const el = document.createElement('div')
      el.style.cssText = [
        'position:fixed',
        `left:${15 + Math.random() * 70}%`,
        `top:${35 + Math.random() * 25}%`,
        `background:${colors[Math.floor(Math.random() * colors.length)]}`,
        `width:${5 + Math.random() * 7}px`,
        `height:${5 + Math.random() * 7}px`,
        `border-radius:${Math.random() > .5 ? '50%' : '3px'}`,
        'animation:confettiFall .9s ease both',
        `animation-delay:${Math.random() * .25}s`,
        'pointer-events:none',
        'z-index:9999',
      ].join(';')
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 1300)
    }, i * 28)
  }
}
