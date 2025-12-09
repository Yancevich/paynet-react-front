import { adminDevelopmentApi } from '@/api/client'
import type { DevTokenResponse } from '@/api/data-contracts'

export const getDevToken = async (): Promise<DevTokenResponse> => {
  const res = await adminDevelopmentApi.generateJwtToken()
  return res.data
}
