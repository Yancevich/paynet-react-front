import { CardStatus, DeliveryStatus } from '@/api/cardHolder';
import { CustomBadgeVariants } from '@/mantine';

export type SupportedStatuses = CardStatus | DeliveryStatus;

const statusToBadgeVariant: Record<SupportedStatuses, CustomBadgeVariants> = {
  [CardStatus.INIT]: 'positive',
  [CardStatus.ISSUED]: 'positive',
  [CardStatus.ACTIVE]: 'positive',
  [DeliveryStatus.SHIPPED]: 'positive',
  [DeliveryStatus.DELIVERED]: 'positive',

  [CardStatus.PENDING]: 'warning',

  [CardStatus.FROZEN]: 'frozen',

  [CardStatus.LOST]: 'negative',
  [CardStatus.STOLEN]: 'negative',
  [CardStatus.INACTIVE]: 'negative',
  [CardStatus.CLOSED]: 'negative',
  [CardStatus.REJECTED]: 'negative',
  [CardStatus.FAILED]: 'negative',
} as const;

export const cardStatusToBadgeVariant = (
  status?: SupportedStatuses
): string => {
  if (!status) {
    return 'warning';
  }

  return statusToBadgeVariant[status] ?? 'warning';
};
