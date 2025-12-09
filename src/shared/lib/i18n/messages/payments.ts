import type { LocaleCode } from '@/shared/state/uiAtoms'

export type PaymentMessageKey =
  | 'selectCategory'
  | 'loadError'
  | 'noProviders'
  | 'noSearchResults'
  | 'fallbackTitle'
  | 'favoritesTitle'
  | 'favoritesLoadError'
  | 'noFavorites'
  | 'searchTooShort'
  | 'noSearchResultsWithQuery'
  | 'paymentListTitle'
  | 'searchPlaceholder'

export const paymentProviderMessages: Record<
  LocaleCode,
  Record<PaymentMessageKey, string>
> = {
  en: {
    selectCategory: 'Select a category to see providers',
    loadError: 'Failed to load providers',
    noProviders: 'No providers found',
    noSearchResults: 'No providers matched your search',
    fallbackTitle: 'Provider',
    favoritesTitle: 'Favorites',
    favoritesLoadError: 'Failed to load "{category}"',
    noFavorites:
      'No favorites yet. Make a successful payment to add a provider here.',
    searchTooShort: 'Type at least 2 characters to start searching',
    noSearchResultsWithQuery: 'No providers found for "{query}"',
    paymentListTitle: 'Payment list',
    searchPlaceholder: 'Search',
  },
  ru: {
    selectCategory: 'Выберите категорию, чтобы увидеть провайдеров',
    loadError: 'Не удалось загрузить провайдеров',
    noProviders: 'Провайдеры не найдены',
    noSearchResults: 'По запросу ничего не найдено',
    fallbackTitle: 'Провайдер',
    favoritesTitle: 'Избранное',
    favoritesLoadError: 'Не удалось загрузить "{category}"',
    noFavorites: 'Пока нет избранных. Совершите успешный платеж, чтобы добавить.',
    searchTooShort: 'Введите минимум 2 символа, чтобы начать поиск',
    noSearchResultsWithQuery: 'Провайдеры по запросу "{query}" не найдены',
    paymentListTitle: 'Список платежей',
    searchPlaceholder: 'Поиск',
  },
  uz: {
    selectCategory: "Provayderlarni ko'rish uchun toifani tanlang",
    loadError: "Provayderlarni yuklab bo'lmadi",
    noProviders: 'Provayderlar topilmadi',
    noSearchResults: "Qidiruv bo'yicha mos provayderlar topilmadi",
    fallbackTitle: 'Provayder',
    favoritesTitle: 'Sevimlilar',
    favoritesLoadError: '"{category}" yuklanmadi',
    noFavorites:
      "Hozircha sevimlilar yo'q. Muvaffaqiyatli to'lovdan so'ng bu yerda paydo bo'ladi.",
    searchTooShort: 'Qidirishni boshlash uchun kamida 2 ta belgi kiriting',
    noSearchResultsWithQuery: '"{query}" bo‘yicha provayder topilmadi',
    paymentListTitle: 'To‘lovlar ro‘yxati',
    searchPlaceholder: 'Qidirish',
  },
}

export const paymentFavoritesTitles: Record<LocaleCode, string> = {
  en: paymentProviderMessages.en.favoritesTitle,
  ru: paymentProviderMessages.ru.favoritesTitle,
  uz: paymentProviderMessages.uz.favoritesTitle,
}
