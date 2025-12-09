import type { FC } from 'react'
import type { ServiceResponseDto } from '@/api/data-contracts'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import { getTitle } from '@/features/payments/ui/components/Providers/localization'
import { getPaymentFlowMessage } from '@/shared/lib/i18n/messages/paymentFlow'

type ServiceSelectorsProps = {
  locale: LocaleCode
  parentServices: ServiceResponseDto[]
  childServices: ServiceResponseDto[]
  selectedServiceId: number | null
  selectedChildServiceId: number | null
  onSelectService: (id: number | null) => void
  onSelectChildService: (id: number | null) => void
}

const ServiceSelectors: FC<ServiceSelectorsProps> = ({
  locale,
  parentServices,
  childServices,
  selectedServiceId,
  selectedChildServiceId,
  onSelectService,
  onSelectChildService,
}) => {
  const t = (key: Parameters<typeof getPaymentFlowMessage>[1]) =>
    getPaymentFlowMessage(locale, key)

  return (
    <>
      <div className="provider-modal__control">
        <label className="provider-modal__label" htmlFor="provider-service">
          {t('parentService')}
        </label>
        <select
          id="provider-service"
          value={selectedServiceId ?? ''}
          onChange={(e) => onSelectService(Number(e.target.value) || null)}
          className="provider-modal__select"
        >
          {!selectedServiceId && <option value="">{t('chooseService')}</option>}
          {parentServices.map((service) => (
            <option key={service.id} value={service.id}>
              {getTitle(service.title, locale)}
            </option>
          ))}
        </select>
      </div>

      <div className="provider-modal__control">
        <label className="provider-modal__label" htmlFor="provider-subservice">
          {t('childService')}
        </label>
        <select
          id="provider-subservice"
          value={selectedChildServiceId ?? ''}
          disabled={!childServices.length}
          onChange={(e) => onSelectChildService(Number(e.target.value) || null)}
          className="provider-modal__select"
        >
          {childServices.length === 0 ? (
            <option value="">{t('noChildOptions')}</option>
          ) : (
            childServices.map((service) => (
              <option key={service.id} value={service.id}>
                {getTitle(service.title, locale)}
              </option>
            ))
          )}
        </select>
      </div>
    </>
  )
}

export default ServiceSelectors
