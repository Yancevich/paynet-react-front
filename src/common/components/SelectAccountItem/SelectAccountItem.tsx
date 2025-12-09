import { Flex, Title, Stack, Badge, Radio } from '@mantine/core';

import classes from './selectAccountItem.module.css';

type AccountType = {
  accountId: string;
  accountType: string;
  amount: string;
  shortName: string;
};

interface SelectAccountItemProps {
  account: AccountType;
  defaultChecked: boolean;
  onNavigate?: (id: string) => void;
}

export const SelectAccountItem = ({
  account,
  defaultChecked,
  onNavigate,
}: SelectAccountItemProps) => {
  const { accountId, accountType, amount, shortName } = account;
  const isFiat = accountType === 'fiat';

  const onClickHandler = () => {
    if (onNavigate) {
      onNavigate(accountId);
    }
  };

  return (
    <Flex justify="space-between" align="center" onClick={onClickHandler}>
      <Title order={4} size="sm" classNames={{ root: classes.title }}>
        {shortName}
      </Title>
      <Flex gap={16} align="center">
        <Stack gap={2}>
          <Title order={4} size="sm">
            ${amount}
          </Title>
          <Badge size="sm" variant={isFiat ? 'positive' : 'warning'}>
            {isFiat ? 'Card' : 'Crypto'}
          </Badge>
        </Stack>
        <Radio size="md" defaultChecked={defaultChecked} />
      </Flex>
    </Flex>
  );
};
