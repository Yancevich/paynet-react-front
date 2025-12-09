import { Flex, Stack, Title, Text } from '@mantine/core';

import { FormattedAmount } from '@/common/components/FormattedAmount';
import { Currency } from '@/api/currency';
import { CurrencyIcon } from '@/common/components/CurrencyIcon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface CurrencySelectItemProps {
  currency: Currency;
  handleCurrencySelect: (currency: Currency) => void;
  balance?: string;
}

export const CurrencySelectItem = ({
  currency,
  balance,
  handleCurrencySelect,
}: CurrencySelectItemProps) => {
  const { rcc } = useThemeColors();
  return (
    <Flex
      justify="space-between"
      align="center"
      onClick={() => handleCurrencySelect(currency)}
      style={{ cursor: 'pointer' }}
    >
      <Flex gap={12} align="center">
        {currency.slug && <CurrencyIcon slug={currency.slug} size={28} />}

        <Stack gap={2}>
          <Title order={3} size="md">
            {currency?.shortName}
          </Title>
          <Text size="md" c={rcc('regular-content.tetriary')}>
            {currency?.description}
          </Text>
        </Stack>
      </Flex>

      <Flex align="center" gap={16}>
        {balance && currency.slug && (
          <Title order={3} size="md" c={rcc('regular-content.primary')}>
            <FormattedAmount amount={balance} slug={currency.slug} hideSymbol />
          </Title>
        )}
      </Flex>
    </Flex>
  );
};
