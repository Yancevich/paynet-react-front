import { Center, Flex, Stack, Table, Text } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { useUi } from '@/contexts';
import { DirectExchange } from '@/api/wallet_v2';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { OperationAmountAndTime } from '../OperationAmountAndTime';
import { TableMode } from '../../../types';
import classes from '../../transactionHistoryTableRow.module.css';

import { tableColumns } from './config.tsx';
import { isOperaionFailed } from '../../utils.ts';

interface ExchangeRowProps {
  tableMode?: TableMode;
  operationDetails: DirectExchange;
}

export const ExchangeRow = ({
  tableMode = 'standard',
  operationDetails,
}: ExchangeRowProps) => {
  const { formatMessage } = useIntl();
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();
  const isFailedStatus = isOperaionFailed(operationDetails.status);
  return (
    <>
      <Table.Td>
        <Flex align="center" gap={12}>
          <Center className={classes.operationIcon}>
            <Icon name="repeat" size={20} />
          </Center>
          <Stack gap={2}>
            <Text size="lg" c={rcc('regular-content.secondary')}>
              {formatMessage({
                id: 'widget.transaction_history.exchange',
                defaultMessage: 'Conversion',
              })}
            </Text>

            <Text size="sm" c={rcc('regular-content.secondary')}>
              {operationDetails.fromCurrency.toUpperCase()}
              {' → '}
              {operationDetails.toCurrency.toUpperCase()}
            </Text>
          </Stack>
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
          currency={operationDetails.toCurrency}
          date={operationDetails.createdAt}
          type="positive"
          color={isFailedStatus ? 'regular' : 'positive'}
        />
      </Table.Td>
    </>
  );
};
