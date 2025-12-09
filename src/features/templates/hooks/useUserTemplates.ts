import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { getUserTemplates } from '../api/templatesApi'
import type { Template } from '../model/template'

export const useUserTemplates = () =>
  useQuery<Template[]>({
    queryKey: ['user-templates'],
    queryFn: async () => {
      try {
        return await getUserTemplates()
      } catch (error) {
        const status = (error as AxiosError)?.response?.status
        if (status === 401 || status === 403) {
          return []
        }
        return []
      }
    },
  })
