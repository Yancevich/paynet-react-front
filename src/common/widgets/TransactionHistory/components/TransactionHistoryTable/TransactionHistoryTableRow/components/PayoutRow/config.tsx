import { Text } from '@mantine/core';

import { Payout } from '@/api/wallet';

import { ColumnConfig } from '../../config';
import { OperationStatusBadge } from '../OperationStatusBadge';
import { TableMode } from '../../../types';

export const tableColumns: Record<TableMode, ColumnConfig<Payout>[]> = {
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
