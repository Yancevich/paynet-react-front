import { Center, Flex, Table, Text } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { useUi } from '@/contexts';
import { Payin } from '@/api/wallet_v2';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { OperationAmountAndTime } from '../OperationAmountAndTime';
import { TableMode } from '../../../types';
import classes from '../../transactionHistoryTableRow.module.css';

import { tableColumns } from './config.tsx';
import { isOperaionFailed } from '../../utils.ts';

interface PayinRowProps {
  tableMode: TableMode;
  operationDetails: Payin;
}

export const PayinRow = ({ tableMode, operationDetails }: PayinRowProps) => {
  const { formatMessage } = useIntl();
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();
  const isFailedStatus = isOperaionFailed(operationDetails.status);
  return (
    <>
      <Table.Td>
        <Flex align="center" gap={12}>
          <Center className={classes.operationIcon}>
            <Icon name="arrow-down" size={20} />
          </Center>
          <Text size="lg" c={rcc('regular-content.secondary')}>
            {formatMessage({
              id: 'widget.transaction_history.payin',
              defaultMessage: 'Pay In',
            })}
          </Text>
        </Flex>
      </Table.Td>

      {!isMobile &&
        tableColumns[tableMode].map((column) => (
          <Table.Td key={column.key} c={rcc('regular-content.secondary')}>
            {column.render(operationDetails)}
          </Table.Td>
        ))}

      <Table.Td>
        <OperationAmountAndTime
          amount={operationDetails.toAmount ?? '0'}
          currency={operationDetails.toCurrency ?? ''}
          date={operationDetails.createdAt}
          type="positive"
          color={isFailedStatus ? 'regular' : 'positive'}
        />
      </Table.Td>
    </>
  );
};
