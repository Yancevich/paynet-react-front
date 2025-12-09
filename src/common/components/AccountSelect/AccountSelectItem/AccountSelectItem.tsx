import { Flex, Title, Stack, Badge, Radio } from '@mantine/core';
import { useAtomValue } from 'jotai';

import { FormattedAmount } from '@/common/components/FormattedAmount';
import { baseCurrencyAtom } from '@/store/currencies';
import { useUi } from '@/contexts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './AccountSelectItem.module.css';

interface SelectAccountItemProps {
  accountId: string;
  title: string;
  accountType: string;
  amount: string;
  handleAccountSelect: (id: string) => void;
  selected: boolean;
}

export const AccountSelectItem = ({
  accountId,
  title,
  amount,
  accountType,
  handleAccountSelect,
  selected,
}: SelectAccountItemProps) => {
  const baseCurrency = useAtomValue(baseCurrencyAtom);
  const { isAccountBalanceHidden } = useUi();
  const { rcc } = useThemeColors();

  const isCrypto = accountType === 'CHECKING';

  const shortTitle =
    title.length > 8 ? `${title?.slice(0, 6)}...${title?.slice(-6)}` : title;

  return (
    <Flex
      justify="space-between"
      align="center"
      onClick={() => handleAccountSelect(accountId)}
    >
      <Title
        order={3}
        size="md"
        classNames={{ root: classes.title }}
        c={rcc('regular-content.primary')}
      >
        {shortTitle}
      </Title>

      <Flex gap={16} align="center">
        <Stack gap={4} align="flex-end">
          <Title
            order={3}
            size="md"
            c={rcc('regular-content.primary')}
            data-hidden={isAccountBalanceHidden}
          >
            <FormattedAmount
              amount={amount}
              slug={baseCurrency?.slug || 'usd'}
            />
          </Title>

          <Badge
            size="sm"
            variant={isCrypto ? 'clear' : 'positive'}
            tt="none"
            fw={500}
          >
            {isCrypto ? 'Crypto' : 'Card'}
          </Badge>
        </Stack>
        <Radio size="md" defaultChecked={selected} />
      </Flex>
    </Flex>
  );
};
