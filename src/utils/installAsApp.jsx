async function installAsApp(deferredPrompt, setDeferredPrompt) {
  if (deferredPrompt !== null) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }
}

export default installAsApp