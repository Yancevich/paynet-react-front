import { useIntl } from 'react-intl';
import { Badge, Text, TextProps, Tooltip } from '@mantine/core';

import { CustomBadgeVariants } from '@/mantine';
import { cardStatusToBadgeVariant } from '@/common/components/CardStatusBadge/config';
import { CardStatus, DeliveryStatus } from '@/api/cardHolder';
import { getTranslationByCardStatus } from '@/utils/translations';

import styles from './styles.module.css';

interface CardStatusBadgeProps {
  status?: CardStatus | DeliveryStatus;
  classNames?: string;
  textSize?: TextProps['size'];
}

export const CardStatusBadge = ({
  status,
  classNames,
  textSize = 'sm',
}: CardStatusBadgeProps) => {
  const { formatMessage } = useIntl();

  const label = status ? getTranslationByCardStatus(formatMessage, status) : '';
  const truncated = label.length > 8 ? label.slice(0, 8) + '…' : label;

  return (
    <Badge
      size="sm"
      variant={cardStatusToBadgeVariant(status) as CustomBadgeVariants}
      classNames={{ root: classNames, label: styles.capitalize }}
    >
      <Tooltip label={label} disabled={label.length <= 8}>
        <Text size={textSize}>{truncated}</Text>
      </Tooltip>
    </Badge>
  );
};
