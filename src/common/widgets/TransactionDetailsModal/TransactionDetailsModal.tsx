import { Button, Stack, Title } from '@mantine/core';
import { useIntl } from 'react-intl';

import { ModalDrawer } from '@/common/components/ModalDrawer';
import { OperationType } from '@/api/wallet_v2';
import {
  DepositInfo,
  ExchangeInfo,
  PayinInfo,
  PayoutInfo,
  TransferInfo,
  WithdrawInfo,
} from '@/common/widgets/TransactionDetailsModal/components';
import { ExtendedOperationLogData } from '@/store/operationLog';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface TransactionDetailsModalProps {
  transaction?: ExtendedOperationLogData;
  close: () => void;
}

export const TransactionDetailsModal = ({
  transaction,
  close,
}: TransactionDetailsModalProps) => {
  const { formatMessage } = useIntl();
  const { rcc } = useThemeColors();

  const renderHeader = (
    operationType: OperationType
  ): { id: string; defaultMessage: string } => {
    const headerByType = {
      DEPOSIT: {
        id: 'widget.transaction_details_modal.header.deposit',
        defaultMessage: 'Deposit details',
      },
      WITHDRAW: {
        id: 'widget.transaction_details_modal.header.withdraw',
        defaultMessage: 'Withdraw details',
      },
      PAYIN: {
        id: 'widget.transaction_details_modal.header.payin',
        defaultMessage: 'Payin details',
      },
      PAYOUT: {
        id: 'widget.transaction_details_modal.header.payout',
        defaultMessage: 'Payout details',
      },
      EXCHANGE: {
        id: 'widget.transaction_details_modal.header.exchange',
        defaultMessage: 'Exchange details',
      },
      TRANSFER: {
        id: 'widget.transaction_details_modal.header.transfer',
        defaultMessage: 'Transfer details',
      },
    };
    return headerByType[operationType];
  };

  const renderInfo = (operationType: OperationType) => {
    const infos = {
      DEPOSIT: () => <DepositInfo details={transaction?.deposit} />,
      WITHDRAW: () => <WithdrawInfo details={transaction?.withdraw} />,
      TRANSFER: () => <TransferInfo details={transaction?.transfer} />,
      PAYIN: () => <PayinInfo details={transaction?.payin} />,
      PAYOUT: () => <PayoutInfo details={transaction?.payout} />,
      EXCHANGE: () => <ExchangeInfo details={transaction?.exchange} />,
    };

    return infos[operationType]?.();
  };

  if (!transaction) return null;

  return (
    <ModalDrawer opened={!!transaction} close={close}>
      <Stack gap={32}>
        <Title
          ta="center"
          c={rcc('regular-content.primary')}
          order={2}
          size="lg"
        >
          {formatMessage(renderHeader(transaction.operationType))}
        </Title>
        {renderInfo(transaction.operationType)}
        <Button onClick={close} fullWidth>
          {formatMessage({
            id: 'common.close',
            defaultMessage: 'Close',
          })}
        </Button>
      </Stack>
    </ModalDrawer>
  );
};
