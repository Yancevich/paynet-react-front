import { Grid } from '@mantine/core'
import type { Provider } from '@/features/payments/model/provider'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import ProviderCard from '../ProviderCard/ProviderCard'
import ProvidersEmptyState from '../ProvidersEmptyState/ProvidersEmptyState'
import { getMessage, getTitle } from '../localization'
import './ProvidersList.css'

type ProvidersListProps = {
  providers: Provider[]
  locale: LocaleCode
  colorScheme: 'light' | 'dark' | 'auto'
  normalizedSearch: string
  onProviderClick: (provider: Provider) => void
}

const ProvidersList = ({
  providers,
  locale,
  colorScheme,
  normalizedSearch,
  onProviderClick,
}: ProvidersListProps) => {
  const filteredProviders = normalizedSearch
    ? providers.filter((provider) => {
        const name = getTitle(provider.title, locale)
        return name.toLowerCase().includes(normalizedSearch)
      })
    : providers

  if (!filteredProviders.length) {
    return (
      <ProvidersEmptyState message={getMessage(locale, 'noSearchResults')} />
    )
  }

  return (
    <Grid className="providers" gutter={{ base: 8, xs: 12, md: 16 }}>
      {filteredProviders.map((provider) => (
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
  )
}

export default ProvidersList
