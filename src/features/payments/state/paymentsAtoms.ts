import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import type { Provider } from '../model/provider'

export const FAVORITES_CATEGORY_ID = 'favorites' as const
export type CategoryId = number | typeof FAVORITES_CATEGORY_ID

export const selectedCategoryIdAtom = atom<CategoryId | null>(FAVORITES_CATEGORY_ID)

export const providerSearchAtom = atom<string>('')

export const selectedProviderAtom = atom<Provider | null>(null)
export const selectedServiceIdAtom = atomWithReset<number | null>(null)
export const selectedChildServiceIdAtom = atomWithReset<number | null>(null)
export const paymentFieldValuesAtom = atomWithReset<Record<string, string>>({})
export const paymentAmountAtom = atomWithReset<string>('')
export const paymentCoinAtom = atomWithReset<string>('USDT')
