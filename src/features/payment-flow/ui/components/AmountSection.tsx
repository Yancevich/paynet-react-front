import type { FC } from 'react'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import { getPaymentFlowMessage } from '@/shared/lib/i18n/messages/paymentFlow'

const coinOptions = [
  { code: 'USDT', balance: 500 },
  { code: 'BTC', balance: 0.25 },
  { code: 'ETH', balance: 1.4 },
]

type AmountSectionProps = {
  amount: string
  coin: string
  currentCoin: { code: string; balance: number }
  locale: LocaleCode
  onAmountChange: (value: string) => void
  onCoinChange: (value: string) => void
}

const AmountSection: FC<AmountSectionProps> = ({
  amount,
  coin,
  currentCoin,
  locale,
  onAmountChange,
  onCoinChange,
}) => {
  const t = (key: Parameters<typeof getPaymentFlowMessage>[1], params?: Record<string, string | number>) =>
    getPaymentFlowMessage(locale, key, params)

  return (
    <>
      <div className="provider-modal__control">
        <label className="provider-modal__label" htmlFor="provider-amount">
          {t('amountLabel')}
        </label>
        <div className="provider-modal__input provider-modal__input--with-addon">
          <input
            id="provider-amount"
            type="number"
            min="0"
            step="1"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder={t('amountPlaceholder')}
          />
          <span className="provider-modal__addon">UZS</span>
        </div>
      </div>

      <div className="provider-modal__control">
        <label className="provider-modal__label" htmlFor="provider-coin">
          {t('chooseCoin')}
        </label>
        <div className="provider-modal__input provider-modal__input--with-addon">
          <select
            id="provider-coin"
            value={coin}
            onChange={(e) => onCoinChange(e.target.value)}
            className="provider-modal__select provider-modal__select--transparent"
          >
            {coinOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.code}
              </option>
            ))}
          </select>
          <span className="provider-modal__addon">
            {t('balance')}: {currentCoin.balance} {currentCoin.code}
          </span>
        </div>
      </div>
    </>
  )
}

export default AmountSection
