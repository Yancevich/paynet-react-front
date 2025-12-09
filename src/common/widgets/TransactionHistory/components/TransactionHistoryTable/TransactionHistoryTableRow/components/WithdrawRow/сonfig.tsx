import { Flex, Table, Text } from '@mantine/core';

import { Withdraw } from '@/api/wallet_v2';
import { CopyButton } from '@/common/components/CopyButton/CopyButton.tsx';
import { ExplorerLink } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/ExplorerLink';
import { OperationStatusBadge } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/components';
import { TableMode } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/types';
import { ColumnConfig } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/config';

export const tableColumns: Record<
  TableMode,
  ColumnConfig<
    Withdraw & {
      to?: string;
      explorerLink: string;
      blockchain?: string;
    }
  >[]
> = {
  standard: [
    {
      key: 'blockchain',
      render: (data) => (
        <Table.Td>
          <Text size="lg">{data?.blockchain?.toUpperCase() ?? '-'}</Text>
        </Table.Td>
      ),
    },
    {
      key: 'address',
      render: (data) => {
        const toAddress = data?.to;
        const shortedToAddress =
          toAddress?.slice(0, 10) + '...' + toAddress?.slice(-10);

        return (
          <Flex gap={8} align="center">
            <Text size="lg" td={toAddress ? 'underline' : 'transparent'}>
              {toAddress ? shortedToAddress : '-'}
            </Text>
            {toAddress && <CopyButton text={toAddress} />}
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
  exchange: [
    {
      key: 'status',
      render: (data) => <OperationStatusBadge status={data.status} />,
    },
  ],
  account: [
    {
      key: 'blockchain',
      render: (data) => (
        <Text size="lg">{data?.blockchain?.toUpperCase() ?? '-'}</Text>
      ),
    },
    {
      key: 'status',
      render: (data) => <OperationStatusBadge status={data.status} />,
    },
  ],
};
