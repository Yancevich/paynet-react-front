import { Center, Flex, Table, Text } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Payout } from '@/api/wallet_v2';
import { Icon } from '@/common/components/Icon';
import { useUi } from '@/contexts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { TableMode } from '../../../types';
import { OperationAmountAndTime } from '../OperationAmountAndTime';
import classes from '../../transactionHistoryTableRow.module.css';

import { tableColumns } from './config.tsx';

interface PayoutRowProps {
  operationDetails: Payout;
  tableMode: TableMode;
}

export const PayoutRow = ({
  operationDetails,
  tableMode = 'standard',
}: PayoutRowProps) => {
  const { formatMessage } = useIntl();
  const { rcc } = useThemeColors();
  const { isMobile } = useUi();
  return (
    <>
      <Table.Td>
        <Flex align="center" gap={12}>
          <Center className={classes.operationIcon}>
            <Icon name="arrow-up-right" size={20} />
          </Center>
          <Text size="lg" c={rcc('regular-content.secondary')}>
            {formatMessage({
              id: 'widget.transaction_history.payout',
              defaultMessage: 'Pay Out',
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
          amount={operationDetails.fromAmount ?? '0'}
          currency={operationDetails.fromCurrency ?? ''}
          date={operationDetails.createdAt}
          type="negative"
        />
      </Table.Td>
    </>
  );
};
