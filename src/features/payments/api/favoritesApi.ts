import { userFavoritesApi } from '@/api/client'
import type { FavoritesResponse } from '@/api/data-contracts'

export const getUserFavorites = async (): Promise<FavoritesResponse['favorites']> => {
  const { data } = await userFavoritesApi.getUserFavorites()
  return data.favorites
}
