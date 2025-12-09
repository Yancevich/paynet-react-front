import type { FC } from 'react'
import templateAddIcon from '@/assets/template-add.svg'
import templateImg from '@/assets/template-img.png'
import styles from './templates.module.css'

type TemplateCardProps = {
  label: string
  imageSrc?: string | null
  isAdd?: boolean
  onClick?: () => void
}

const TemplateCard: FC<TemplateCardProps> = ({ label, imageSrc, isAdd = false, onClick }) => {
  const resolvedImage = isAdd ? templateAddIcon : imageSrc || templateImg
  const imageAlt = isAdd ? '' : label
  const buttonClassName = `${styles.template}${isAdd ? ` ${styles['template--add']}` : ''}`

  return (
    <li className={styles.templates__item}>
      <button type="button" className={buttonClassName} onClick={onClick} aria-label={label}>
        <div className={styles.template__body}>
          <div className={styles.template__img}>
            <img src={resolvedImage} alt={imageAlt} loading="lazy" />
          </div>
          <h3 className={styles.template__label}>{label}</h3>
        </div>
      </button>
    </li>
  )
}

export default TemplateCard
