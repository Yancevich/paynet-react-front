import type { Favorite } from './favorite'
import type { Provider } from './provider'
import { mapProviderDto } from './providerMapper'

export const mapFavoriteToProvider = (
  favorite: Favorite,
  index: number
): Provider => {
  const { score: _score, ...providerLike } = favorite

  return mapProviderDto({
    ...providerLike,
    order: index + 1,
  })
}
