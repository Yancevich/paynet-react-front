export const settingsRoutes = {
  settings: {
    path: '/settings',
    fullPath: '/settings',
    nested: {
      profile: {
        path: 'profile',
        fullPath: '/settings/profile',
      },
      security: {
        path: 'security',
        fullPath: '/settings/security',
      },
      paymentMethods: {
        path: 'payment-methods',
        fullPath: '/settings/payment-methods',
      },
      notifications: {
        path: 'notifications',
        fullPath: '/settings/notifications',
      },
    },
  },
} as const
