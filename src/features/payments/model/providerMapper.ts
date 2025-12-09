import type { ProviderResponseDto } from '@/api/data-contracts'
import type { Provider } from './provider'

export const mapProviderDto = (dto: ProviderResponseDto): Provider => ({
  ...dto,
  images: {
    vendorImageUrl: dto.images.vendorImageUrl,
    customLight: dto.images.customLight ?? null,
    customDark: dto.images.customDark ?? null,
  },
})
