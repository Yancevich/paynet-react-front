export const transferRoutes = {
  transfer: {
    path: '/transfer',
    getFullPath: (accountId: string) => `/transfer/${accountId}`,
    nested: {
      crypto: {
        path: 'crypto',
      },
    },
  },
  receive: {
    path: '/receive/:accountId',
    getFullPath: (accountId: string) => `/receive/${accountId}`,
    nested: {
      crypto: {
        path: 'crypto',
      },
      bankTransfer: {
        path: 'bank-transfer',
      },
    },
  },
  receiveBetweenAccounts: {
    path: '/transfer/between-accounts',
    fullPath: '/transfer/between-accounts',
    getFullPath: (fromAccountId: string, toAccountId: string) =>
      `/transfer/between-accounts?fromAccount=${fromAccountId}&toAccount=${toAccountId}`,
  },
} as const
