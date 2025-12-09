import { useEffect, useMemo, type FC } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import { useMantineColorScheme } from '@mantine/core'
import { getCategories } from '@/features/payments/api/categoriesApi'
import type { CategoryResponseDto } from '@/api/data-contracts'
import {
  FAVORITES_CATEGORY_ID,
  selectedCategoryIdAtom,
} from '@/features/payments/state/paymentsAtoms'
import { mapCategoryDto } from '@/features/payments/model/categoryMapper'
import { localeAtom } from '@/shared/state/uiAtoms'
import {
  CategoriesList,
  CategoriesSkeleton,
} from '@/features/payments/ui/components/Categories'
import { getCategoryMessage } from '@/features/payments/ui/components/Categories/localization'
import type { CategoryListItem } from '@/features/payments/ui/components/Categories/types'
import FavoritesIcon from '@/assets/favorites.svg?react'

const Categories: FC = () => {
  const {
    data: categories = [],
    isPending,
    isError,
  } = useQuery<CategoryResponseDto[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const [activeId, setActiveId] = useAtom(selectedCategoryIdAtom)
  const { colorScheme } = useMantineColorScheme()
  const locale = useAtomValue(localeAtom)
  const isDarkMode = colorScheme === 'dark'

  const categoriesWithFavorites: CategoryListItem[] = useMemo(() => {
    const normalized = categories.map(mapCategoryDto)
    const sorted = normalized.sort((a, b) => {
      if (a.order === b.order) {
        return 0
      }
      return a.order < b.order ? -1 : 1
    })

    const favoritesCategory: CategoryListItem = {
      id: FAVORITES_CATEGORY_ID,
      title: {
        en: 'Favorites',
        ru: 'Избранное',
        uz: 'Sevimlilar',
      },
      order: 0,
      images: {
        customLight: null,
        customDark: null,
      },
      isFavorites: true,
      icon: <FavoritesIcon aria-hidden="true" />,
    }

    return [favoritesCategory, ...sorted]
  }, [categories])

  useEffect(() => {
    if (!activeId && categoriesWithFavorites.length) {
      setActiveId(categoriesWithFavorites[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesWithFavorites])

  if (isPending) {
    return <CategoriesSkeleton />
  }

  if (isError) {
    return (
      <div className="categories">
        {getCategoryMessage(locale, 'loadError')}
      </div>
    )
  }

  if (categoriesWithFavorites.length === 0) {
    return (
      <div className="categories">
        {getCategoryMessage(locale, 'emptyList')}
      </div>
    )
  }

  return (
    <CategoriesList
      categories={categoriesWithFavorites}
      activeId={activeId}
      onSelect={setActiveId}
      isDarkMode={isDarkMode}
      locale={locale}
    />
  )
}

export default Categories
