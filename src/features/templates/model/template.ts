import type { ProviderImagesDto, TemplateItemDto } from '@/api/data-contracts'

export type Template = TemplateItemDto & {
  order?: number
  images?: ProviderImagesDto
}

export type TemplateCard = {
  id: string
  label: string
  imageSrc: string
  template: Template
}
