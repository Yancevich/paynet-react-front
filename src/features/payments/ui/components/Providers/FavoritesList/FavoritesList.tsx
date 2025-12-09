import { Grid } from '@mantine/core'
import type { Provider } from '@/features/payments/model/provider'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import ProviderCard from '../ProviderCard/ProviderCard'
import { getMessage } from '../localization'
import './FavoritesList.css'

type FavoritesListProps = {
  favorites: Provider[]
  locale: LocaleCode
  colorScheme: 'light' | 'dark' | 'auto'
  onProviderClick: (provider: Provider) => void
}

const FavoritesList = ({
  favorites,
  locale,
  colorScheme,
  onProviderClick,
}: FavoritesListProps) => (
  <section className="favorites">
    <div className="favorites__header">
      <h3 className="favorites__title">
        {getMessage(locale, 'favoritesTitle')}
      </h3>
      <span className="favorites__pill">{favorites.length}</span>
    </div>

    <Grid
      className="favorites__grid providers"
      gutter={{ base: 8, xs: 12, md: 16 }}
    >
      {favorites.map((provider) => (
        <Grid.Col key={provider.id} span={{ base: 6, sm: 6, md: 4, lg: 3 }}>
          <ProviderCard
            provider={provider}
            locale={locale}
            colorScheme={colorScheme}
            onClick={onProviderClick}
          />
        </Grid.Col>
      ))}
    </Grid>
  </section>
)

export default FavoritesList
