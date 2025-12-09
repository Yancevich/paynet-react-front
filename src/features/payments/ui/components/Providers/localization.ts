import type { Provider } from '@/features/payments/model/provider'
import {
  paymentFavoritesTitles,
  paymentProviderMessages,
  type PaymentMessageKey,
} from '@/shared/lib/i18n/messages/payments'
import type { LocaleCode } from '@/shared/state/uiAtoms'

export type MessageKey = PaymentMessageKey

export const getMessage = (locale: LocaleCode, key: PaymentMessageKey) =>
  paymentProviderMessages[locale]?.[key] ?? paymentProviderMessages.en[key]

export const getTitle = (title: Provider['title'], locale: string) =>
  title[locale as keyof typeof title] || title.ru || title.en || title.uz || ''

export const getNoResultsMessage = (locale: LocaleCode, query?: string) => {
  if (query) {
    const template =
      paymentProviderMessages[locale]?.noSearchResultsWithQuery ??
      paymentProviderMessages.en.noSearchResultsWithQuery
    return template.replace('{query}', query)
  }
  return getMessage(locale, 'noSearchResults')
}

export const getFavoritesTitle = (locale: LocaleCode) =>
  paymentFavoritesTitles[locale] ?? paymentFavoritesTitles.en

export const getMessageWithCategory = (
  locale: LocaleCode,
  key: PaymentMessageKey,
  category: string
) => {
  const template = getMessage(locale, key)
  return template.replace('{category}', category)
}
