import { userTemplatesApi } from '@/api/client'
import type { TemplatesResponse } from '@/api/data-contracts'
import type { Template } from '../model/template'

export type { Template }

export const getUserTemplates = async (): Promise<Template[]> => {
  const { data } = await userTemplatesApi.getUserTemplates()
  const templates = (data as TemplatesResponse).providers ?? []

  return templates as Template[]
}
