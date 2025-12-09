import type { WheelEventHandler } from 'react'
import { useMemo, useState, useCallback } from 'react'
import { useAtomValue } from 'jotai'
import { useUserTemplates } from '../../hooks/useUserTemplates'
import { getTemplateMessages } from '../../localization'
import { mapTemplatesToCards, resolveTemplateTitle } from '../../lib/templatePresentation'
import type { Template, TemplateCard } from '../../model/template'
import TemplatesList from '../components/TemplatesList'
import TemplatesModal from '../components/TemplatesModal'
import TemplatesSkeleton from '../components/TemplatesSkeleton'
import styles from '../components/templates.module.css'
import { localeAtom } from '@/shared/state/uiAtoms'

const Templates = () => {
  const locale = useAtomValue(localeAtom)
  const messages = getTemplateMessages(locale)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'view'>('view')

  const {
    data: templates = [],
    isPending,
    isError,
  } = useUserTemplates()

  const cards: TemplateCard[] = useMemo(
    () => mapTemplatesToCards(templates, locale),
    [templates, locale]
  )

  const handleHorizontalWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.currentTarget.scrollLeft += event.deltaY
    }
  }

  const openAdd = useCallback(() => {
    setSelectedTemplate(null)
    setModalMode('add')
    setModalOpen(true)
  }, [])

  const openView = useCallback((template: Template) => {
    setSelectedTemplate(template)
    setModalMode('view')
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedTemplate(null)
    setModalOpen(false)
  }, [])

  const modalTitle =
    modalMode === 'add' ? messages.addTemplate : resolveTemplateTitle(selectedTemplate, locale)

  const renderContent = () => {
    if (isPending) {
      return <TemplatesSkeleton />
    }

    if (isError) {
      return <p className={styles.templates__helper}>{messages.loadingError}</p>
    }

    if (!cards.length) {
      return (
        <p className={`${styles.templates__helper} ${styles['templates__helper--muted']}`}>
          {messages.emptyNoOperations}
        </p>
      )
    }

    return (
      <TemplatesList
        cards={cards}
        showAddCard
        addLabel={messages.addTemplate}
        onAdd={openAdd}
        onSelect={openView}
      />
    )
  }

  return (
    <section className={`page__templates ${styles.templates}`}>
      <h2 className={styles.templates__label}>{messages.title}</h2>

      <div className={styles.templates__content} onWheel={handleHorizontalWheel}>
        {renderContent()}
      </div>

      <TemplatesModal
        isOpen={isModalOpen}
        title={modalTitle}
        mode={modalMode}
        selectedTemplate={selectedTemplate}
        fields={Object.entries(selectedTemplate?.templateData ?? {})}
        messages={messages}
        onClose={closeModal}
      />
    </section>
  )
}

export default Templates
