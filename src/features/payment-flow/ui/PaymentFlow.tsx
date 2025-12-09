import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { Provider } from '@/features/payments/model/provider'
import { useProviderServices } from '@/features/payments/hooks/useProviderServices'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import type {
  ExecuteResponse,
  OperationStatusResponse,
  ResponseFieldItem,
  ServiceFieldResponseDto,
} from '@/api/data-contracts'
import {
  useServiceExecution,
  useOperationPolling,
} from '@/features/payments/hooks/useServiceExecution'
import { useSaveTemplate } from '@/features/payments/hooks/useSaveTemplate'
import { usePaymentForm } from '@/features/payment-flow/model/usePaymentForm'
import ProviderHeader from '@/features/payment-flow/ui/components/ProviderHeader'
import ServiceSelectors from '@/features/payment-flow/ui/components/ServiceSelectors'
import AmountSection from '@/features/payment-flow/ui/components/AmountSection'
import SummarySection from '@/features/payment-flow/ui/components/SummarySection'
import StatusOverlay from '@/features/payment-flow/ui/components/StatusOverlay'
import { getTitle } from '@/features/payments/ui/components/Providers/localization'
import { getPaymentFlowMessage } from '@/shared/lib/i18n/messages/paymentFlow'
import './paymentFlow.css'

type PaymentFlowProps = {
  provider: Provider
  locale: LocaleCode
  onClose: () => void
}

const PaymentFlow = ({ provider, locale, onClose }: PaymentFlowProps) => {
  const t = (key: Parameters<typeof getPaymentFlowMessage>[1], params?: Record<string, string | number>) =>
    getPaymentFlowMessage(locale, key, params)
  const queryClient = useQueryClient()
  const {
    data: fetchedServices = [],
    isPending: isServicesPending,
    isError: isServicesError,
  } = useProviderServices(provider?.id ?? null)

  const services = fetchedServices
  const isPending = isServicesPending
  const isError = isServicesError

  const { executeMutation } = useServiceExecution()
  const { executeMutation: infoExecuteMutation } = useServiceExecution()
  const saveTemplate = useSaveTemplate()

  const [lastExecution, setLastExecution] = useState<ExecuteResponse | null>(null)
  const [operationId, setOperationId] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [detailsResponse, setDetailsResponse] = useState<ResponseFieldItem[] | null>(null)
  const [detailsMessage, setDetailsMessage] = useState<string | null>(null)
  const [detailsFailed, setDetailsFailed] = useState(false)

  const {
    selectedServiceId,
    setSelectedServiceId,
    selectedChildServiceId,
    setSelectedChildServiceId,
    fieldValues,
    amount,
    setAmount,
    coin,
    setCoin,
    parentServices,
    childServices,
    activeService,
    activeServiceId,
    handleFieldChange,
    fee,
    total,
    currentCoin,
    usdApprox,
    isFormValid,
    visibleFields,
  } = usePaymentForm(provider, services)

  const shouldPoll =
    Boolean(operationId) &&
    (lastExecution?.status === 'INITIAL' || lastExecution?.status === 'PENDING')

  const operationStatus = useOperationPolling(operationId, shouldPoll)

  const currentStatus:
    | ExecuteResponse['status']
    | OperationStatusResponse['status']
    | null = operationStatus.data?.status ?? lastExecution?.status ?? null

  const currentResponse = useMemo(
    () => operationStatus.data?.response ?? lastExecution?.response ?? null,
    [lastExecution?.response, operationStatus.data?.response]
  )

  const hasFinished =
    currentStatus && currentStatus !== 'INITIAL' && currentStatus !== 'PENDING'
  const hasStarted =
    executeMutation.isPending || Boolean(lastExecution) || Boolean(operationStatus.data)

  useEffect(() => {
    setLastExecution(null)
    setOperationId(null)
    setFieldErrors({})
    setDetailsResponse(null)
    setDetailsMessage(null)
    setDetailsFailed(false)
  }, [provider?.id])

  useEffect(() => {
    setFieldErrors({})
    setDetailsResponse(null)
    setDetailsMessage(null)
    setDetailsFailed(false)
  }, [activeServiceId])

  useEffect(() => {
    if (hasFinished && currentStatus === 'SUCCESS') {
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] })
    }
  }, [currentStatus, hasFinished, queryClient])

  const closeAndReset = () => {
    setLastExecution(null)
    setOperationId(null)
    onClose()
  }

  const providerTitle = getTitle(provider.title, locale)
  const providerImage =
    provider.images?.customDark ??
    provider.images?.customLight ??
    provider.images?.vendorImageUrl ??
    ''
  const serviceTitle = activeService ? getTitle(activeService.title, locale) : ''

  const getLocalized = (message?: { en?: string; ru?: string; uz?: string }) =>
    message?.[locale as keyof typeof message] ||
    message?.ru ||
    message?.en ||
    message?.uz ||
    ''

  const validateField = (field: ServiceFieldResponseDto, value: string) => {
    if (field.required && !value?.trim()) return t('requiredError')

    if (field.fieldType === 'NUMBER' || field.fieldType === 'DECIMAL') {
      const asNumber = Number(value)
      if (Number.isNaN(asNumber)) return t('numberError')
    }

    if (field.fieldSize && value && value.length > field.fieldSize) {
      return t('maxLengthError', { max: field.fieldSize })
    }

    return ''
  }

  const updateFieldValue = (field: ServiceFieldResponseDto, value: string) => {
    handleFieldChange(field.name, value)
    const validationError = validateField(field, value)
    setFieldErrors((prev) => ({
      ...prev,
      [field.name]: validationError,
    }))
  }

  const canRequestDetails = Boolean(activeService && !activeService.isPayment)
  const areRequiredFieldsFilled = useMemo(
    () =>
      visibleFields.every((field) =>
        field.required ? Boolean(fieldValues[field.name]?.toString().trim()) : true
      ),
    [fieldValues, visibleFields]
  )
  const hasValidationErrors = Object.values(fieldErrors).some(Boolean)
  const canSubmit = isFormValid && areRequiredFieldsFilled && !hasValidationErrors

  const handleDetails = () => {
    if (!activeService || !canRequestDetails || !areRequiredFieldsFilled) return

    const payload = {
      fields: {
        ...fieldValues,
        ...(amount ? { amount } : {}),
      },
      currency: coin,
    }

    setDetailsFailed(false)
    setDetailsMessage(null)
    infoExecuteMutation
      .mutateAsync({ serviceId: activeService.id, payload })
      .then((response) => {
        const localizedMessage = getLocalized(response.message)
        setDetailsResponse(response.response ?? null)
        if (response.status === 'FAILED') {
          setDetailsFailed(true)
          setDetailsMessage(localizedMessage || t('detailsFailed'))
        } else {
          setDetailsFailed(false)
          setDetailsMessage(localizedMessage || t('detailsSuccess'))
        }
      })
      .catch(() => {
        setDetailsFailed(true)
        setDetailsMessage(t('detailsFailed'))
      })
  }

  const handleFieldBlur = (field: ServiceFieldResponseDto) => {
    const value = fieldValues[field.name] ?? ''
    const validationError = validateField(field, value)
    setFieldErrors((prev) => ({
      ...prev,
      [field.name]: validationError,
    }))

    if (validationError) return
    if (canRequestDetails) {
      handleDetails()
    }
  }

  const handleConfirm = () => {
    if (!activeService || !canSubmit) return

    const payload = {
      fields: {
        ...visibleFields.reduce(
          (acc, field) => ({
            ...acc,
            [field.name]: fieldValues[field.name] ?? '',
          }),
          {}
        ),
        amount: amount || '0',
      },
      currency: coin,
    }

    executeMutation
      .mutateAsync({ serviceId: activeServiceId!, payload })
      .then((response) => {
        setLastExecution(response)
        if (
          response.type === 'PAYMENT' &&
          (response.status === 'INITIAL' || response.status === 'PENDING') &&
          response.operationId
        ) {
          setOperationId(String(response.operationId))
        } else {
          setOperationId(null)
        }
      })
      .catch(() => {
        setOperationId(null)
      })
  }

  const handleSaveTemplate = () => {
    if (!provider || !activeService) return

    const templateEntries = [
      ...Object.entries(fieldValues),
      ['amount', amount],
    ].map(([key, value]) => [key, value as unknown as object])

    const templateData = Object.fromEntries(templateEntries) as Record<string, object>

    saveTemplate.mutate({
      providerId: provider.id,
      serviceId: activeService.id,
      categoryId: provider.categoryId,
      templateName: getTitle(activeService.title, locale),
      templateData,
    })
  }

  const popupStatus =
    (currentStatus as
      | ExecuteResponse['status']
      | OperationStatusResponse['status']) ||
    (executeMutation.isPending ? 'PENDING' : null)

  if (hasStarted && popupStatus) {
    return (
      <StatusOverlay
        status={popupStatus}
        locale={locale}
        operationId={operationId}
        response={currentResponse}
        onClose={closeAndReset}
        onRetry={() => {
          setLastExecution(null)
          setOperationId(null)
        }}
        onSaveTemplate={handleSaveTemplate}
        isSavingTemplate={saveTemplate.isPending}
      />
    )
  }

  return (
    <div className="provider-modal__overlay" onClick={onClose}>
      <div
        className="provider-modal"
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="provider-modal__header">
          <button
            className="provider-modal__back"
            type="button"
            onClick={onClose}
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path
                d="M5.75 10.75L0.75 5.75L5.75 0.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('back')}
          </button>

          <div className="provider-modal__title">{t('title')}</div>

          <button
            className="provider-modal__close"
            type="button"
            onClick={onClose}
            aria-label={t('close')}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M10.75 0.75L0.75 10.75M0.75 0.75L10.75 10.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>

        <div className="provider-modal__content">
          <ProviderHeader
            providerImage={providerImage}
            providerTitle={providerTitle}
            serviceTitle={serviceTitle}
          />

          <div className="provider-modal__grid">
            <ServiceSelectors
              locale={locale}
              parentServices={parentServices}
              childServices={childServices}
              selectedServiceId={selectedServiceId}
              selectedChildServiceId={selectedChildServiceId}
              onSelectService={setSelectedServiceId}
              onSelectChildService={setSelectedChildServiceId}
            />

            {visibleFields.map((field) => {
              const value = fieldValues[field.name] ?? ''
              const error = fieldErrors[field.name]
              const isSelect = field.fieldControl === 'SELECT'
              let options: string[] = []
              if (field.fieldValues) {
                try {
                  const parsed = JSON.parse(field.fieldValues)
                  if (Array.isArray(parsed)) {
                    options = parsed
                  }
                } catch {
                  options = []
                }
              }

              return (
                <div className="provider-modal__control" key={field.name}>
                  <label className="provider-modal__label" htmlFor={`field-${field.name}`}>
                    {getTitle(field.title, locale)}
                    {field.required ? ' *' : ''}
                  </label>
                  {isSelect ? (
                    <select
                      id={`field-${field.name}`}
                      className="provider-modal__select"
                      value={value}
                      disabled={field.readOnly}
                      onChange={(e) => updateFieldValue(field, e.target.value)}
                      onBlur={() => handleFieldBlur(field)}
                    >
                      <option value="">{t('selectValue')}</option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`field-${field.name}`}
                      type={field.fieldType === 'NUMBER' || field.fieldType === 'DECIMAL' ? 'number' : 'text'}
                      inputMode={field.fieldType === 'NUMBER' || field.fieldType === 'DECIMAL' ? 'decimal' : 'text'}
                      className={`provider-modal__input${error ? ' provider-modal__input--error' : ''}`}
                      placeholder={getTitle(field.title, locale)}
                      value={value}
                      readOnly={field.readOnly}
                      onChange={(e) => updateFieldValue(field, e.target.value)}
                      onBlur={() => handleFieldBlur(field)}
                      maxLength={field.fieldSize || undefined}
                    />
                  )}
                  {error && <span className="provider-modal__error">{error}</span>}
                </div>
              )
            })}
          </div>

          {isPending && null}
          {isError && (
            <div className="provider-modal__error">
              {t('loadServicesError')}
            </div>
          )}

          {canRequestDetails && (
            <div className="provider-modal__details">
              <button
                type="button"
                className="provider-modal__details-btn"
                disabled
              >
                {t('detailsButton')}
              </button>
              {detailsMessage && (
                <span
                  className={`provider-modal__details-msg${
                    detailsFailed ? ' provider-modal__details-msg--error' : ''
                  }`}
                >
                  {detailsMessage}
                </span>
              )}
              {detailsResponse && !detailsFailed && detailsResponse.length > 0 && (
                <div className="provider-modal__response">
                  {detailsResponse.filter(Boolean).map((item, idx) => (
                    <div key={`${item?.label?.en}-${idx}`} className="provider-modal__response-row">
                      <span>{item?.label ? getTitle(item.label, locale) : '-'}</span>
                      <span>{item?.value ?? '-'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="provider-modal__divider">
            <svg
              width="520"
              height="1"
              viewBox="0 0 520 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0.5H520"
                stroke="currentColor"
                strokeDasharray="7 7"
              />
            </svg>
          </div>

          <div className="provider-modal__grid provider-modal__grid--wide">
            <AmountSection
              amount={amount}
              coin={coin}
              currentCoin={currentCoin}
              locale={locale}
              onAmountChange={setAmount}
              onCoinChange={setCoin}
            />
          </div>

          <SummarySection
            fee={fee}
            total={total}
            usdApprox={usdApprox}
            coinCode={currentCoin.code}
            locale={locale}
          />

          <button
            type="button"
            className="provider-modal__confirm"
            disabled={!canSubmit || executeMutation.isPending}
            onClick={handleConfirm}
          >
            {executeMutation.isPending ? t('processing') : t('confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentFlow
