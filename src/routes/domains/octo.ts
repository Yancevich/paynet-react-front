export const octoRoutes = {
  octo: {
    redirect: {
      success: {
        path: '/octo/redirect/success/:paymentId',
        getFullPath: (paymentId: string) =>
          `/octo/redirect/success/${paymentId}`,
      },
      failed: {
        path: '/octo/redirect/failed/:paymentId',
        getFullPath: (paymentId: string) =>
          `/octo/redirect/failed/${paymentId}`,
      },
    },
  },
} as const
