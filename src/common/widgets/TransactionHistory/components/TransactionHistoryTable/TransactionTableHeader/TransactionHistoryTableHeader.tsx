import { Table } from '@mantine/core';
import { useIntl } from 'react-intl';

import { useUi } from '@/contexts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { TableMode } from '../types';

import { headerColumns } from './config';
interface TransactionHistoryTableHeaderProps {
  hidden?: boolean;
  tableMode?: TableMode;
}

export const TransactionHistoryTableHeader = ({
  hidden,
  tableMode = 'standard',
}: TransactionHistoryTableHeaderProps) => {
  const intl = useIntl();
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();

  if (isMobile || hidden) {
    return;
  }

  return (
    <Table.Thead>
      <Table.Tr>
        {headerColumns[tableMode].map((headerColumn) => (
          <Table.Th
            key={headerColumn.key}
            style={{ textAlign: headerColumn.textAlign }}
            c={rcc('regular-content.tetriary')}
          >
            {headerColumn.render(intl)}
          </Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );
};
