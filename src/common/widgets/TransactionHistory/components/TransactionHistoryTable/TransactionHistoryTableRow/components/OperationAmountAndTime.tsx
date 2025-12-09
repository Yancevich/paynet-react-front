import { Flex, Stack, Text } from '@mantine/core';

import { FormattedAmount } from '@/common/components/FormattedAmount';
import { useThemeColors } from '@/theme/useThemeColors.ts';

export interface OperationAmountAndTimeProps {
  amount: string;
  currency: string;
  type: 'positive' | 'negative';
  color?: 'positive' | 'regular';
  date?: string;
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const OperationAmountAndTime = ({
  amount,
  currency,
  date,
  color,
  type = 'positive',
}: OperationAmountAndTimeProps) => {
  const slug = currency.toLowerCase();
  const { rcc } = useThemeColors();
  const colorTextByType = type === 'positive' ? 'positive' : 'regular';
  const colorText = color ? color : colorTextByType;
  return (
    <Stack gap={2} align="flex-end">
      <Flex gap={8} align="center">
        <Text
          size="lg"
          c={
            colorText === 'positive'
              ? rcc('positive-content.primary')
              : rcc('regular-content.secondary')
          }
        >
          {type === 'positive' ? '+' : '-'}
          <FormattedAmount amount={amount} slug={slug} previewCalc />
        </Text>
      </Flex>

      <Text size="sm" c={rcc('regular-content.tetriary')}>
        {formatTime(date ?? '')}
      </Text>
    </Stack>
  );
};
