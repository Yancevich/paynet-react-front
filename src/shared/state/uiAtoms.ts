import { atom } from 'jotai'

export type ThemeMode = 'dark' | 'light'
export type LocaleCode = 'ru' | 'uz' | 'en'

export const themeAtom = atom<ThemeMode>('dark')
export const localeAtom = atom<LocaleCode>('ru')
export const sidebarCollapsedAtom = atom<boolean>(false)
