import { useAtomValue } from 'jotai'
import { Categories, PaymentsSearch, Providers } from '@/features/payments/ui'
import { getMessage } from '@/features/payments/ui/components/Providers/localization'
import { localeAtom } from '@/shared/state/uiAtoms'
import './PaymentsSection.css'

const PaymentsSection = () => {
  const locale = useAtomValue(localeAtom)
  const title = getMessage(locale, 'paymentListTitle')

  return (
    <div className="page__payments payments">
      <div className="payments__header">
        <h2 className="payments__title">{title}</h2>
        <PaymentsSearch />
      </div>

      <div className="payments__body">
        <Categories />
        <Providers />
      </div>
    </div>
  )
}

export default PaymentsSection
