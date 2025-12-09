import {
  DirectExchangeStatus,
  PayoutStatus,
  TransferStatus,
  WithdrawStatus,
  PayinStatus,
} from '@/api/wallet_v2';

export const isOperaionFailed = (
  status:
    | DirectExchangeStatus
    | PayoutStatus
    | PayinStatus
    | TransferStatus
    | WithdrawStatus
    | undefined
) =>
  status &&
  [
    DirectExchangeStatus.FAILED,
    DirectExchangeStatus.REJECTED,
    DirectExchangeStatus.REJECTING,
    PayoutStatus.FAILED,
    PayinStatus.FAILED,
    TransferStatus.FAILED,
    TransferStatus.REJECTED,
    WithdrawStatus.FAILED,
    WithdrawStatus.FAILING,
    WithdrawStatus.REJECTED,
    WithdrawStatus.REJECTING,
  ].includes(status);
