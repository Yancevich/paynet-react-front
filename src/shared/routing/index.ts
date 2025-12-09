export { buildPath } from './buildPath'
export type { RouteConfig } from './types'

export type MenuItem = {
  key: string
  title: string
  path: string
  icon?: string
  order?: number
}

export const asMenuItems = (items: MenuItem[]) =>
  items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
