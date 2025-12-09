import { Navigate, Route, Routes } from 'react-router'

import { RootLayout } from '@/app/layouts/root/RootLayout'
import Bussines from '@/pages/Bussines'
import BuySell from '@/pages/BuySell'
import CryptoCards from '@/pages/CryptoCards'
import Exchange from '@/pages/Exchange'
import History from '@/pages/History'
import Home from '@/pages/Home'
import Payments from '@/pages/Payments'
import Settings from '@/pages/Settings'
import { routes } from '@/routes'

export const RootRouter = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={routes.index.path} element={<Home />} />
        <Route path={routes.cards.path} element={<CryptoCards />} />
        <Route path={routes.history.path} element={<History />} />
        <Route path={routes.exchange.path} element={<Exchange />} />
        <Route path={routes.crypto.path} element={<BuySell />} />
        <Route path={routes.payments.path} element={<Payments />} />
        <Route path={routes.business.path} element={<Bussines />} />
        <Route path={routes.settings.path} element={<Settings />} />
        <Route path="*" element={<Navigate to={routes.index.path} replace />} />
      </Route>
    </Routes>
  )
}
