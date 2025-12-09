import React from 'react';
import {
  Switch,
  useMantineTheme,
  rem,
  useMantineColorScheme,
} from '@mantine/core';

import { Icon } from '@/common/components/Icon';

export const SwitchTheme: React.FC = () => {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const onClickHandler = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  const iconColor = theme.colors['inversion-content'][1];
  const sunIcon = (
    <Icon
      name="sun"
      style={{ width: rem(16), height: rem(16) }}
      color={iconColor}
    />
  );

  const moonIcon = (
    <Icon
      name="moon"
      style={{ width: rem(16), height: rem(16) }}
      color={iconColor}
    />
  );
  return (
    <Switch
      onClick={onClickHandler}
      size="md"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
    />
  );
};
