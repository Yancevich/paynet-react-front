import { Center, Flex, Paper, Stack, Text } from '@mantine/core';
import { useAtomValue } from 'jotai/index';
import { useMemo } from 'react';

import { PaymentSystemIcon } from '@/common/components/PaymentSystemIcon';
import { cardDetailsByIdAtom, cardInfoByIdAtom } from '@/store/cards';
import { accountBalanceByIdAtom } from '@/store/balances';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './currentCardFroTopUp.module.css';

interface CurrentCardForTopUpProps {
  cardId: string;
  currency: string;
}

export const CurrentCardForTopUp = ({
  cardId,
  currency,
}: CurrentCardForTopUpProps) => {
  const card = useAtomValue(cardDetailsByIdAtom(cardId));
  const cardInfo = useAtomValue(cardInfoByIdAtom(cardId));
  const { rcc } = useThemeColors();

  const accountBalance = useAtomValue(
    accountBalanceByIdAtom(cardInfo?.accountId)
  );

  const balance = useMemo(() => {
    return accountBalance?.balances.find(
      (balance) => balance.currency === currency
    );
  }, [currency, accountBalance]);

  if (!card) {
    return null;
  }

  return (
    <Paper className={classes.container}>
      <Flex
        justify="space-between"
        w="100%"
        align="center"
        style={{
          cursor: 'pointer',
        }}
      >
        <Flex gap={12}>
          <Center className={classes.iconContainer}>
            <PaymentSystemIcon paymentSystem="HUMO" size={20} />
          </Center>

          <Stack gap={4}>
            <Text size="md" fw={700}>
              {`${card.cardName?.toUpperCase() || ''} ${card.secondaryCardName?.toUpperCase() || ''}`}
            </Text>

            <Text size="sm" c={rcc('regular-content.tetriary')} fw={700}>
              •••• {card.last4}
            </Text>
          </Stack>
        </Flex>

        <Text size="md" fw={700}>
          <FormattedAmount amount={balance?.balance || '0'} slug={currency} />
        </Text>
      </Flex>
    </Paper>
  );
};
