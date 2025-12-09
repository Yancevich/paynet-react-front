import { TooltipProps } from 'recharts';
import { Paper, Text } from '@mantine/core';

import { useThemeColors } from '@/theme/useThemeColors.ts';

import classnames from './customTooltip.module.css';

export const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  const { rcc } = useThemeColors();
  if (active && payload && payload.length) {
    return (
      <Paper classNames={classnames}>
        <Text size="md" c={rcc('regular-content.secondary')} fw={700}>
          {payload[0].value}
        </Text>
      </Paper>
    );
  }
  return null;
};
