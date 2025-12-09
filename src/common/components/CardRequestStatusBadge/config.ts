import { CardRequestStatus } from '@/api/cardHolder';
import { CustomBadgeVariants } from '@/mantine';

const statusToBadgeVariant: Partial<
  Record<CardRequestStatus, CustomBadgeVariants>
> = {
  [CardRequestStatus.INVOICE_PROCESSED]: 'positive',
  [CardRequestStatus.ISSUED]: 'positive',

  [CardRequestStatus.PENDING]: 'warning',

  [CardRequestStatus.INIT]: 'negative',
  [CardRequestStatus.REJECTED]: 'negative',
  [CardRequestStatus.INVOICE_FAILED]: 'negative',
  [CardRequestStatus.FAILED]: 'negative',
  [CardRequestStatus.CANCELED]: 'negative',
} as const;

export const cardRequestStatusToBadgeVariant = (
  status?: CardRequestStatus
): string => {
  if (!status) {
    return 'warning';
  }

  return statusToBadgeVariant[status] ?? 'warning';
};
