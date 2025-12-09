import { useEffect, useMemo } from 'react'
import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import type { ServiceResponseDto } from '@/api/data-contracts'
import type { Provider } from '@/features/payments/model/provider'
import {
  paymentAmountAtom,
  paymentCoinAtom,
  paymentFieldValuesAtom,
  selectedChildServiceIdAtom,
  selectedServiceIdAtom,
} from '@/features/payments/state/paymentsAtoms'

const coinOptions = [
  { code: 'USDT', balance: 500, rateToUsd: 1 },
  { code: 'BTC', balance: 0.25, rateToUsd: 60000 },
  { code: 'ETH', balance: 1.4, rateToUsd: 3200 },
]

export const usePaymentForm = (
  provider: Provider | null,
  services: ServiceResponseDto[]
) => {
  const [selectedServiceId, setSelectedServiceId] = useAtom(selectedServiceIdAtom)
  const [selectedChildServiceId, setSelectedChildServiceId] = useAtom(
    selectedChildServiceIdAtom
  )
  const [fieldValues, setFieldValues] = useAtom(paymentFieldValuesAtom)
  const [amount, setAmount] = useAtom(paymentAmountAtom)
  const [coin, setCoin] = useAtom(paymentCoinAtom)

  const resetSelectedService = useResetAtom(selectedServiceIdAtom)
  const resetSelectedChildService = useResetAtom(selectedChildServiceIdAtom)
  const resetFieldValues = useResetAtom(paymentFieldValuesAtom)
  const resetAmount = useResetAtom(paymentAmountAtom)
  const resetCoin = useResetAtom(paymentCoinAtom)

  useEffect(() => {
    resetSelectedService()
    resetSelectedChildService()
    resetFieldValues()
    resetAmount()
    resetCoin()
  }, [
    provider?.id,
    resetAmount,
    resetCoin,
    resetFieldValues,
    resetSelectedChildService,
    resetSelectedService,
  ])

  useEffect(() => {
    if (selectedServiceId || !services.length) return

    const firstService = services.find((service) => !service.parentId) ?? services[0]
    setSelectedServiceId(firstService?.id ?? null)
  }, [selectedServiceId, services, setSelectedServiceId])

  const parentServices = useMemo(
    () => services.filter((service) => !service.parentId),
    [services]
  )

  const childServices = useMemo(
    () =>
      selectedServiceId
        ? services.filter((service) => service.parentId === selectedServiceId)
        : [],
    [selectedServiceId, services]
  )

  useEffect(() => {
    if (!childServices.length) {
      if (selectedChildServiceId) {
        setSelectedChildServiceId(null)
      }
      return
    }

    const isChildStillSelected = childServices.some(
      (service) => service.id === selectedChildServiceId
    )

    if (!isChildStillSelected) {
      setSelectedChildServiceId(childServices[0].id)
    }
  }, [childServices, selectedChildServiceId, setSelectedChildServiceId])

  const activeServiceId = selectedChildServiceId || selectedServiceId
  const activeService = services.find((service) => service.id === activeServiceId)

  useEffect(() => {
    resetFieldValues()
  }, [activeServiceId, resetFieldValues])

  const visibleFields = useMemo(
    () =>
      (activeService?.fields ?? []).sort((a, b) => a.order - b.order),
    [activeService?.fields]
  )

  const handleFieldChange = (name: string, value: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const amountValue = Number(amount) || 0
  const fee = amountValue ? Number((amountValue * 0.01).toFixed(2)) : 0
  const total = Number((amountValue + fee).toFixed(2))
  const currentCoin = coinOptions.find((option) => option.code === coin) ?? coinOptions[0]
  const usdApprox = Number((total * currentCoin.rateToUsd).toFixed(2))

  const isFormValid = Boolean(
    provider &&
      activeService &&
      (!childServices.length || selectedChildServiceId) &&
      amountValue > 0
  )

  return {
    selectedServiceId,
    setSelectedServiceId,
    selectedChildServiceId,
    setSelectedChildServiceId,
    fieldValues,
    setFieldValues,
    amount,
    setAmount,
    coin,
    setCoin,
    parentServices,
    childServices,
    activeService,
    activeServiceId,
    visibleFields,
    handleFieldChange,
    amountValue,
    fee,
    total,
    currentCoin,
    usdApprox,
    isFormValid,
  }
}
