import { Suspense } from 'react'
import './App.css'
import './reset.css'
import { RootRouter } from '@/app/router/RootRouter'
import { AppErrorBoundary } from '@/app/providers/error-boundary'
import { AppRouterProvider } from '@/app/providers/router'
import { UiProvider } from '@/app/providers/ui'

function App() {
  return (
    <UiProvider>
      <AppRouterProvider>
        <AppErrorBoundary>
          <Suspense fallback={<div className="app__fallback">Loading...</div>}>
            <RootRouter />
          </Suspense>
        </AppErrorBoundary>
      </AppRouterProvider>
    </UiProvider>
  )
}

export default App
