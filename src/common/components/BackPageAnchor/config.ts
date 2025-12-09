export type PageTitleConfig = {
  id: string;
  defaultMessage: string;
};

export const pageTitles: Record<string, PageTitleConfig> = {
  '/': {
    id: 'page.home.title',
    defaultMessage: 'Home',
  },
  '/accounts': {
    id: 'page.bank-accounts.title',
    defaultMessage: 'Bank Accounts',
  },
  '/cards': {
    id: 'page.cards.title',
    defaultMessage: 'My Cards',
  },
  '/card': {
    id: 'page.card.title',
    defaultMessage: 'Card Details',
  },
  '/crypto': {
    id: 'page.crypto.title',
    defaultMessage: 'Crypto',
  },
  '/history': {
    id: 'page.history.title',
    defaultMessage: 'History',
  },
  '/exchange': {
    id: 'page.exchange.title',
    defaultMessage: 'Exchange',
  },
  '/earn': {
    id: 'page.earn.title',
    defaultMessage: 'Earn',
  },
  '/tokens': {
    id: 'page.tokens.title',
    defaultMessage: 'Tokens',
  },
  '/trust': {
    id: 'page.trust.title',
    defaultMessage: 'Trust',
  },
  '/business': {
    id: 'page.business.title',
    defaultMessage: 'Business',
  },
  '/receive': {
    id: 'page.receive.title',
    defaultMessage: 'Receive',
  },
  '/transfer': {
    id: 'page.transfer.title',
    defaultMessage: 'Transfer',
  },
  '/settings': {
    id: 'page.settings.title',
    defaultMessage: 'Settings',
  },
};
