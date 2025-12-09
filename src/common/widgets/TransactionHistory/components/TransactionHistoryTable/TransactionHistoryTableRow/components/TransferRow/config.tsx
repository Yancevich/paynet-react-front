import { Text } from '@mantine/core';

import { Transfer } from '@/api/wallet_v2';
import { OperationStatusBadge } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/components';
import { TableMode } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/types';
import { ColumnConfig } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/config';

export const tableColumns: Record<TableMode, ColumnConfig<Transfer>[]> = {
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
      render: (data) => {
        const shortId = `${data.id?.slice(0, 5)}...${data.id?.slice(-5)}`;
        return (
          <Text td="underline" size="lg">
            {shortId}
          </Text>
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
      render: () => <Text size="lg">-</Text>,
    },
    {
      key: 'status',
      render: (data) => <OperationStatusBadge status={data.status} />,
    },
  ],
};
