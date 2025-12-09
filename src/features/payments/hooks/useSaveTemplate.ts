import { useMutation } from '@tanstack/react-query'
import type { SaveTemplateRequest, SaveTemplateResponse } from '@/api/data-contracts'
import { userTemplatesApi } from '@/api/client'

export const useSaveTemplate = () => {
  const mutation = useMutation<SaveTemplateResponse, unknown, SaveTemplateRequest>({
    mutationFn: async (payload) => {
      const { data } = await userTemplatesApi.saveTemplate(payload)
      return data
    },
  })

  return mutation
}
