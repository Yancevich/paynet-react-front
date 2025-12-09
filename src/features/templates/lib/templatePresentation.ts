import templatePlaceholder from '@/assets/template-img.png'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import { getTemplateMessage } from '../localization'
import type { Template, TemplateCard } from '../model/template'

export const resolveTemplateTitle = (
  template: Template | null,
  locale: LocaleCode,
): string => {
  if (!template?.title) return getTemplateMessage(locale, 'fallbackTitle')

  const { title } = template

  return (
    (title[locale as keyof typeof title] as string) ||
    title.en ||
    title.ru ||
    title.uz ||
    getTemplateMessage(locale, 'fallbackTitle')
  )
}

export const resolveTemplateImage = (template: Template): string => {
  const { images } = template

  if (!images) return templatePlaceholder

  return images.vendorImageUrl ?? images.customLight ?? images.customDark ?? templatePlaceholder
}

export const mapTemplatesToCards = (
  templates: Template[],
  locale: LocaleCode,
): TemplateCard[] =>
  templates.map((template, index) => ({
    id: `${template.id}-${template.order ?? index}`,
    label: resolveTemplateTitle(template, locale),
    imageSrc: resolveTemplateImage(template),
    template,
  }))
