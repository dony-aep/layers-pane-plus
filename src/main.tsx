import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts.css'
import './styles/styles.css'
import { App } from './App'
import { AppProvider } from './context/AppContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { installPointerEventFallback } from './lib/pointerEventFallback'

installPointerEventFallback()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>,
)
