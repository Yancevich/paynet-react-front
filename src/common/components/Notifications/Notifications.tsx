import React from 'react';
import { Alert, Title, Text, Button } from '@mantine/core';

import { useUi } from '@/contexts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './notifyBanner.module.css';

type VariantsType = 'positive' | 'negative' | 'warning' | 'info';

interface NotifyBannerProps {
  icon: React.ReactNode;
  variant?: VariantsType;
  title: string;
  text: string;
  primaryText?: string;
  secondaryText?: string;
  primaryAction?: () => void;
  secondaryAction?: () => void;
  children?: React.ReactNode;
}

export const Notifications = ({
  variant = 'positive',
  title,
  secondaryAction,
  primaryAction,
  primaryText,
  secondaryText,
  text,
  icon,
}: NotifyBannerProps) => {
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();
  return (
    <Alert
      w="100%"
      icon={icon}
      variant={variant}
      title={
        <Title order={2} size="lg">
          {title}
        </Title>
      }
    >
      <Text size="lg" c={rcc('regular-content.tetriary')}>
        {text}
      </Text>
      <div className={classes.notifyActions}>
        {secondaryAction && secondaryText ? (
          <Button
            size={isMobile ? 'sm' : 'md'}
            onClick={primaryAction}
            variant="secondary"
          >
            {secondaryText}
          </Button>
        ) : null}
        {primaryText && primaryAction ? (
          <Button
            size={isMobile ? 'sm' : 'md'}
            onClick={primaryAction}
            variant="primary"
          >
            {primaryText}
          </Button>
        ) : null}
      </div>
    </Alert>
  );
};
