import React from 'react';
import { Anchor, Flex, Title } from '@mantine/core';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useIntl } from 'react-intl';

import {
  PageTitleConfig,
  pageTitles,
} from '@/common/components/BackPageAnchor/config';
import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';
import { useUi } from '@/contexts';

const usePageTitle = () => {
  const location = useLocation();
  const intl = useIntl();

  const findPageTitleConfig = (pathname: string): PageTitleConfig => {
    const paths = pathname.split('/').filter(Boolean);
    let currentPath = '';
    let matchedConfig = pageTitles['/'];

    for (let i = 0; i < paths.length; i++) {
      currentPath += `/${paths[i]}`;
      if (pageTitles[currentPath]) {
        matchedConfig = pageTitles[currentPath];
      }
    }

    return matchedConfig;
  };

  const pageTitleConfig = findPageTitleConfig(location.pathname);

  return intl.formatMessage({
    id: pageTitleConfig.id,
    defaultMessage: pageTitleConfig.defaultMessage,
  });
};

export const BackPageAnchor: React.FC = () => {
  const navigate = useNavigate();
  const { rcc } = useThemeColors();
  const { pathname } = useLocation();
  const title = usePageTitle();
  const { isMobile } = useUi();
  const { accountId } = useParams();

  if (pathname === '/add-new-card') {
    return null;
  }

  const baseRoutes = [
    '/accounts',
    '/crypto',
    '/crypto/buy',
    '/crypto/sell',
    '/history',
    '/exchange',
    '/settings',
    '/cards',
  ];

  const onClickNavigation = () => {
    if (pathname.startsWith('/card/')) {
      navigate('/cards');
      return;
    }

    if (pathname.startsWith('/transfer/between-accounts')) {
      navigate('/accounts');
      return;
    }

    if (pathname.startsWith('/accounts/')) {
      navigate('/accounts');
      return;
    }

    if (pathname.startsWith('/settings/')) {
      navigate('/');
      return;
    }

    if (baseRoutes.includes(pathname)) {
      navigate('/');
      return;
    }

    if (accountId) {
      navigate(`/accounts/${accountId}`);
    }
  };

  const isHomePath = pathname === '/';

  return (
    <Anchor
      fw={700}
      size="md"
      c={rcc('regular-content.primary')}
      onClick={onClickNavigation}
    >
      <Flex align="center" gap={12}>
        {!isHomePath ? <Icon name="chevron-left" /> : null}
        <Title size={isMobile ? 'lg' : 'xl'}>{title}</Title>
      </Flex>
    </Anchor>
  );
};
