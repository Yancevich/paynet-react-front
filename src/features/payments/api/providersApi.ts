import { catalogApi } from '@/api/client'
import type { ProvidersResponse } from '@/api/data-contracts'

export const getProviders = async (
  categoryId: number
): Promise<ProvidersResponse['providers']> => {
  const { data } = await catalogApi.getProvidersByCategory(categoryId)
  return data.providers
}

export const searchProviders = async (
  query: string
): Promise<ProvidersResponse['providers']> => {
  const { data } = await catalogApi.searchProviders({ query })
  return data.providers
}
