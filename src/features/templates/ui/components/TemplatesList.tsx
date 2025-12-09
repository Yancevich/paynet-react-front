import type { FC } from 'react'
import type { TemplateCard } from '../../model/template'
import TemplateCardComponent from './TemplateCard'
import styles from './templates.module.css'

type TemplatesListProps = {
  cards: TemplateCard[]
  showAddCard: boolean
  addLabel: string
  onAdd: () => void
  onSelect: (template: TemplateCard['template']) => void
}

const TemplatesList: FC<TemplatesListProps> = ({
  cards,
  showAddCard,
  addLabel,
  onAdd,
  onSelect,
}) => (
  <ul className={styles.templates__list}>
    {showAddCard && (
      <TemplateCardComponent isAdd label={addLabel} onClick={onAdd} />
    )}

    {cards.map(({ id, label, imageSrc, template }) => (
      <TemplateCardComponent
        key={id}
        label={label}
        imageSrc={imageSrc}
        onClick={() => onSelect(template)}
      />
    ))}
  </ul>
)

export default TemplatesList
