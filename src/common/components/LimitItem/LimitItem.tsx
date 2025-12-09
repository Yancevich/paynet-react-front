import { Flex, Progress, Stack, Text, Title } from '@mantine/core';

import { FormattedAmount } from '@/common/components/FormattedAmount';
import { useThemeColors } from '@/theme/useThemeColors.ts';
import styles from './styles.module.css';

interface LimitItemProps {
  maxLimit?: number;
  title: string;
  currentValue?: number;
  currency?: string;
}
export const LimitItem = ({
  maxLimit,
  currentValue,
  title,
  currency,
}: LimitItemProps) => {
  const { rcc } = useThemeColors();
  const isMaxLimitInfinite = maxLimit === null;
  const percentage = isMaxLimitInfinite
    ? Infinity
    : currentValue !== undefined && maxLimit
      ? (+currentValue / +maxLimit) * 100
      : 0;

  return (
    <Stack gap={12}>
      <Flex justify="space-between" align="center">
        <Title size="lg" order={2} c={rcc('regular-content.primary')}>
          {title}
        </Title>
        <Title size="lg" order={2} c={rcc('positive-content.primary')}>
          {!isMaxLimitInfinite ? `${percentage.toFixed(2)}%` : null}
        </Title>
      </Flex>
      <Flex justify="space-between" align="center" gap={8} wrap="wrap">
        <Progress
          value={isMaxLimitInfinite ? 100 : percentage}
          miw={120}
          size="md"
          flex="1 0 auto"
        />
        <Flex gap={4} align="center">
          <Text
            size="lg"
            c={rcc('regular-content.primary')}
            fw={500}
            className={styles['no-wrap-amount']}
          >
            <FormattedAmount
              amount={currentValue?.toString() ?? '0'}
              slug={currency ?? 'usd'}
            />
          </Text>
          <Text size="md" c={rcc('regular-content.tetriary')}>
            /
          </Text>
          <Text
            size="md"
            c={rcc('regular-content.tetriary')}
            fw={500}
            className={styles['no-wrap-amount']}
          >
            {isMaxLimitInfinite ? (
              '∞'
            ) : (
              <FormattedAmount
                amount={maxLimit?.toString() ?? '0'}
                slug={currency ?? 'usd'}
              />
            )}
          </Text>
        </Flex>
      </Flex>
    </Stack>
  );
};
