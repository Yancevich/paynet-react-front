import type { FC } from 'react'
import { Skeleton } from '@mantine/core'
import styles from './templates.module.css'

const TemplatesSkeleton: FC = () => (
  <ul className={styles.templates__list}>
    {[0, 1, 2].map((item) => (
      <li key={item} className={styles.templates__item}>
        <Skeleton
          className={`${styles.template} ${styles['template--skeleton']}`}
          height="100%"
        />
      </li>
    ))}
  </ul>
)

export default TemplatesSkeleton
