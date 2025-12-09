import type { ApiConfig } from '@/api/http-client'

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

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
