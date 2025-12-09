import { useQuery } from '@tanstack/react-query'
import type { ServiceResponseDto } from '@/api/data-contracts'
import { getServicesByProvider } from '../api/servicesApi'

export const useProviderServices = (providerId: number | null) => {
  const query = useQuery<ServiceResponseDto[]>({
    queryKey: ['provider-services', providerId],
    queryFn: () => getServicesByProvider(providerId!),
    enabled: Boolean(providerId),
  })

  return query
}
