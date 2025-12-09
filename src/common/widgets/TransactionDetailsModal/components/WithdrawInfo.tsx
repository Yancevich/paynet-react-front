import { Flex, Stack, Text } from '@mantine/core';
import { useIntl } from 'react-intl';
import { useAtomValue } from 'jotai';

import { CryptoWithdraw } from '@/api/wallet_v2';
import { formatDate } from '@/utils/formatDate';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { CopyButton } from '@/common/components/CopyButton/CopyButton';
import { accountListAtom } from '@/store/accounts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { ExplorerLink } from '../../TransactionHistory/components/TransactionHistoryTable/ExplorerLink';
import { OperationStatusBadge } from '../../TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/components';

interface WithdrawInfoProps {
  details?: CryptoWithdraw & {
    explorerLink: string | null;
  };
}

export const WithdrawInfo = ({ details }: WithdrawInfoProps) => {
  const { formatMessage } = useIntl();
  const { rcc } = useThemeColors();

  const accounts = useAtomValue(accountListAtom);

  if (!details) return null;

  const toAddress = details.to;
  const fromAccount = accounts.find(
    (account) => account.account === details?.fromAccount
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
            id: 'widget.transaction_details_modal.field.from_account',
            defaultMessage: 'From Account',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.primary')}>
          <Text size="lg" c={rcc('regular-content.primary')}>
            <Flex gap={8} align="center">
              {fromAccount?.shortName || '-'}
            </Flex>
          </Text>
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
            id: 'widget.transaction_details_modal.field.to_address',
            defaultMessage: 'To address',
          })}
        </Text>
        <Flex gap={4} align="center">
          <Text size="lg" c={rcc('regular-content.primary')}>
            {`${toAddress?.slice(0, 10)}...${toAddress?.slice(-10)}`}
          </Text>
          {toAddress ? <CopyButton text={toAddress} /> : '-'}
        </Flex>
      </Flex>

      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.addressTx',
            defaultMessage: 'Link',
          })}
        </Text>
        {details?.explorerLink ? (
          <Flex gap={4} align="center">
            <ExplorerLink
              originalHash={details?.explorerLink}
              link={details.explorerLink}
            />
            <CopyButton text={details.explorerLink} />
          </Flex>
        ) : (
          '-'
        )}
      </Flex>
    </Stack>
  );
};
