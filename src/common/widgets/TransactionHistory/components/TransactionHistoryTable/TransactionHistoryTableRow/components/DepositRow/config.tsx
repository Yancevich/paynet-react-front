import { Flex, Text } from '@mantine/core';

import { Deposit } from '@/api/wallet_v2';
import { CopyButton } from '@/common/components/CopyButton/CopyButton.tsx';
import { ExplorerLink } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/ExplorerLink';
import { TableMode } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/types';
import { ColumnConfig } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/config';
import { OperationStatusBadge } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/components';

export const tableColumns: Record<
  TableMode,
  ColumnConfig<
    Deposit & {
      explorerLink: string;
      status?: string;
    }
  >[]
> = {
  standard: [
    {
      key: 'blockchain',
      render: (data) => (
        <Text size="lg">{data.blockchain?.toUpperCase() ?? '-'}</Text>
      ),
    },
    {
      key: 'address',
      render: (data) => {
        const meta = data?.meta as unknown as {
          fromAddress?: string;
          toAddress?: string;
        };
        const fromAddress = meta?.fromAddress;
        const shortedAddress =
          fromAddress?.slice(0, 10) + '...' + fromAddress?.slice(-10);
        return (
          <Flex align="center" gap={8}>
            <Text size="lg" td={fromAddress ? 'underline' : 'transparent'}>
              {shortedAddress ?? '-'}
            </Text>
            {fromAddress ? <CopyButton text={fromAddress} /> : null}
          </Flex>
        );
      },
    },
    {
      key: 'explorerLink',
      render: (data) => {
        const safeTxHash =
          data.meta && 'txHash' in data.meta
            ? (data?.meta?.txHash as string)
            : '';
        return (
          <ExplorerLink link={data.explorerLink} originalHash={safeTxHash} />
        );
      },
    },
    {
      key: 'status',
      render: (data) => <OperationStatusBadge status={data.status} />,
    },
  ],
  minimal: [],
  exchange: [],
  account: [
    {
      key: 'blockchain',
      render: (data) => (
        <Text size="lg">{data.blockchain?.toUpperCase() ?? '-'}</Text>
      ),
    },
    {
      key: 'status',
      render: (data) => <OperationStatusBadge status={data.status} />,
    },
  ],
};
