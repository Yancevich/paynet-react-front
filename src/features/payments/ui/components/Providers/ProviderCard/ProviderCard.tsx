import type { Provider } from '@/features/payments/model/provider'
import type { LocaleCode } from '@/shared/state/uiAtoms'
import { getMessage, getTitle } from '../localization'
import './ProviderCard.css'

type ProviderCardProps = {
  provider: Provider
  locale: LocaleCode
  colorScheme: 'light' | 'dark' | 'auto'
  onClick: (provider: Provider) => void
}

const ProviderCard = ({
  provider,
  locale,
  colorScheme,
  onClick,
}: ProviderCardProps) => {
  const imgUrl =
    colorScheme === 'dark'
      ? provider.images?.customDark ??
        provider.images?.customLight ??
        provider.images.vendorImageUrl
      : provider.images?.customLight ??
        provider.images?.customDark ??
        provider.images.vendorImageUrl

  const title =
    getTitle(provider.title, locale) || getMessage(locale, 'fallbackTitle')

  const handleActivate = () => onClick(provider)

  return (
    <button
      type="button"
      className="provider"
      aria-label={title}
      onClick={handleActivate}
    >
      <div className="provider__logo">
        {imgUrl ? (
          <img src={imgUrl} alt={title} loading="lazy" />
        ) : (
          <span className="provider__placeholder">{title}</span>
        )}
      </div>
    </button>
  )
}

export default ProviderCard
