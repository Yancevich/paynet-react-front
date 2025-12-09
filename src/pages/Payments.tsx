import Page from '@/layout/Page/Page'
import { PaymentsSection } from '@/features/payments/ui'
import { Templates } from '@/features/templates/ui'

const Payments = () => {
  return (
    <Page title="Payments">
      <Templates />
      <PaymentsSection />
    </Page>
  )
}

export default Payments
