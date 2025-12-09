import type { FC } from 'react'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import { getPaymentFlowMessage } from '@/shared/lib/i18n/messages/paymentFlow'

type SummarySectionProps = {
  fee: number
  total: number
  usdApprox: number
  coinCode: string
  locale: LocaleCode
}

const SummarySection: FC<SummarySectionProps> = ({
  fee,
  total,
  usdApprox,
  coinCode,
  locale,
}) => {
  const t = (key: Parameters<typeof getPaymentFlowMessage>[1], params?: Record<string, string | number>) =>
    getPaymentFlowMessage(locale, key, params)

  return (
    <div className="provider-modal__summary">
      <div className="provider-modal__summary-row">
        <span>{t('fee')}</span>
        <span>
          {fee} {coinCode}
        </span>
      </div>

      <div className="provider-modal__summary-row provider-modal__summary-row--total">
        <span>{t('totalAmount', { coin: coinCode })}</span>
        <div className="provider-modal__summary-values">
          <span>
            {total} {coinCode}
          </span>
          <span className="provider-modal__muted">~${usdApprox}</span>
        </div>
      </div>
    </div>
  )
}

export default SummarySection
