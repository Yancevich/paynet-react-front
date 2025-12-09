import { OperationType } from '@/api/wallet_v2';

export const operationsTypes = [
  {
    label: 'widget.transaction_history.deposit',
    default: 'Deposit',
    value: OperationType.DEPOSIT,
  },
  {
    label: 'widget.transaction_history.withdraw',
    default: 'Withdraw',
    value: OperationType.WITHDRAW,
  },
  {
    label: 'widget.transaction_history.payin',
    default: 'Payin',
    value: OperationType.PAYIN,
  },
  {
    label: 'widget.transaction_history.payout',
    default: 'Payout',
    value: OperationType.PAYOUT,
  },
  {
    label: 'widget.transaction_history.transfer',
    default: 'Transfer',
    value: OperationType.TRANSFER,
  },
  {
    label: 'widget.transaction_history.exchange',
    default: 'Exchange',
    value: OperationType.EXCHANGE,
  },
];
