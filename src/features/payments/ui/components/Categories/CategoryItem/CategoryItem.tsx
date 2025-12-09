import type { ReactNode } from 'react'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import type { CategoryListItem } from '../types'
import { getCategoryMessage, getCategoryTitle } from '../localization'
import './CategoryItem.css'

type CategoryItemProps = {
  category: CategoryListItem
  isActive: boolean
  onSelect: (categoryId: CategoryListItem['id']) => void
  isDarkMode: boolean
  locale: LocaleCode
  icon?: ReactNode
}

const CategoryItem = ({
  category,
  isActive,
  onSelect,
  isDarkMode,
  locale,
  icon,
}: CategoryItemProps) => {
  const imgUrl = isDarkMode
    ? category.images?.customDark ?? category.images?.customLight ?? ''
    : category.images?.customLight ?? category.images?.customDark ?? ''
  const localizedTitle =
    getCategoryTitle(category.title, locale) ||
    getCategoryMessage(locale, 'fallbackTitle')

  const renderIcon = (
    <span className="category__img category__img--icon" aria-hidden="true">
      {icon}
    </span>
  )

  return (
    <li
      className={`categories__category category ${
        isActive ? 'category--active' : ''
      }`}
      onClick={() => onSelect(category.id)}
    >
      {icon || !imgUrl ? (
        renderIcon
      ) : (
        <img src={imgUrl} alt={localizedTitle} className="category__img" />
      )}
      <h3 className="category__title">{localizedTitle}</h3>
    </li>
  )
}

export default CategoryItem
