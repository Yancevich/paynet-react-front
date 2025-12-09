import type { LocaleCode } from '@/shared/state/uiAtoms'

export type TemplateMessageKey =
  | 'title'
  | 'addTemplate'
  | 'loadingError'
  | 'emptyNoOperations'
  | 'addModalHint'
  | 'savedFields'
  | 'noSavedFields'
  | 'fallbackTitle'

const messages: Record<LocaleCode, Record<TemplateMessageKey, string>> = {
  en: {
    title: 'Templates',
    addTemplate: 'Add template',
    loadingError: 'Unable to load templates. Please try again.',
    emptyNoOperations:
      "You don't have any saved templates yet. Make a payment and save the template for future payments.",
    addModalHint: 'Select a successful payment to turn it into a reusable template.',
    savedFields: 'Saved fields:',
    noSavedFields: 'No saved fields for this template.',
    fallbackTitle: 'Template',
  },
  ru: {
    title: 'Шаблоны',
    addTemplate: 'Добавить шаблон',
    loadingError: 'Не удалось загрузить шаблоны. Попробуйте ещё раз.',
    emptyNoOperations:
      'У вас пока нет сохранённых шаблонов. Совершите оплату и сохраните шаблон для будущих платежей.',
    addModalHint: 'Выберите успешный платёж, чтобы превратить его в повторяемый шаблон.',
    savedFields: 'Сохранённые поля:',
    noSavedFields: 'Для этого шаблона нет сохранённых полей.',
    fallbackTitle: 'Шаблон',
  },
  uz: {
    title: 'Shablonlar',
    addTemplate: "Shablon qo'shish",
    loadingError: "Shablonlarni yuklab bo'lmadi. Qayta urinib ko'ring.",
    emptyNoOperations:
      "Hozircha saqlangan shablonlar yo'q. To'lovni amalga oshirib, kelgusi to'lovlar uchun shablonni saqlang.",
    addModalHint: "Muvaffaqiyatli to'lovni tanlab, uni qayta ishlatiladigan shablonga aylantiring.",
    savedFields: 'Saqlangan maydonlar:',
    noSavedFields: "Bu shablon uchun saqlangan maydonlar yo'q.",
    fallbackTitle: 'Shablon',
  },
}

export const getTemplateMessage = (locale: LocaleCode, key: TemplateMessageKey) =>
  messages[locale]?.[key] ?? messages.en[key]

export const getTemplateMessages = (locale: LocaleCode) => messages[locale] ?? messages.en
