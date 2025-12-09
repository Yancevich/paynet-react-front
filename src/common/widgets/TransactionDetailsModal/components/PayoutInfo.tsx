import { Flex, Stack, Text } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Payout } from '@/api/wallet_v2';
import { formatDate } from '@/utils/formatDate';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { OperationStatusBadge } from '../../TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/components';

interface PayoutInfoProps {
  details?: Payout;
}

export const PayoutInfo = ({ details }: PayoutInfoProps) => {
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
            id: 'widget.transaction_details_modal.field.from_amount',
            defaultMessage: 'From Amount',
          })}
        </Text>
        <Text size="lg" c={rcc('accent-content.primary')}>
          {details.fromAmount && details.fromCurrency && (
            <FormattedAmount
              amount={details?.fromAmount ?? '0'}
              slug={details?.fromCurrency?.toLowerCase() ?? 'usd'}
            />
          )}
        </Text>
      </Flex>

      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.to_amount',
            defaultMessage: 'To Amount',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.primary')}>
          {details.toAmount && details.toCurrency && (
            <FormattedAmount
              amount={details?.toAmount ?? '0'}
              slug={details?.toCurrency?.toLowerCase() ?? 'usd'}
            />
          )}
        </Text>
      </Flex>

      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.rate',
            defaultMessage: 'Rate',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.primary')}>
          {details?.rate && (
            <FormattedAmount
              amount={details.rate}
              slug={details?.toCurrency?.toLowerCase() ?? 'usd'}
              hideSymbol
            />
          )}
        </Text>
      </Flex>
    </Stack>
  );
};
