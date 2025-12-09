import { Divider, Table, Text } from '@mantine/core';
import React from 'react';

import { ExtendedOperationLogData } from '@/store/operationLog';
import { EmptyOperationsMessage } from '@/common/components/EmptyOperationsMessage';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { TableMode } from './types';
import { TransactionHistoryTableHeader } from './TransactionTableHeader';
import { TransactionHistoryTableRow } from './TransactionHistoryTableRow';

interface TransactionHistoryTableProps {
  operationsList: Record<string, ExtendedOperationLogData[]>;
  tableMode?: TableMode;
  selectOperation: (operation: ExtendedOperationLogData) => void;
  isEmptyList: boolean;
}

export const TransactionHistoryTable = ({
  tableMode = 'standard',
  selectOperation,
  operationsList,
  isEmptyList,
}: TransactionHistoryTableProps) => {
  const { rcc, rbdc } = useThemeColors();

  if (isEmptyList) {
    return <EmptyOperationsMessage />;
  }
  return (
    <Table withRowBorders={false} verticalSpacing={12}>
      <TransactionHistoryTableHeader tableMode={tableMode} />
      <Table.Tbody>
        {Object.entries(operationsList).map(([date, operations]) => (
          <React.Fragment key={date}>
            <Table.Tr>
              <Table.Td colSpan={6}>
                <Divider
                  labelPosition="left"
                  w="100%"
                  c={rbdc('regular-borders.border-1')}
                  label={
                    <Text size="md" c={rcc('regular-content.tetriary')}>
                      {date === new Date().toLocaleDateString()
                        ? 'Today'
                        : date}
                    </Text>
                  }
                />
              </Table.Td>
            </Table.Tr>
            {operations.map((operation) => (
              <TransactionHistoryTableRow
                key={operation.id}
                data={operation}
                openDetails={() => selectOperation(operation)}
                tableMode={tableMode}
              />
            ))}
          </React.Fragment>
        ))}
      </Table.Tbody>
    </Table>
  );
};
