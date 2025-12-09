import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './theme/styles/global-styles.css'
import { theme } from './theme/theme.tsx'
import App from '@/App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript />
      <MantineProvider
        theme={theme}
        defaultColorScheme="dark"
        withCssVariables
        withGlobalClasses
      >
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
)
