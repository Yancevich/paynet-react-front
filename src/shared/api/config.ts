import type { ApiConfig } from '@/api/http-client'

// In dev we can rely on Vite proxy (`/api`). In prod (e.g. Vercel) there is no proxy,
// so fall back to the public backend if VITE_API_URL is not provided.
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? '/api' : 'http://5.187.0.116:8080')

/**
 * Utility helper to create a typed ApiConfig with a token provider.
 */
export const createApiConfig = (
  tokenProvider?: () => string | null | Promise<string | null>,
  overrides: Partial<ApiConfig> = {}
): ApiConfig => {
  const securityWorker: ApiConfig['securityWorker'] = async () => {
    const token = tokenProvider ? await tokenProvider() : null
    return token
      ? {
          headers: { Authorization: `Bearer ${token}` },
        }
      : undefined
  }

  return {
    baseURL: API_BASE_URL,
    secure: true,
    securityWorker,
    ...overrides,
  }
}
