export const cardRoutes = {
  cards: {
    path: '/cards',
    fullPath: '/cards',
  },
  card: {
    path: '/card/:id',
    getFullPath: (id: string) => `/card/${id}`,
    nested: {
      topUp: {
        path: '/card/:id/top-up',
        getFullPath: (
          id: string,
          direction: 'from' | 'to',
          currency?: string
        ) =>
          `/card/${id}/top-up/?direction=${direction}${
            currency ? `&currency=${currency}` : ''
          }`,
      },
    },
  },
  addNewCard: {
    path: '/add-new-card',
    fullPath: '/add-new-card',
  },
} as const
