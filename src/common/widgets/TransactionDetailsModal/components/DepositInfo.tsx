import { Flex, Stack, Text } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Deposit } from '@/api/wallet_v2';
import { formatDate } from '@/utils/formatDate';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { CopyButton } from '@/common/components/CopyButton/CopyButton';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { ExplorerLink } from '../../TransactionHistory/components/TransactionHistoryTable/ExplorerLink';

interface DepositMeta {
  fromAddress?: string;
}

interface DepositInfoProps {
  details?: Deposit & {
    explorerLink: string | null;
    meta?: DepositMeta;
  };
}

export const DepositInfo = ({ details }: DepositInfoProps) => {
  const { formatMessage } = useIntl();
  const { rcc } = useThemeColors();

  if (!details) return null;

  return (
    <Stack gap={8}>
      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.date',
            defaultMessage: 'Date & Time',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.primary')}>
          {details.createdAt ? formatDate(details.createdAt) : null}
        </Text>
      </Flex>

      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.blockchain',
            defaultMessage: 'Blockchain',
          })}
        </Text>
        <Text size="lg" c={rcc('accent-content.primary')}>
          {details.blockchain}
        </Text>
      </Flex>

      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.token',
            defaultMessage: 'Token',
          })}
        </Text>
        <Text size="lg" c={rcc('regular-content.primary')}>
          {details.token}
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
          {details.amount && details.currency ? (
            <FormattedAmount amount={details.amount} slug={details.currency} />
          ) : null}
        </Text>
      </Flex>

      <Flex align="center" justify="space-between">
        <Text size="md" c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widget.transaction_details_modal.field.from_address',
            defaultMessage: 'From Address',
          })}
        </Text>
        <Flex gap={4} align="center">
          <Text size="lg" c={rcc('accent-content.primary')}>
            {details.meta?.fromAddress
              ? `${details.meta.fromAddress.slice(0, 10)}...${details.meta.fromAddress.slice(-10)}`
              : '-'}
          </Text>
          {details.meta?.fromAddress ? (
            <CopyButton text={details.meta.fromAddress} />
          ) : null}
        </Flex>
      </Flex>

      {details.explorerLink && (
        <Flex align="center" justify="space-between">
          <Text size="md" c={rcc('regular-content.secondary')}>
            {formatMessage({
              id: 'widget.transaction_details_modal.field.txid',
              defaultMessage: 'TXID',
            })}
          </Text>
          <Flex gap={4} align="center">
            <ExplorerLink
              originalHash={details.explorerLink}
              link={details.explorerLink}
            />
            <CopyButton text={details.explorerLink} />
          </Flex>
        </Flex>
      )}
    </Stack>
  );
};
