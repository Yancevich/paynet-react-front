import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'

/**
 * Centralized router provider that applies the application basename.
 * Keeps routing concerns out of App.tsx and closer to the app layer.
 */
type AppRouterProviderProps = {
  children: ReactNode
}

export const AppRouterProvider = ({ children }: AppRouterProviderProps) => {
  const basename = import.meta.env.BASE_URL || '/'

  return <BrowserRouter basename={basename}>{children}</BrowserRouter>
}
