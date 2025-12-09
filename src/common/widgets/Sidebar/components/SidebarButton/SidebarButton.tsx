import {
  Badge,
  Center,
  NavLink as MantineNavLink,
  NavLinkProps,
  Tooltip,
} from '@mantine/core';
import { NavLink } from 'react-router';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { IconName } from '@/assets/icons';
import { useThemeColors } from '@/theme/useThemeColors.ts';

type TNavigateItem = {
  defaultMessage: string;
  label: string;
  icon: IconName;
  path: string;
  shortLabel?: string;
};

type SidebarButtonProps = {
  isButton?: boolean;
  action?: () => void;
  isCollapsed: boolean;
  navigateItem: TNavigateItem;
  isMobile: boolean;
  soon?: boolean;
} & NavLinkProps;

export const SidebarButton = ({
  isCollapsed,
  navigateItem,
  isMobile,
  isButton = false,
  action,
  active,
  disabled,
  soon,
  ...props
}: SidebarButtonProps) => {
  const { formatMessage } = useIntl();
  const { icon, path, label, defaultMessage, shortLabel } = navigateItem;

  const commonProps = {
    styles: {
      label: {
        width: isCollapsed ? 0 : 'auto',
      },
      section: {
        marginRight: isMobile || isCollapsed ? 0 : 8,
      },
    },
    leftSection: !isCollapsed ? (
      <Icon name={icon} width={20} height={20} color="currentColor" />
    ) : undefined,
    rightSection:
      !isCollapsed && soon && !isMobile ? (
        <Badge variant="accent">Soon</Badge>
      ) : undefined,
    label: !isCollapsed ? (
      formatMessage({
        id: shortLabel && isMobile ? shortLabel : label,
        defaultMessage: defaultMessage,
      })
    ) : (
      <Center>
        <Icon name={icon} width={20} height={20} color="currentColor" />
      </Center>
    ),
    p: isMobile ? 0 : isCollapsed ? 12 : '12px 16px',
    ...props,
  };

  return isButton ? (
    <MantineNavLink
      component="button"
      onClick={action}
      data-mobile={isMobile}
      active={active}
      disabled={disabled}
      {...commonProps}
    />
  ) : (
    <ConditionalTooltip isCollapsed={isCollapsed} disabled={soon ?? false}>
      <MantineNavLink
        component={NavLink}
        to={path}
        onClick={action}
        active={active}
        data-mobile={isMobile}
        disabled={disabled || soon}
        {...commonProps}
      />
    </ConditionalTooltip>
  );
};

interface ConditionalTooltipProps {
  children: ReactNode;
  isCollapsed: boolean;
  disabled: boolean;
}

const ConditionalTooltip = ({
  children,
  isCollapsed,
  disabled,
}: ConditionalTooltipProps) => {
  const { formatMessage } = useIntl();
  const { rbgc, rcc } = useThemeColors();

  if (!isCollapsed || !disabled) return children;

  return (
    <Tooltip
      label={formatMessage({
        id: 'component.conditional_tooltip.soon',
        defaultMessage: 'soon',
      })}
      position="right"
      bg={rbgc('regular-background.bg-4')}
      c={rcc('regular-content.secondary')}
      withArrow
    >
      <div>{children}</div>
    </Tooltip>
  );
};
