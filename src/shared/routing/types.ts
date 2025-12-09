export type RouteConfig = {
  path: string
  fullPath?: string
  getFullPath?: (...args: any[]) => string
  nested?: Record<string, RouteConfig>
  meta?: {
    nav?: boolean
    title?: string
    icon?: string
    order?: number
  }
}
