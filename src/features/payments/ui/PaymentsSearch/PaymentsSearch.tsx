import { useAtom, useAtomValue } from 'jotai'
import { providerSearchAtom } from '@/features/payments/state/paymentsAtoms'
import SearchIcon from '@/assets/icons/search-icon.svg?react'
import { getMessage } from '@/features/payments/ui/components/Providers/localization'
import { localeAtom } from '@/shared/state/uiAtoms'
import './PaymentsSearch.css'

const PaymentsSearch = () => {
  const [searchQuery, setSearchQuery] = useAtom(providerSearchAtom)
  const locale = useAtomValue(localeAtom)

  return (
    <label className="payments__search search">
      <SearchIcon className="search__icon" aria-hidden="true" />
      <input
        id="search_input"
        className="search__input"
        type="search"
        placeholder={getMessage(locale, 'searchPlaceholder')}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </label>
  )
}

export default PaymentsSearch
