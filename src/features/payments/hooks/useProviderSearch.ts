import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Provider } from '../model/provider'
import { getProviders, searchProviders } from '../api/providersApi'
import { mapProviderDto } from '../model/providerMapper'

type UseProviderSearchParams = {
  categoryId: number | null
  query: string
}

export const useProviderSearch = ({
  categoryId,
  query,
}: UseProviderSearchParams) => {
  const trimmedQuery = query.trim()
  const isSearchMode = trimmedQuery.length >= 2

  const {
    data: providers = [],
    isPending,
    isError,
  } = useQuery<Provider[]>({
    queryKey: [
      'providers',
      isSearchMode ? 'search' : 'category',
      isSearchMode ? trimmedQuery : categoryId,
    ],
    queryFn: async () => {
      if (isSearchMode) return searchProviders(trimmedQuery)
      if (!categoryId) return []
      return getProviders(categoryId)
    },
    enabled: isSearchMode || Boolean(categoryId),
    // keep previous list while typing search to avoid skeleton flicker
    placeholderData: isSearchMode ? (previousData) => previousData : undefined,
  })

  const sortedProviders = useMemo(() => {
    const normalized = providers.map(mapProviderDto)
    return normalized.sort((a, b) => {
      if (a.order === b.order) return 0
      return a.order < b.order ? -1 : 1
    })
  }, [providers])

  return {
    providers: sortedProviders,
    isPending,
    isError,
    isSearchMode,
    trimmedQuery,
  }
}
