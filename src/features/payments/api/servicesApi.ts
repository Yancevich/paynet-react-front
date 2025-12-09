import { catalogApi } from '@/api/client'
import type { ServiceResponseDto } from '@/api/data-contracts'

export const getServicesByProvider = async (
  providerId: number
): Promise<ServiceResponseDto[]> => {
  const { data } = await catalogApi.getServicesByProvider(providerId)
  return data.services
}
