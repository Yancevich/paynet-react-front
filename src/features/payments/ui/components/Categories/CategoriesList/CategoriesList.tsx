import type { LocaleCode } from '@/shared/state/uiAtoms'
import type { CategoryListItem } from '../types'
import CategoryItem from '../CategoryItem/CategoryItem'
import './CategoriesList.css'

type CategoriesListProps = {
  categories: CategoryListItem[]
  activeId: CategoryListItem['id'] | null
  onSelect: (categoryId: CategoryListItem['id']) => void
  isDarkMode: boolean
  locale: LocaleCode
}

const CategoriesList = ({
  categories,
  activeId,
  onSelect,
  isDarkMode,
  locale,
}: CategoriesListProps) => (
  <ul className="categories">
    {categories.map((category) => (
      <CategoryItem
        key={category.id}
        category={category}
        isActive={activeId === category.id}
        onSelect={onSelect}
        isDarkMode={isDarkMode}
        locale={locale}
        icon={category.isFavorites ? category.icon : undefined}
      />
    ))}
  </ul>
)

export default CategoriesList
