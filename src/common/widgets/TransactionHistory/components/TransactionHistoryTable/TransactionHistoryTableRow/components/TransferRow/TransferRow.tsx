import { Center, Flex, Table, Text } from '@mantine/core';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';
import { useAtomValue } from 'jotai/index';

import { Icon } from '@/common/components/Icon';
import { useUi } from '@/contexts';
import { Transfer } from '@/api/wallet_v2';
import { useOperationLog } from '@/store/operationLog/hooks';
import { accountListAtom } from '@/store/accounts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { TableMode } from '../../../types';
import { OperationAmountAndTime } from '../OperationAmountAndTime';
import classes from '../../transactionHistoryTableRow.module.css';

import { tableColumns } from './config';
import { isOperaionFailed } from '../../utils';

interface TransferRowProps {
  operationDetails: Transfer;
  tableMode: TableMode;
}

export const TransferRow = ({
  operationDetails,
  tableMode = 'standard',
}: TransferRowProps) => {
  const { formatMessage } = useIntl();
  const { isMobile } = useUi();
  const { accountId } = useParams();
  const { selectedAccount } = useOperationLog();
  const accountList = useAtomValue(accountListAtom);
  const { rcc } = useThemeColors();

  const isFromCurrentAccount =
    operationDetails.fromAccount === accountId ||
    operationDetails.fromAccount === selectedAccount?.account;

  const isCardTransfer =
    accountList.some((acc) => operationDetails.fromAccount === acc.account) &&
    !accountList.some((acc) => operationDetails.toAccount === acc.account);

  const isNegativeType = isCardTransfer || isFromCurrentAccount;

  const isFailedStatusOrNegative =
    isNegativeType || isOperaionFailed(operationDetails.status);

  return (
    <>
      <Table.Td>
        <Flex align="center" gap={12}>
          <Center className={classes.operationIcon}>
            <Icon name="arrow-up-right" size={20} />
          </Center>
          <Text size="lg" c={rcc('regular-content.secondary')}>
            {formatMessage({
              id: 'widget.transaction_history.transfer',
              defaultMessage: 'Transfer',
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
          type={isNegativeType ? 'negative' : 'positive'}
          color={isFailedStatusOrNegative ? 'regular' : 'positive'}
        />
      </Table.Td>
    </>
  );
};
