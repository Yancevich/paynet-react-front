export type RouteConfig = {
  path: string
  fullPath?: string
  getFullPath?: (...args: unknown[]) => string
  nested?: Record<string, RouteConfig>
  meta?: {
    nav?: boolean
    title?: string
    icon?: string
    order?: number
  }
}
