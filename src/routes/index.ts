import { baseRoutes } from './domains/base'
import { authRoutes } from './domains/auth'
import { accountRoutes } from './domains/accounts'
import { cardRoutes } from './domains/cards'
import { paymentsRoutes } from './domains/payments'
import { operationsRoutes } from './domains/operations'
import { historyRoutes } from './domains/history'
import { settingsRoutes } from './domains/settings'
import { transferRoutes } from './domains/transfers'
import { octoRoutes } from './domains/octo'
import { kybRoutes } from './domains/kyb'
import { buildPath } from '@/shared/routing/buildPath'
import type { RouteConfig } from '@/shared/routing/types'

export const routes = {
  ...baseRoutes,
  ...authRoutes,
  ...accountRoutes,
  ...cardRoutes,
  ...paymentsRoutes,
  ...operationsRoutes,
  ...historyRoutes,
  ...settingsRoutes,
  ...transferRoutes,
  ...octoRoutes,
  ...kybRoutes,
} as const

// Backward compatible alias
export const ROUTES = routes

export type AppRouteKey = keyof typeof routes

export const createPath = (key: AppRouteKey, ...args: unknown[]) =>
  buildPath(routes[key] as unknown as RouteConfig, ...args)

export const navigationRoutes = [
  { key: 'index', title: 'Home', path: routes.index.path },
  { key: 'cards', title: 'Crypto Cards', path: routes.cards.path },
  { key: 'history', title: 'History', path: routes.history.path },
  { key: 'exchange', title: 'Exchange', path: routes.exchange.path },
  { key: 'crypto', title: 'Buy & sell crypto', path: routes.crypto.path },
  { key: 'payments', title: 'Payments', path: routes.payments.path },
  { key: 'business', title: 'Business', path: routes.business.path },
  { key: 'settings', title: 'Settings', path: routes.settings.path },
] as const
