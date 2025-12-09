import { useIntl } from 'react-intl';
import { Badge, Text, Tooltip } from '@mantine/core';

import { CustomBadgeVariants } from '@/mantine';
import { CardRequestStatus } from '@/api/cardHolder';
import { getTranslationByCardRequestStatus } from '@/utils/translations';
import { cardRequestStatusToBadgeVariant } from '@/common/components/CardRequestStatusBadge/config';

import styles from './styles.module.css';

interface CardRequestStatusBadgeProps {
  status?: CardRequestStatus;
  classNames?: string;
}

export const CardRequestStatusBadge = ({
  status,
  classNames,
}: CardRequestStatusBadgeProps) => {
  const { formatMessage } = useIntl();

  const label = status
    ? getTranslationByCardRequestStatus(formatMessage, status)
    : '';
  const truncated = label.length > 8 ? label.slice(0, 8) + '…' : label;

  return (
    <Badge
      size="md"
      variant={cardRequestStatusToBadgeVariant(status) as CustomBadgeVariants}
      classNames={{ root: classNames, label: styles.capitalize }}
    >
      <Tooltip label={label} disabled={label.length <= 8}>
        <Text size="sm">{truncated}</Text>
      </Tooltip>
    </Badge>
  );
};
