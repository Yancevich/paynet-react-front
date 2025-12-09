import { Text } from '@mantine/core';

import { DirectExchange } from '@/api/wallet_v2';
import { OperationStatusBadge } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/components';
import { TableMode } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/types';
import { ColumnConfig } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/config';

export const tableColumns: Record<TableMode, ColumnConfig<DirectExchange>[]> = {
  standard: [
    {
      key: 'blockchain',
      render: () => <Text size="lg">-</Text>,
    },
    {
      key: 'address',
      render: () => <Text size="lg">-</Text>,
    },
    {
      key: 'explorerLink',
      render: () => <Text size="lg">-</Text>,
    },
    {
      key: 'status',
      render: (data) => <OperationStatusBadge status={data.status} />,
    },
  ],
  exchange: [
    {
      key: 'status',
      render: (data) => <OperationStatusBadge status={data.status} />,
    },
  ],
  minimal: [],
  account: [
    {
      key: 'blockchain',
      render: () => <Text size="lg">-</Text>,
    },
    {
      key: 'status',
      render: (data) => <OperationStatusBadge status={data.status} />,
    },
  ],
};
