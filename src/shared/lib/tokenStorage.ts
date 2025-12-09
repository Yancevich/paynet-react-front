const TOKEN_KEY = 'token'

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY)

export const setStoredToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token)

export const clearStoredToken = () => localStorage.removeItem(TOKEN_KEY)
