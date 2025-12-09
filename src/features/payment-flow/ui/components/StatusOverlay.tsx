import type { FC } from 'react'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import type { ResponseFieldItem } from '@/api/data-contracts'
import { getTitle } from '@/features/payments/ui/components/Providers/localization'
import { getPaymentFlowMessage } from '@/shared/lib/i18n/messages/paymentFlow'

type StatusType =
  | 'SUCCESS'
  | 'FAILED'
  | 'PENDING'
  | 'INITIAL'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'EXPIRED'

type StatusOverlayProps = {
  status: StatusType
  locale: LocaleCode
  operationId: string | null
  response: ResponseFieldItem[] | null | undefined
  onClose: () => void
  onRetry: () => void
  onSaveTemplate: () => void
  isSavingTemplate: boolean
}

const StatusOverlay: FC<StatusOverlayProps> = ({
  status,
  locale,
  operationId,
  response,
  onClose,
  onRetry,
  onSaveTemplate,
  isSavingTemplate,
}) => {
  const t = (key: Parameters<typeof getPaymentFlowMessage>[1]) =>
    getPaymentFlowMessage(locale, key)

  const rows =
    response?.length && response.filter(Boolean).length
      ? response.filter(Boolean)
      : [
          { label: { en: 'Status', ru: 'Статус', uz: 'Holat' }, value: 'Completed' },
          { label: { en: 'Date & time', ru: 'Дата и время', uz: 'Sana va vaqt' }, value: '17 Nov 2024, 15:46' },
          { label: { en: 'Purchased', ru: 'Покупка', uz: 'Sotib olindi' }, value: '1 USDT' },
          { label: { en: 'Spent', ru: 'Списано', uz: 'Sarflandi' }, value: '100 000 UZS' },
          { label: { en: 'Fee', ru: 'Комиссия', uz: 'Komissiya' }, value: '0' },
        ]

  return (
    <div className="payment-status">
      <div className="payment-status__card">
        <div className={`payment-status__icon payment-status__icon--${status.toLowerCase()}`}>
          {status === 'SUCCESS' ? '✔' : status === 'FAILED' ? '!' : '…'}
        </div>
        <div className="payment-status__title">
          {status === 'SUCCESS'
            ? t('statusSuccess')
            : status === 'FAILED'
            ? t('statusFailed')
            : t('statusPending')}
        </div>
        {operationId && (
          <div className="payment-status__subtitle">
            {t('operation')}: {operationId}
          </div>
        )}

        {rows.length > 0 && (
          <div className="payment-status__response">
            {rows.map((item, index) => (
              <div key={index} className="payment-status__response-row">
                <span>{getTitle(item!.label, locale)}</span>
                <span>{item!.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="payment-status__actions">
          {status === 'PENDING' || status === 'INITIAL' ? (
            <button
              type="button"
              className="payment-status__button payment-status__button--ghost"
              onClick={onClose}
            >
              {t('statusClose')}
            </button>
          ) : status === 'FAILED' ? (
            <>
              <button
                type="button"
                className="payment-status__button payment-status__button--ghost"
                onClick={onClose}
              >
                {t('statusBack')}
              </button>
              <button
                type="button"
                className="payment-status__button payment-status__button--primary"
                onClick={onRetry}
              >
                {t('statusRetry')}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="payment-status__button payment-status__button--primary"
                onClick={onClose}
              >
                {t('statusClose')}
              </button>
              <button
                type="button"
                className="payment-status__button payment-status__button--ghost"
                onClick={onSaveTemplate}
                disabled={isSavingTemplate}
              >
                {isSavingTemplate ? t('statusSaving') : t('statusSave')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatusOverlay
