import type { FC } from 'react'
import type { Template } from '../../model/template'
import type { TemplateMessageKey } from '../../localization'
import '@/features/payment-flow/ui/paymentFlow.css'

type TemplatesModalProps = {
  isOpen: boolean
  title: string
  mode: 'add' | 'view'
  selectedTemplate: Template | null
  fields: [string, unknown][]
  messages: Record<TemplateMessageKey, string>
  onClose: () => void
}

const TemplatesModal: FC<TemplatesModalProps> = ({
  isOpen,
  title,
  mode,
  selectedTemplate,
  fields,
  messages,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className="provider-modal__overlay" onClick={onClose}>
      <div
        className="provider-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
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
            Back
          </button>

          <div className="provider-modal__title">{title}</div>

          <button
            className="provider-modal__close"
            type="button"
            onClick={onClose}
            aria-label="Close"
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
          {mode === 'add' ? (
            <p className="provider-modal__hint">{messages.addModalHint}</p>
          ) : (
            <>
              <p className="provider-modal__hint">{messages.savedFields}</p>
              <div className="provider-modal__response">
                {fields.length ? (
                  fields.map(([field, value]) => (
                    <div
                      key={`${selectedTemplate?.id}-${field}`}
                      className="provider-modal__response-row"
                    >
                      <span>{field}</span>
                      <span>
                        {typeof value === 'object'
                          ? JSON.stringify(value)
                          : String(value)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="provider-modal__hint">
                    {messages.noSavedFields}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TemplatesModal
