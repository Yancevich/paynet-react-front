import { Box, Flex, Text } from '@mantine/core';

import { CurrencyIcon } from '@/common/components/CurrencyIcon';
import { FormattedAmount } from '@/common/components/FormattedAmount';

import classes from './currencyAmount.module.css';

interface CurrencyAmountProps {
  amount: string;
  slug: string;
  previewCalc?: boolean;
}

export const CurrencyAmount = ({
  amount,
  slug,
  previewCalc,
}: CurrencyAmountProps) => {
  return (
    <Box className={classes.container} w="100%">
      <Flex gap={12}>
        <CurrencyIcon slug={slug} size={20} />
        <Text size="md" fw={700}>
          <FormattedAmount
            amount={amount}
            slug={slug}
            previewCalc={previewCalc ?? undefined}
          />
        </Text>
      </Flex>
    </Box>
  );
};
