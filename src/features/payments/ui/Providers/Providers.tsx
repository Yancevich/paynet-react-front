import { useEffect } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { useMantineColorScheme } from '@mantine/core'
import {
  FAVORITES_CATEGORY_ID,
  providerSearchAtom,
  selectedCategoryIdAtom,
  selectedProviderAtom,
  selectedServiceIdAtom,
  selectedChildServiceIdAtom,
  paymentFieldValuesAtom,
  paymentAmountAtom,
  paymentCoinAtom,
} from '@/features/payments/state/paymentsAtoms'
import { useProviderSearch } from '@/features/payments/hooks/useProviderSearch'
import { useUserFavorites } from '@/features/payments/hooks/useUserFavorites'
import { localeAtom } from '@/shared/state/uiAtoms'
import {
  FavoritesList,
  ProvidersEmptyState,
  ProvidersList,
  ProvidersSkeleton,
} from '@/features/payments/ui/components/Providers'
import ProviderPaymentModal from '@/features/payments/ui/components/Providers/ProviderPaymentModal/ProviderPaymentModal'
import {
  getFavoritesTitle,
  getMessage,
  getMessageWithCategory,
  getNoResultsMessage,
  getTitle,
} from '@/features/payments/ui/components/Providers/localization'

const Providers = () => {
  const categoryId = useAtomValue(selectedCategoryIdAtom)
  const searchQuery = useAtomValue(providerSearchAtom)
  const locale = useAtomValue(localeAtom)
  const [selectedProvider, setSelectedProvider] = useAtom(selectedProviderAtom)
  const { colorScheme } = useMantineColorScheme()
  const isFavoritesSelected = categoryId === FAVORITES_CATEGORY_ID
  const {
    favorites,
    isPending: isFavoritesPending,
    isError: isFavoritesError,
  } = useUserFavorites(isFavoritesSelected)
  const resetService = useResetAtom(selectedServiceIdAtom)
  const resetChildService = useResetAtom(selectedChildServiceIdAtom)
  const resetFieldValues = useResetAtom(paymentFieldValuesAtom)
  const resetAmount = useResetAtom(paymentAmountAtom)
  const resetCoin = useResetAtom(paymentCoinAtom)
  const { providers, isPending, isError, isSearchMode, trimmedQuery } = useProviderSearch({
    categoryId: isFavoritesSelected ? null : categoryId,
    query: searchQuery,
  })
  const normalizedSearch = isSearchMode ? '' : trimmedQuery.toLowerCase()
  const isSearchTooShort = trimmedQuery.length > 0 && trimmedQuery.length < 2

  const resetPaymentState = () => {
    resetService()
    resetChildService()
    resetFieldValues()
    resetAmount()
    resetCoin()
  }

  const handleCloseModal = () => {
    resetPaymentState()
    setSelectedProvider(null)
  }

  useEffect(() => {
    handleCloseModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId])

  if (!categoryId && !isSearchMode) {
    return <ProvidersEmptyState message={getMessage(locale, 'selectCategory')} />
  }

  if (isSearchTooShort) {
    return <ProvidersEmptyState message={getMessage(locale, 'searchTooShort')} />
  }

  if (isFavoritesSelected && !isSearchMode) {
    const favoritesTitle = getFavoritesTitle(locale)
    const filteredFavorites = normalizedSearch
      ? favorites.filter((provider) =>
          getTitle(provider.title, locale).toLowerCase().includes(normalizedSearch)
        )
      : favorites

    if (isFavoritesPending) {
      return <ProvidersSkeleton />
    }

    if (isFavoritesError) {
      return (
        <ProvidersEmptyState
          message={getMessageWithCategory(locale, 'favoritesLoadError', favoritesTitle)}
        />
      )
    }

    if (!filteredFavorites.length) {
      const messageKey = favorites.length
        ? 'noSearchResults'
        : 'noFavorites'
      return <ProvidersEmptyState message={getMessage(locale, messageKey)} />
    }

    return (
      <>
        <FavoritesList
          favorites={filteredFavorites}
          locale={locale}
          colorScheme={colorScheme}
          onProviderClick={(provider) => {
            resetPaymentState()
            setSelectedProvider(provider)
          }}
        />
        <ProviderPaymentModal
          provider={selectedProvider}
          locale={locale}
          onClose={handleCloseModal}
        />
      </>
    )
  }

  if (isPending && !providers.length && !isSearchMode) {
    return <ProvidersSkeleton />
  }

  if (isError) {
    return <ProvidersEmptyState message={getMessage(locale, 'loadError')} />
  }

  if (!providers.length) {
    const message = isSearchMode
      ? getNoResultsMessage(locale, trimmedQuery)
      : getMessage(locale, 'noProviders')
    return <ProvidersEmptyState message={message} />
  }

  return (
    <>
      <ProvidersList
        providers={providers}
        locale={locale}
        colorScheme={colorScheme}
        normalizedSearch={normalizedSearch}
        onProviderClick={(provider) => {
          resetPaymentState()
          setSelectedProvider(provider)
        }}
      />
      <ProviderPaymentModal
        provider={selectedProvider}
        locale={locale}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Providers
