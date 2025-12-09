import { Menu, UnstyledButton } from '@mantine/core';
import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router';

import { accountBalanceByIdAtom } from '@/store/balances';
import { CurrentAccount } from '@/common/components/CurrentAccount';
import { SelectAccountItem } from '@/common/components/SelectAccountItem';
import { accountBalancesAtom } from '@/store/balances';

export const SelectAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accountList] = useAtom(accountBalancesAtom);
  const [account] = useAtom(accountBalanceByIdAtom(id));

  const onNavigateHandler = async (id: string) => {
    await navigate(`/bank-accounts/${id}`);
  };

  return (
    <Menu radius="md" width="target" withinPortal position="bottom-start">
      <Menu.Target>
        <UnstyledButton style={{ cursor: 'pointer' }}>
          <CurrentAccount />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown
        style={{ overflow: 'auto' }}
        mih={50}
        mah={200}
        maw={300}
        miw={300}
      >
        {accountList.map((acc) => {
          return (
            <Menu.Item key={acc.accountId}>
              <SelectAccountItem
                account={{
                  accountId: acc.accountId,
                  amount: acc.totalBalance,
                  shortName: acc.shortName,
                  accountType: acc.accountType,
                }}
                onNavigate={onNavigateHandler}
                defaultChecked={account?.accountId === acc.accountId}
              />
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
