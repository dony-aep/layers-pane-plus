import { useRef, useCallback, useMemo } from 'react'

/** True when running inside Adobe CEP (After Effects panel). */
function isInsideCEP(): boolean {
  try {
    return typeof window !== 'undefined' && '__adobe_cep__' in window
  } catch {
    return false
  }
}

const CEP_AVAILABLE = isInsideCEP()

/**
 * Wraps the CEP CSInterface. evalScript is promisified.
 * Outside CEP (browser dev) every call is a no-op.
 */
export function useCSInterface() {
  const ref = useRef<CSInterface | null>(null)

  const get = useCallback(() => {
    if (!CEP_AVAILABLE) return null
    if (!ref.current) {
      try {
        ref.current = new CSInterface()
      } catch {
        console.warn('CSInterface not available – running outside CEP')
      }
    }
    return ref.current
  }, [])

  const evalScript = useCallback(
    (script: string): Promise<string> =>
      new Promise((resolve) => {
        const cs = get()
        if (!cs) {
          console.warn('evalScript called outside CEP:', script)
          resolve('')
          return
        }
        cs.evalScript(script, (result: string) => {
          // CEP returns this sentinel when the ExtendScript engine throws. Surface it instead
          // of letting the failure look like "the button did nothing" (#6).
          if (typeof result === 'string' && result.indexOf('EvalScript error') === 0) {
            console.error('[host] evalScript failed:', script, result)
            try {
              window.alert('An error occurred while communicating with After Effects.\nSee the console for details.')
            } catch { /* alert unavailable */ }
            resolve('')
            return
          }
          resolve(result)
        })
      }),
    [get],
  )

  const loadJSX = useCallback(
    (fileName: string) => {
      const cs = get()
      if (!cs) return
      const root = cs.getSystemPath(SystemPath.EXTENSION).replace(/\\/g, '/') + '/jsx/'
      cs.evalScript(`$.evalFile("${root}${fileName}")`)
    },
    [get],
  )

  const openURL = useCallback(
    (url: string) => {
      const cs = get()
      if (cs) cs.openURLInDefaultBrowser(url)
      else window.open(url, '_blank')
    },
    [get],
  )

  const setFlyoutMenu = useCallback(
    (menuXML: string) => {
      get()?.setPanelFlyoutMenu(menuXML)
    },
    [get],
  )

  const addEventListener = useCallback(
    (type: string, listener: (event: CSEvent) => void) => {
      get()?.addEventListener(type, listener)
    },
    [get],
  )

  const removeEventListener = useCallback(
    (type: string, listener: (event: CSEvent) => void) => {
      get()?.removeEventListener(type, listener)
    },
    [get],
  )

  return useMemo(
    () => ({ evalScript, loadJSX, openURL, setFlyoutMenu, addEventListener, removeEventListener }),
    [evalScript, loadJSX, openURL, setFlyoutMenu, addEventListener, removeEventListener],
  )
}
