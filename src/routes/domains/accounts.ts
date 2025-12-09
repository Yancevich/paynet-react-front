export const accountRoutes = {
  accounts: {
    path: '/accounts',
    fullPath: '/accounts',
  },
  account: {
    path: '/accounts/:accountId',
    getFullPath: (accountId: string) => `/accounts/${accountId}`,
  },
} as const
