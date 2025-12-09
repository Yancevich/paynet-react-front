import type { CategoryResponseDto } from '@/features/payments/model/category'
import type { LocaleCode } from '@/shared/state/uiAtoms'

export type CategoryMessageKey = 'loadError' | 'fallbackTitle' | 'emptyList'

const messages = {
  en: {
    loadError: 'Failed to load categories',
    fallbackTitle: 'Category',
    emptyList: 'No categories available',
  },
  ru: {
    loadError: 'Не удалось загрузить категории',
    fallbackTitle: 'Категория',
    emptyList: 'Нет доступных категорий',
  },
  uz: {
    loadError: "Toifalarni yuklab bo'lmadi",
    fallbackTitle: 'Kategoriya',
    emptyList: "Kategoriyalar mavjud emas",
  },
} satisfies Record<LocaleCode, Record<CategoryMessageKey, string>>

export const getCategoryMessage = (locale: LocaleCode, key: CategoryMessageKey) =>
  messages[locale]?.[key] ?? messages.en[key]

export const getCategoryTitle = (
  title: CategoryResponseDto['title'],
  locale: string
) => title[locale as keyof typeof title] || title.ru || title.en || title.uz || ''
