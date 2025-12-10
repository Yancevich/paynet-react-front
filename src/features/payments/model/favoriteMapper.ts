import type { Favorite } from './favorite'
import type { Provider } from './provider'
import { mapProviderDto } from './providerMapper'

export const mapFavoriteToProvider = (
  favorite: Favorite,
  index: number
): Provider => {
  const { score, ...providerLike } = favorite
  void score

  return mapProviderDto({
    ...providerLike,
    order: index + 1,
  })
}
