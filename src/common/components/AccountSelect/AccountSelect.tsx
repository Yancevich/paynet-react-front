import React from 'react';
import {
  Button,
  Menu,
  Modal,
  Stack,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useAtomValue } from 'jotai';
import { useDisclosure } from '@mantine/hooks';
import { useIntl } from 'react-intl';

import { CurrentAccount } from '@/common/components/CurrentAccount';
import { accountBalanceByIdAtom } from '@/store/balances';
import { useUi } from '@/contexts';
import { AccountBalance } from '@/types/AccountBalance';

import { AccountSelectItem } from './AccountSelectItem';
import classes from './AccountSelect.module.css';

interface AccountSelectProps {
  accounts: AccountBalance[];
  selectedAccountId: string;
  handleSelectAccount: (id: string) => void;
  target?: React.ReactNode;
  minimal?: boolean;
}

export const AccountSelect = ({
  accounts,
  selectedAccountId,
  handleSelectAccount,
  target,
  minimal = false,
}: AccountSelectProps) => {
  const intl = useIntl();
  const { isMobile } = useUi();
  const [opened, { close, open }] = useDisclosure(false);

  const selectedAccount =
    useAtomValue(accountBalanceByIdAtom(selectedAccountId)) ?? accounts[0];

  const handleAccountItemClick = (accountId: string) => {
    handleSelectAccount(accountId);
    close();
  };

  return (
    <Menu radius="md" withinPortal width={350} position="bottom-end">
      <Menu.Target>
        <UnstyledButton onClick={() => isMobile && open()}>
          {target || (
            <CurrentAccount
              minimal={minimal}
              accountName={selectedAccount.shortName}
              accountType={selectedAccount.accountType}
            />
          )}
        </UnstyledButton>
      </Menu.Target>

      {isMobile ? (
        <Modal opened={opened} onClose={close}>
          <Stack gap={32}>
            <Title size="xl" ta="center">
              {intl.formatMessage({
                id: 'widget.account_select.title',
                defaultMessage: 'Select account',
              })}
            </Title>

            <Stack gap={20}>
              <Stack gap={12} mah={192} style={{ overflowY: 'auto' }}>
                {accounts.map((acc) => {
                  return (
                    <AccountSelectItem
                      key={acc.accountId}
                      accountId={acc.accountId}
                      title={acc.shortName}
                      accountType={acc.accountType}
                      amount={acc.totalBalance}
                      handleAccountSelect={handleAccountItemClick}
                      selected={selectedAccountId === acc.accountId}
                    />
                  );
                })}
              </Stack>

              <Button size="md" onClick={() => close()}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Modal>
      ) : (
        <Menu.Dropdown className={classes.dropdown}>
          {accounts.map((acc) => {
            return (
              <Menu.Item key={acc.accountId}>
                <AccountSelectItem
                  key={acc.accountId}
                  accountId={acc.accountId}
                  title={acc.shortName}
                  accountType={acc.accountType}
                  amount={acc.totalBalance}
                  handleAccountSelect={handleAccountItemClick}
                  selected={selectedAccountId === acc.accountId}
                />
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      )}
    </Menu>
  );
};
