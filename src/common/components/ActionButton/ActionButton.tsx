import { ActionIcon, ActionIconProps, Stack, Text } from '@mantine/core';
import { FC, ReactNode } from 'react';

import classes from './actionButton.module.css';

type ActionButtonProps = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'squared' | 'rounded';
} & Omit<ActionIconProps, 'variant'>;

export const ActionButton = ({
  icon,
  label,
  onClick,
  variant = 'squared',
  ...props
}: ActionButtonProps) => {
  const buttonVariantMap: Record<
    NonNullable<ActionButtonProps['variant']>,
    ReturnType<FC>
  > = {
    squared: (
      <Stack
        styles={{ root: { cursor: 'pointer' } }}
        gap={8}
        align="center"
        w={90}
        onClick={onClick}
      >
        <ActionIcon size={40} radius={12} {...props}>
          {icon}
        </ActionIcon>
        <Text classNames={{ root: classes.text }} size="md">
          {label}
        </Text>
      </Stack>
    ),
    rounded: (
      <Stack
        styles={{ root: { cursor: 'pointer' } }}
        gap={8}
        align="center"
        w={111}
        onClick={onClick}
      >
        <ActionIcon size={44} radius="50%" {...props}>
          {icon}
        </ActionIcon>
        <Text classNames={{ root: classes.text }} size="md">
          {label}
        </Text>
      </Stack>
    ),
  };

  return buttonVariantMap[variant];
};
