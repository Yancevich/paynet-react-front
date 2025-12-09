import type { FC } from 'react'

type ProviderHeaderProps = {
  providerImage: string
  providerTitle: string
  serviceTitle: string
}

const ProviderHeader: FC<ProviderHeaderProps> = ({
  providerImage,
  providerTitle,
  serviceTitle,
}) => (
  <div className="provider-modal__provider">
    <div className="provider-modal__logo">
      {providerImage ? (
        <img src={providerImage} alt={providerTitle} />
      ) : (
        <span>{providerTitle}</span>
      )}
    </div>
    <div>
      <div className="provider-modal__provider-name">{providerTitle}</div>
      <div className="provider-modal__provider-desc">
        {serviceTitle || 'Description'}
      </div>
    </div>
  </div>
)

export default ProviderHeader
