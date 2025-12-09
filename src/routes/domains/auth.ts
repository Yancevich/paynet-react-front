export const authRoutes = {
  signIn: {
    path: '/sign-in',
    fullPath: '/sign-in',
  },
  signUp: {
    path: '/sign-up',
    fullPath: '/sign-up',
  },
  resetPassword: {
    path: '/reset-password',
    fullPath: '/reset-password',
  },
  twoFactorSetup: {
    path: '/2fa-setup',
    fullPath: '/2fa-setup',
  },
  twoFactorEnter: {
    path: '/2fa-enter',
    fullPath: '/2fa-enter',
  },
} as const
