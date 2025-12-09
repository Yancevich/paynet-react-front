import type { RouteConfig } from './types'

/**
 * Resolves the best available path for a route entry.
 * Prefers route-specific builders and falls back to static paths.
 */
export const buildPath = (route: RouteConfig, ...args: unknown[]) => {
  if (typeof route.getFullPath === 'function') {
    return route.getFullPath(...args)
  }

  if (route.fullPath) {
    return route.fullPath
  }

  return route.path
}
