import { useMutation } from '@tanstack/react-query'
import { setStoredToken } from '@/shared/lib/tokenStorage'
import { getDevToken } from './getDevToken'

export const useDevToken = () =>
  useMutation({
    mutationFn: getDevToken,
    onSuccess: (data) => {
      if (data?.access_token) {
        setStoredToken(data.access_token)
      }
    },
  })
