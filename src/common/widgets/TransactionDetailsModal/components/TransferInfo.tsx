import { Flex, Stack, Text } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Transfer } from '@/api/wallet_v2';
import { formatDate } from '@/utils/formatDate';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { OperationStatusBadge } from '../../TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/components';

interface TransferInfoProps {
  details?: Transfer;
}

export const TransferInfo = ({ details }: TransferInfoProps) => {
  const { formatMessage } = useIntl();
  const { rcc } = useThemeColors();

  if (!details) return null;
  return (
    <Stack gap={8}>
      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.status',
            defaultMessage: 'Status',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.primary')}>
          <OperationStatusBadge status={details.status} />
        </Text>
      </Flex>
      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.date',
            defaultMessage: 'Date & Time',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.primary')}>
          {details.createdAt ? formatDate(details?.createdAt) : null}
        </Text>
      </Flex>

      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.amount',
            defaultMessage: 'Amount',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.primary')}>
          {details.currency && details.amount && (
            <FormattedAmount
              amount={details?.amount ?? '0'}
              slug={details?.currency?.toLowerCase() ?? 'usd'}
            />
          )}
        </Text>
      </Flex>

      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.from_account',
            defaultMessage: 'From Account',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.primary')}>
          {details?.fromAccount}
        </Text>
      </Flex>
      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.to_account',
            defaultMessage: 'To Account',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.secondary')}>
          {details?.toAccount}
        </Text>
      </Flex>
    </Stack>
  );
};
