import React from 'react';
import {
  Box,
  Button,
  Menu,
  Modal,
  Stack,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { useAtomValue } from 'jotai';

import { useUi } from '@/contexts';
import { BalanceDetail } from '@/types/BalanceDetail';
import { Search } from '@/common/components/Search';
import { Currency } from '@/api/currency';
import { currencyListAtom } from '@/store/currencies';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { CurrencySelectItem } from './CurrencySelectItem';
import classes from './CurrencySelect.module.css';

interface CurrencySelectProps {
  balances?: BalanceDetail[];
  onSelectCurrency: (currency: Currency) => void;
  target: React.ReactNode;
  fiatOnly?: boolean;
  cryptoOnly?: boolean;
  sumOnly?: boolean;
  selectCurrencyDisabled?: boolean;
  allowedCurrencySlugs?: string[];
  depositOnly?: boolean;
  withdrawOnly?: boolean;
}

export const CurrencySelect = ({
  balances,
  onSelectCurrency,
  target,
  fiatOnly,
  cryptoOnly,
  sumOnly,
  selectCurrencyDisabled,
  allowedCurrencySlugs,
  depositOnly,
  withdrawOnly,
}: CurrencySelectProps) => {
  const intl = useIntl();
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();
  const [opened, { close, open }] = useDisclosure(false);

  const currencyList = useAtomValue(currencyListAtom);
  const [searchValue, setSearchValue] = useState('');

  const filteredCurrencies = currencyList.filter((c) => {
    const shortName = c.shortName?.toLowerCase() ?? '';
    const description = c.description?.toLowerCase() ?? '';
    const query = searchValue.toLowerCase().trim();

    const matchesQuery =
      shortName.includes(query) || description.includes(query);

    const matchesFiatOnly = !fiatOnly || c.type === 'FIAT';
    const matchesCryptoOnly = !cryptoOnly || c.type === 'CRYPTO';
    const matchesSumOnly = !sumOnly || c.slug === 'uzs';
    const matchesAllowed = allowedCurrencySlugs?.includes(c.slug || '');
    const matchesWithdraw =
      !withdrawOnly || c.tokens?.some((t) => t.settings?.withdrawEnabled);
    const matchesDeposit =
      !depositOnly || c.tokens?.some((t) => t.settings?.depositEnabled);

    return (
      (matchesQuery &&
        matchesFiatOnly &&
        matchesCryptoOnly &&
        matchesSumOnly &&
        matchesWithdraw &&
        matchesDeposit) ||
      matchesAllowed
    );
  });

  const handleCurrencyClick = (currency: Currency) => {
    onSelectCurrency(currency);
    close();
  };

  const onTargetClick = () => {
    if (isMobile) {
      open();
    }
  };

  return (
    <Menu
      radius="md"
      withinPortal
      position="bottom-start"
      disabled={selectCurrencyDisabled}
    >
      <Menu.Target>
        <UnstyledButton
          onClick={onTargetClick}
          onSelect={onTargetClick}
          maw="100%"
        >
          {target}
        </UnstyledButton>
      </Menu.Target>

      {isMobile ? (
        <Modal opened={opened} onClose={close}>
          <Stack gap={32}>
            <Title size="xl" ta="center" c={rcc('regular-content.primary')}>
              {intl.formatMessage({
                id: 'widget.currency_select.title',
                defaultMessage: 'Select currency',
              })}
            </Title>

            <Stack gap={20}>
              <Stack gap={12} h={200} style={{ overflowY: 'auto' }}>
                {filteredCurrencies.map((c) => {
                  const balance = balances
                    ? balances.find((b) => b.currency === c.slug)?.balance
                    : undefined;

                  return (
                    <CurrencySelectItem
                      key={c.shortName}
                      currency={c}
                      balance={balance}
                      handleCurrencySelect={handleCurrencyClick}
                    />
                  );
                })}
              </Stack>

              <Box mt={12}>
                <Search
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Box>

              <Button size="md" onClick={close}>
                {intl.formatMessage({
                  id: 'common.cancel',
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Stack>
          </Stack>
        </Modal>
      ) : (
        <Menu.Dropdown className={classes.dropdown} w="100%">
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />

          {filteredCurrencies.map((c, index) => {
            const balance = balances
              ? balances.find((b) => b.currency === c.slug)?.balance
              : undefined;

            return (
              <Menu.Item key={c.shortName} pt={index === 0 ? 18 : 12} pb={0}>
                <CurrencySelectItem
                  key={c.shortName}
                  currency={c}
                  balance={balance}
                  handleCurrencySelect={handleCurrencyClick}
                />
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      )}
    </Menu>
  );
};
