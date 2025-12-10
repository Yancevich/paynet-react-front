import axios from 'axios'

import { API_BASE_URL } from '@/shared/api/config'
import { getStoredToken, setStoredToken } from '@/shared/lib/tokenStorage'

let tokenPromise: Promise<string | null> | null = null
let attempted = false

export const ensureDevToken = async () => {
  if (!import.meta.env.DEV) return null

  const existing = getStoredToken()
  if (existing) return existing

  if (attempted && !tokenPromise) {
    return null
  }

  if (!tokenPromise) {
    attempted = true
    tokenPromise = axios
      .get(`${API_BASE_URL}/admin/dev/jwt-token`)
      .then(({ data }) => {
        const token = data?.access_token ?? null
        if (token) {
          setStoredToken(token)
        }
        return token
      })
      .catch((error) => {
        console.warn('Failed to auto-fetch dev token', error)
        return null
      })
      .finally(() => {
        tokenPromise = null
      })
  }

  return tokenPromise
}
