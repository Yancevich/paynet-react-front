import { RouteObject } from 'react-router';

import { ROUTES } from '@/routes/index';
import { Lazy } from '@/utils/lazyElement';
import KYBLayout from '@/layout/KYBLayout';
import AuthLayout from '@/layout/AuthLayout/AuthLayout';
import { AppLayout } from '@/layout/AppLayout';
import { UserType } from '@/api/registration/types';
import {
  VerificationGuard,
  VerificationGuardProps,
} from '@/routes/guards/VerificationGuard';
import { PrivateGuard, PrivateGuardProps } from '@/routes/guards/PrivateGuard';
import { AuthGuard, AuthGuardProps } from '@/routes/guards/AuthGuard';
import {
  UserTypeGuard,
  UserTypeGuardProps,
} from '@/routes/guards/UserTypeGuard';
import { Kyb } from '@/pages/Kyb';
import { SignInPage } from '@/pages/SignIn';
import { SignUpPage } from '@/pages/SignUp';
import { ResetPassword } from '@/pages/ResetPassword';
import { Palette } from '@/pages/Palette';
import { CryptoAddress } from '@/pages/Transfer/nested/CryptoAddress/CryptoAddress';
import { Receive } from '@/pages/Receive';
import { ReceiveToCryptoAddress } from '@/pages/Receive/nested/ReceiveToCryptoAddress';
import { ReceiveViaBankTransfer } from '@/pages/Receive/nested/ReceiveViaBankTransfer';
import { Page404 } from '@/pages/Page404';
import { PaymentDetails } from '@/pages/Redirect/PaymentDetails';
import { ErrorPage } from '@/pages/Error';
import { Cards } from '@/pages/Cards';
import Card from '@/pages/Card';
import { AddNewCard } from '@/pages/AddNewCard';
import Notifications from '@/pages/Settings/nested/Notifications';
import { TwoFactorSetupPage } from '@/pages/TwoFactorSetupPage/TwoFactorSetupPage.tsx';
import TwoFactorEnterPage from '@/pages/TwoFactorEnterPage';
import { CardTopUpPage } from '@/pages/CardTopUp';
import { Home } from '@/pages/Home';
import { BuySellCrypto } from '@/pages/BuySellCrypto';
import Accounts from '@/pages/Accounts';
import Account from '@/pages/Account';
import { Exchange } from '@/pages/Exchange';
import { Profile } from '@/pages/Settings/nested/Profile';
import { Security } from '@/pages/Settings/nested/Security';
import { History } from '@/pages/History';
import { Transfer } from '@/pages/Transfer';
import { PaymentMethodsPage } from '@/pages/Settings/nested/PaymentMethods';
import { ReceiveBetweenAccounts } from '@/pages/Receive/nested/ReceiveBetweenAccounts';

import {
  CardIssuingGuard,
  CardIssuingGuardProps,
} from './guards/CardIssuingGuard';

const Settings = () =>
  import('@/pages/Settings').then((module) => ({ default: module.Settings }));

export const GUARD = {
  AuthGuard: 'AuthGuard',
  PrivateGuard: 'PrivateGuard',
  VerificationGuard: 'VerificationGuard',
  UserTypeGuard: 'UserTypeGuard',
  CardIssuingGuard: 'CardIssuingGuard',
} as const;

export const guardsMap = {
  [GUARD.AuthGuard]: AuthGuard,
  [GUARD.PrivateGuard]: PrivateGuard,
  [GUARD.VerificationGuard]: VerificationGuard,
  [GUARD.UserTypeGuard]: UserTypeGuard,
  [GUARD.CardIssuingGuard]: CardIssuingGuard,
};

export type Guard = (typeof GUARD)[keyof typeof GUARD];

type GuardsPropsMap = {
  [GUARD.AuthGuard]: Omit<AuthGuardProps, 'children'>;
  [GUARD.PrivateGuard]: Omit<PrivateGuardProps, 'children'>;
  [GUARD.VerificationGuard]: Omit<VerificationGuardProps, 'children'>;
  [GUARD.UserTypeGuard]: Omit<UserTypeGuardProps, 'children'>;
  [GUARD.CardIssuingGuard]: Omit<CardIssuingGuardProps, 'children'>;
};

export type GuardsProps = Partial<GuardsPropsMap>;

export type EnhancedRouteObject = Omit<RouteObject, 'children'> & {
  guards?: Guard[];
  guardsProps?: GuardsProps;
  children?: EnhancedRouteObject[];
};

export const routesConfig: EnhancedRouteObject[] = [
  {
    element: <KYBLayout />,
    guards: [GUARD.PrivateGuard, GUARD.UserTypeGuard],
    guardsProps: { UserTypeGuard: { userTypes: [UserType.BUSINESS] } },
    children: [{ path: ROUTES.kyb.path, element: <Kyb /> }],
  },

  {
    element: <AuthLayout />,
    guards: [GUARD.AuthGuard],
    children: [
      { path: ROUTES.signIn.path, element: <SignInPage /> },
      { path: ROUTES.signUp.path, element: <SignUpPage /> },
      { path: ROUTES.resetPassword.path, element: <ResetPassword /> },
      { path: ROUTES.twoFactorSetup.path, element: <TwoFactorSetupPage /> },
      { path: ROUTES.twoFactorEnter.path, element: <TwoFactorEnterPage /> },
    ],
  },

  {
    element: <AppLayout />,
    guards: [GUARD.PrivateGuard, GUARD.VerificationGuard],
    children: [
      { path: ROUTES.index.path, element: <Home /> },
      {
        path: ROUTES.crypto.path,
        element: <BuySellCrypto />,
        guards: [GUARD.UserTypeGuard],
        guardsProps: { UserTypeGuard: { userTypes: [UserType.CUSTOMER] } },
      },
      {
        path: `${ROUTES.crypto.path}/:operationType`,
        element: <BuySellCrypto />,
        guards: [GUARD.UserTypeGuard],
        guardsProps: { UserTypeGuard: { userTypes: [UserType.CUSTOMER] } },
      },
      { path: ROUTES.history.path, element: <History /> },
      { path: ROUTES.accounts.path, element: <Accounts /> },
      { path: `${ROUTES.accounts.path}/:accountId`, element: <Account /> },

      {
        path: ROUTES.settings.path,
        element: <Lazy component={Settings} />,
        children: [
          { index: true, element: <Profile /> },
          { path: ROUTES.settings.nested.security.path, element: <Security /> },
          {
            path: ROUTES.settings.nested.paymentMethods.path,
            element: <PaymentMethodsPage />,
            guards: [GUARD.UserTypeGuard],
            guardsProps: { UserTypeGuard: { userTypes: [UserType.CUSTOMER] } },
          },
          {
            path: ROUTES.settings.nested.notifications.path,
            element: <Notifications />,
          },
        ],
      },

      { path: ROUTES.exchange.path, element: <Exchange /> },
      {
        path: `${ROUTES.transfer.path}/:accountId`,
        element: <Transfer />,
        children: [
          {
            path: 'crypto',
            element: <CryptoAddress />,
          },
        ],
      },

      { path: ROUTES.octo.redirect.success.path, element: <PaymentDetails /> },
      { path: ROUTES.octo.redirect.failed.path, element: <PaymentDetails /> },

      {
        path: ROUTES.receive.path,
        element: <Receive />,
        children: [
          {
            path: ROUTES.receive.nested.crypto.path,
            element: <ReceiveToCryptoAddress />,
          },
          {
            path: ROUTES.receive.nested.bankTransfer.path,
            element: <ReceiveViaBankTransfer />,
          },
        ],
      },
      {
        path: ROUTES.receiveBetweenAccounts.path,
        element: <ReceiveBetweenAccounts />,
      },

      {
        path: ROUTES.cards.path,
        element: <Cards />,
        guards: [GUARD.UserTypeGuard],
        guardsProps: { UserTypeGuard: { userTypes: [UserType.CUSTOMER] } },
      },
      { path: ROUTES.card.nested.topUp.path, element: <CardTopUpPage /> },
      { path: ROUTES.card.path, element: <Card /> },
      {
        path: ROUTES.addNewCard.path,
        element: <AddNewCard />,
        guards: [GUARD.CardIssuingGuard],
      },

      { path: '*', element: <Page404 /> },
    ],
  },

  { path: ROUTES.error.path, element: <ErrorPage /> },
  { path: ROUTES.palette.path, element: <Palette /> },
];
