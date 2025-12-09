import { Flex, Stack, Text } from '@mantine/core';
import { useIntl } from 'react-intl';
import { useAtomValue } from 'jotai/index';

import { DirectExchange } from '@/api/wallet_v2';
import { formatDate } from '@/utils/formatDate';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { accountListAtom } from '@/store/accounts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { OperationStatusBadge } from '../../TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/components';

interface ExchangeInfoProps {
  details?: DirectExchange;
}

export const ExchangeInfo = ({ details }: ExchangeInfoProps) => {
  const { formatMessage } = useIntl();
  const { rcc } = useThemeColors();
  const accounts = useAtomValue(accountListAtom);

  if (!details) return null;

  const fromAccount = accounts.find(
    (account) => account.account === details?.fromAccount
  );
  const toAccount = accounts.find(
    (account) => account.account === details?.toAccount
  );

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
        <Text size="lg" c={rcc('regular-content.primary')}>
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
            id: 'widget.transaction_details_modal.field.from_account',
            defaultMessage: 'From Account',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.primary')}>
          {fromAccount?.shortName ? (
            <Text size="lg" c={rcc('regular-content.primary')}>
              <Flex gap={8} align="center">
                {fromAccount.shortName}
              </Flex>
            </Text>
          ) : null}
        </Text>
      </Flex>
      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.to_account',
            defaultMessage: 'To Account',
          })}
        </Text>
        {toAccount?.shortName ? (
          <Text size="lg" c={rcc('regular-content.primary')}>
            <Flex gap={8} align="center">
              {toAccount.shortName}
            </Flex>
          </Text>
        ) : null}
      </Flex>
    </Stack>
  );
};
