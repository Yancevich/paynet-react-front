import { UserType } from '@/api/registration/types';
import { IconName } from '@/assets/icons';
import { ROUTES } from '@/routes/index';

type RouterLink = {
  label: string;
  shortLabel?: string;
  defaultMessage: string;
  icon: IconName;
  path: string;
  disabled?: boolean;
  roles: UserType[];
  showInMobileMenu?: boolean;
  scopes: string[];
};

export const routerLinks: RouterLink[] = [
  {
    label: 'widget.sidebar.list.home',
    defaultMessage: 'Home',
    icon: 'home',
    path: ROUTES.index.path,
    roles: [UserType.CUSTOMER, UserType.BUSINESS],
    showInMobileMenu: true,
    scopes: [],
  },
  {
    label: 'widget.sidebar.list.accounts',
    defaultMessage: 'Accounts',
    icon: 'wallet',
    path: ROUTES.accounts.path,
    roles: [UserType.CUSTOMER, UserType.BUSINESS],
    showInMobileMenu: true,
    scopes: [],
  },
  {
    label: 'widget.sidebar.list.crypto_cards',
    shortLabel: 'widget.sidebar.list.crypto_cards_short',
    defaultMessage: 'Crypto Cards',
    icon: 'card',
    path: ROUTES.cards.path,
    roles: [UserType.CUSTOMER],
    showInMobileMenu: true,
    scopes: ['cardholder_user:read'],
  },
  {
    label: 'widget.sidebar.list.buy_sell_crypto',
    defaultMessage: 'Buy/Sell Crypto',
    shortLabel: 'widget.sidebar.list.buy_sell_crypto_short',
    icon: 'bitcoin',
    path: ROUTES.crypto.path,
    roles: [UserType.CUSTOMER],
    showInMobileMenu: true,
    scopes: [],
  },
  {
    label: 'widget.sidebar.list.history',
    defaultMessage: 'History',
    icon: 'book',
    path: ROUTES.history.path,
    roles: [UserType.CUSTOMER, UserType.BUSINESS],
    scopes: [],
  },
  {
    label: 'widget.sidebar.list.exchange',
    defaultMessage: 'Exchange',
    icon: 'exchange',
    path: ROUTES.exchange.path,
    roles: [UserType.CUSTOMER, UserType.BUSINESS],
    scopes: [],
  },

  // {
  //   label: 'widget.sidebar.list.asterium_trade',
  //   defaultMessage: 'Asterium Pro',
  //   icon: 'area-chart',
  //   path: 'https://webtest2.scalablesolutions.io/btc-to-usdt',
  // },
];
