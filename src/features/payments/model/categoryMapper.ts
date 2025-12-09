import type { CategoryResponseDto } from '@/api/data-contracts'
export const mapCategoryDto = (dto: CategoryResponseDto): CategoryResponseDto => ({
  ...dto,
  images: {
    customLight: dto.images?.customLight ?? null,
    customDark: dto.images?.customDark ?? null,
  },
})
