import { Center, Flex, Table, Text } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Withdraw } from '@/api/wallet_v2';
import { Icon } from '@/common/components/Icon';
import { useUi } from '@/contexts';
import { OperationAmountAndTime } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/components/OperationAmountAndTime';
import { TableMode } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/types';
import { tableColumns } from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/components/WithdrawRow/сonfig';
import classes from '@/common/widgets/TransactionHistory/components/TransactionHistoryTable/TransactionHistoryTableRow/transactionHistoryTableRow.module.css';
import { useThemeColors } from '@/theme/useThemeColors.ts';
import { isOperaionFailed } from '../../utils';

interface WithdrawRowProps {
  operationDetails: Withdraw & {
    explorerLink: string;
  };
  tableMode?: TableMode;
}

export const WithdrawRow = ({
  operationDetails,
  tableMode = 'standard',
}: WithdrawRowProps) => {
  const { formatMessage } = useIntl();
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();

  return (
    <>
      <Table.Td>
        <Flex align="center" gap={12}>
          <Center className={classes.operationIcon}>
            <Icon name="arrow-up-right" size={20} />
          </Center>
          <Text size="lg" c={rcc('regular-content.secondary')}>
            {formatMessage({
              id: 'widget.transaction_history.withdraw',
              defaultMessage: 'Withdraw',
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
          amount={operationDetails.amount}
          currency={operationDetails.currency}
          date={operationDetails.createdAt}
          type="negative"
        />
      </Table.Td>
    </>
  );
};
