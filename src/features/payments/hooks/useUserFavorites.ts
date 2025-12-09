import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Provider } from '../model/provider'
import type { Favorite } from '../model/favorite'
import { getUserFavorites } from '../api/favoritesApi'
import { mapFavoriteToProvider } from '../model/favoriteMapper'

export const useUserFavorites = (enabled = true) => {
  const {
    data: favoritesRaw = [],
    isPending,
    isError,
  } = useQuery<Favorite[]>({
    queryKey: ['user-favorites'],
    queryFn: getUserFavorites,
    enabled,
  })

  const favorites = useMemo<Provider[]>(
    () => favoritesRaw.map(mapFavoriteToProvider),
    [favoritesRaw]
  )

  return {
    favorites,
    isPending,
    isError,
  }
}
