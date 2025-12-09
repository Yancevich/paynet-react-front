import type { ReactNode } from 'react'
import type { CategoryResponseDto } from '@/features/payments/model/category'
import type { CategoryId } from '@/features/payments/state/paymentsAtoms'

export type CategoryListItem = Omit<CategoryResponseDto, 'id'> & {
  id: CategoryId
  isFavorites?: boolean
  icon?: ReactNode
}
