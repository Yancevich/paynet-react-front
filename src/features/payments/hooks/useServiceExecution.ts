import { useMutation, useQuery } from '@tanstack/react-query'
import { executeApi, operationStatusApi } from '@/api/client'
import type { ExecuteRequest, ExecuteResponse, OperationStatusResponse } from '@/api/data-contracts'

type ExecuteParams = {
  serviceId: number
  payload: ExecuteRequest
}

export const useServiceExecution = () => {
  const executeMutation = useMutation<ExecuteResponse, unknown, ExecuteParams>({
    mutationFn: ({ serviceId, payload }) =>
      executeApi.executeService(serviceId, payload).then(({ data }) => data),
  })

  return {
    executeMutation,
  }
}

export const useOperationPolling = (
  operationId: string | null,
  enabled: boolean
) => {
  const statusQuery = useQuery<OperationStatusResponse>({
    queryKey: ['operation-status', operationId],
    queryFn: async () => {
      const { data } = await operationStatusApi.getOperationStatus(operationId!, {})
      return data
    },
    enabled: Boolean(operationId) && enabled,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      if (!status) return 3000
      if (status === 'PENDING' || status === 'INITIAL') return 3000
      return false
    },
    refetchOnWindowFocus: false,
  })

  return statusQuery
}
