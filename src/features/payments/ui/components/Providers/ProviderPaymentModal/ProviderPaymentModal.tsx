import type { Provider } from '@/features/payments/model/provider'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import { PaymentFlow } from '@/features/payment-flow'

type ProviderPaymentModalProps = {
  provider: Provider | null
  locale: LocaleCode
  onClose: () => void
}

const ProviderPaymentModal = ({
  provider,
  locale,
  onClose,
}: ProviderPaymentModalProps) => {
  if (!provider) return null

  return (
    <PaymentFlow provider={provider} locale={locale} onClose={onClose} />
  )
}

export default ProviderPaymentModal
