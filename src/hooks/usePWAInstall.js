import { useState, useEffect, useCallback } from 'react'

/**
 * Hook para gerenciar instalação PWA em 3 camadas:
 * 1. Nativo (beforeinstallprompt - Android/Chrome)
 * 2. iPhone/iOS (Safari - Tutorial visual manual)
 * 3. Fallback Popup (Modal com abas Android e iPhone)
 */
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [platform, setPlatform] = useState('other') // 'ios' | 'android' | 'desktop' | 'other'
  const [activeTab, setActiveTab] = useState('ios') // Tab selecionada no modal ('ios' | 'android')

  // Detectar plataforma do usuário
  useEffect(() => {
    if (typeof window === 'undefined') return

    const ua = window.navigator.userAgent.toLowerCase()
    const isIOSDevice =
      /iphone|ipad|ipod/.test(ua) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
    const isAndroidDevice = /android/.test(ua)

    if (isIOSDevice) {
      setPlatform('ios')
      setActiveTab('ios')
    } else if (isAndroidDevice) {
      setPlatform('android')
      setActiveTab('android')
    } else {
      setPlatform('desktop')
      setActiveTab('android')
    }

    // Verificar se já está rodando como standalone (já instalado)
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')

    setIsInstalled(isStandaloneMode)

    // Listener para mudanças no modo de exibição (se instalado durante a sessão)
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleDisplayModeChange = (e) => {
      if (e.matches) {
        setIsInstalled(true)
        setDeferredPrompt(null)
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleDisplayModeChange)
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleDisplayModeChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleDisplayModeChange)
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleDisplayModeChange)
      }
    }
  }, [])

  // Capturar evento nativo `beforeinstallprompt` (Android/Chrome/Edge)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Previne a barra padrão automática do mini-infobar do Chrome
      e.preventDefault()
      // Armazena o evento para ser disparado pelo nosso botão
      setDeferredPrompt(e)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
      setIsModalOpen(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  // Função principal de instalação chamada pelo botão
  const promptInstall = useCallback(async () => {
    // Se o evento nativo estiver disponível (Android / Chromium)
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt()
        const choiceResult = await deferredPrompt.userChoice
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true)
          setDeferredPrompt(null)
          return { success: true, outcome: 'accepted' }
        } else {
          // Se o usuário dispensou o prompt nativo do Chrome
          setDeferredPrompt(null)
          return { success: false, outcome: 'dismissed' }
        }
      } catch (err) {
        console.warn('Erro ao chamar prompt nativo:', err)
        // Se der erro por algum motivo, abre o modal de tutorial
        setIsModalOpen(true)
        return { success: false, error: err }
      }
    }

    // Se NÃO tiver o evento nativo (iPhone/Safari, navegador não suportado ou prompt já consumido):
    // Abre o modal de tutorial com a aba apropriada pré-selecionada
    if (platform === 'ios') {
      setActiveTab('ios')
    } else {
      setActiveTab('android')
    }
    setIsModalOpen(true)
    return { success: true, outcome: 'tutorial_opened' }
  }, [deferredPrompt, platform])

  // Abrir diretamente o tutorial (útil para links de "Como instalar" nas configurações)
  const openTutorial = useCallback((targetTab) => {
    if (targetTab) {
      setActiveTab(targetTab)
    } else if (platform === 'ios') {
      setActiveTab('ios')
    } else {
      setActiveTab('android')
    }
    setIsModalOpen(true)
  }, [platform])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return {
    isNativeAvailable: Boolean(deferredPrompt),
    isInstalled,
    isIOS: platform === 'ios',
    isAndroid: platform === 'android',
    platform,
    isModalOpen,
    activeTab,
    setActiveTab,
    promptInstall,
    openTutorial,
    closeModal,
  }
}
