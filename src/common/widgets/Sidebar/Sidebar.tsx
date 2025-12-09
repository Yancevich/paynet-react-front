import React from 'react';
import { Flex, Stack } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router';

import { Logo } from '@/common/components/Logo/Logo.tsx';
import SidebarButton from '@/common/widgets/Sidebar/components/SidebarButton';
import { Icon } from '@/common/components/Icon';
import { ROUTES } from '@/routes';
import { useLinks } from '@/routes/useLinks';
import { useVerification } from '@/store/verification';
import { ZendeskWidget } from '@/common/widgets/ZendeskWidget';

import classes from './sidebar.module.css';

type SidebarProps = {
  openedByFooter: boolean;
  isCollapsed: boolean;
  toggle: () => void;
  closeSidebar: () => void;
  isMobile: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  toggle,
  isMobile,
  openedByFooter,
  closeSidebar,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isUiAllowed } = useVerification();
  const { appLinks } = useLinks();

  return (
    <Flex h="100%" direction="column" justify="space-between">
      <Stack gap={42}>
        <Flex align="center" justify="space-between">
          <Logo
            textHidden={isCollapsed}
            className={`${classes.sidebarLogo} ${isCollapsed && classes.collapsed}`}
          />
          {isMobile ? (
            <Icon name="close" width={20} height={20} onClick={closeSidebar} />
          ) : null}
        </Flex>
        <Stack>
          {appLinks.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
            const available = isUiAllowed || item.path === '/';

            const isCards =
              item.path === '/cards' &&
              (location.pathname.startsWith('/cards') ||
                location.pathname.startsWith('/add-new-card'));

            return (
              <SidebarButton
                key={item.path}
                isMobile={false}
                action={closeSidebar}
                isCollapsed={isCollapsed}
                navigateItem={item}
                active={isActive || isCards}
                data-opened={openedByFooter}
                soon={item.disabled}
                disabled={!available}
              />
            );
          })}
        </Stack>
      </Stack>

      <Stack>
        <ZendeskWidget isCollapsed={isCollapsed} closeSidebar={closeSidebar} />
        {!isMobile ? (
          <SidebarButton
            isMobile={false}
            isCollapsed={isCollapsed}
            navigateItem={{
              path: 'collapse',
              icon: isCollapsed ? 'chevrons-right' : 'chevrons-left',
              label: 'widget.sidebar.list.collapse',
              defaultMessage: 'Collapse',
            }}
            isButton
            action={toggle}
            active={false}
          />
        ) : null}

        <SidebarButton
          isMobile={false}
          isCollapsed={isCollapsed}
          action={() => {
            navigate(ROUTES.settings.fullPath);
            closeSidebar();
          }}
          navigateItem={{
            path: '/settings',
            icon: 'settings',
            label: 'widget.sidebar.list.settings',
            defaultMessage: 'Settings',
          }}
          active={location.pathname === '/settings'}
          data-opened={openedByFooter}
        />
      </Stack>
    </Flex>
  );
};
