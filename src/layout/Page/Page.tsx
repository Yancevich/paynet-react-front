import type { FC, ReactNode } from 'react'

import PageHeader from '@/layout/Page/PageHeader'
import './Page.css'

type PageProps = {
  title: string
  children: ReactNode
  actions?: ReactNode
}

const Page: FC<PageProps> = ({ title, children, actions }) => {
  return (
    <div className="page">
      <PageHeader title={title} actions={actions} />
      <main className="page__main">{children}</main>
    </div>
  )
}

export default Page
