import { catalogApi } from '@/api/client'
import type { CategoryResponseDto } from '@/api/data-contracts'

export const getCategories = async (): Promise<CategoryResponseDto[]> => {
  const { data } = await catalogApi.getCategories()
  return data.categories
}
