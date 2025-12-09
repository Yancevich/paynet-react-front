import type { ReactNode } from 'react'
import { Provider as JotaiProvider } from 'jotai'

type UiProviderProps = {
  children: ReactNode
}

/**
 * UI-level state provider (atoms like theme/sidebar live here).
 * Keeping it in the app layer makes shell state composable and testable.
 */
export const UiProvider = ({ children }: UiProviderProps) => {
  return <JotaiProvider>{children}</JotaiProvider>
}
