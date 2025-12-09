import { Outlet } from 'react-router'
import { useAtom } from 'jotai'

import DevPanel from '@/layout/DevPanel/DevPanel'
import Sidebar from '@/layout/Sidebar/Sidebar'
import { sidebarCollapsedAtom } from '@/shared/state/uiAtoms'

/**
 * App shell layout: renders dev tools, sidebar, and a slot for page content.
 */
export const RootLayout = () => {
  const [isCollapsed, setIsCollapsed] = useAtom(sidebarCollapsedAtom)

  return (
    <div className={`wrapper ${isCollapsed ? 'collapsed' : ''}`}>
      <DevPanel />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Outlet />
    </div>
  )
}
