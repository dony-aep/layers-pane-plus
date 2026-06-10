import { createContext, useContext, type ReactNode } from 'react'
import { useCSInterface } from '../hooks/useCSInterface'

interface AppContextValue {
  version: string
  evalScript: (script: string) => Promise<string>
  openURL: (url: string) => void
  setFlyoutMenu: (menuXML: string) => void
  addEventListener: (type: string, listener: (event: CSEvent) => void) => void
  removeEventListener: (type: string, listener: (event: CSEvent) => void) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  // scripts.jsx is loaded by the manifest <ScriptPath>; no manual cep.loadJSX needed here (#7).
  const cep = useCSInterface()

  const value: AppContextValue = {
    version: __APP_VERSION__,
    evalScript: cep.evalScript,
    openURL: cep.openURL,
    setFlyoutMenu: cep.setFlyoutMenu,
    addEventListener: cep.addEventListener,
    removeEventListener: cep.removeEventListener,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
