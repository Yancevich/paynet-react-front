import type { FC, ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  actions?: ReactNode
}

const PageHeader: FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <header className="page__header header-page">
      <h1 className="header-page__page-name">{title}</h1>
      <div className="header-page__user-info user-info">
        {actions ?? null}
      </div>
    </header>
  )
}

export default PageHeader
