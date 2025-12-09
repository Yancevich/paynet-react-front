export const operationsRoutes = {
  crypto: {
    path: '/crypto',
    getFullPath: (operationType?: string) => {
      return operationType ? `/crypto/${operationType}` : '/crypto'
    },
  },
  earn: {
    path: '/earn',
    fullPath: '/earn',
  },
  exchange: {
    path: '/exchange',
    getFullPath: (from?: string, to?: string) => {
      const params = new URLSearchParams()

      if (from) {
        params.set('from', from)
      }

      if (to) {
        params.set('to', to)
      }

      const query = params.toString()
      return `/exchange${query ? `?${query}` : ''}`
    },
  },
  tokens: {
    path: '/tokens',
    fullPath: '/tokens',
  },
} as const
