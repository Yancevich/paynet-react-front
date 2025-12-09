import { useIntl } from 'react-intl';
import { Center, Flex, Table, Text } from '@mantine/core';

import { Deposit } from '@/api/wallet_v2';
import { useUi } from '@/contexts';
import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { OperationAmountAndTime } from '../OperationAmountAndTime';
import { TableMode } from '../../../types';
import classes from '../../transactionHistoryTableRow.module.css';

import { tableColumns } from './config.tsx';

interface DepositRowProps {
  operationDetails: Deposit & {
    explorerLink: string;
  };
  tableMode?: TableMode;
}

export const DepositRow = ({
  operationDetails,
  tableMode = 'standard',
}: DepositRowProps) => {
  const { formatMessage } = useIntl();
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();

  return (
    <>
      <Table.Td>
        <Flex align="center" gap={12}>
          <Center className={classes.operationIcon}>
            <Icon name="arrow-down" size={20} />
          </Center>
          <Text size="lg" c={rcc('regular-content.secondary')}>
            {formatMessage({
              id: 'widget.transaction_history.deposit',
              defaultMessage: 'Deposit',
            })}
          </Text>
        </Flex>
      </Table.Td>
      {!isMobile &&
        tableColumns[tableMode].map((col) => (
          <Table.Td key={col.key} c={rcc('regular-content.secondary')}>
            {col.render(operationDetails)}
          </Table.Td>
        ))}
      <Table.Td>
        <OperationAmountAndTime
          amount={operationDetails.amount ?? '0'}
          currency={operationDetails.currency ?? ''}
          date={operationDetails.createdAt}
          type="positive"
        />
      </Table.Td>
    </>
  );
};
