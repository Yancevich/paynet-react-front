import { useEffect, useMemo, useRef } from 'react';
import { Flex, NumberInput, Paper, Stack, Text } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import debounce from 'lodash/debounce';

import { CurrencySelect } from '../CurrencySelect';
import { FormattedAmount } from '../FormattedAmount';

import classes from './CurrencyAmountInput.module.css';

import { AccountSelect } from '@/common/components/AccountSelect';
import { accountBalanceByIdAtom } from '@/store/balances';
import { CurrencySelectButton } from '@/common/components/CurrencySelect/CurrencySelectButton';
import { Currency } from '@/api/currency';
import { useThemeColors } from '@/theme/useThemeColors.ts';
import { AccountBalance } from '@/types/AccountBalance';

interface CurrencyAmountInputProps {
  currency: Currency;
  amount: string;
  label: string;
  handleSelectCurrency: (currency: Currency) => void;
  handleChangeAmount: (value: string) => void;
  accountId?: string;
  handleSelectAccount?: (accountId: string) => void;
  isBalanceSufficient?: boolean;
  decimalScale?: number;
  fiat?: boolean;
  crypto?: boolean;
  sumOnly?: boolean;
  selectCurrencyDisabled?: boolean;
  allowedCurrencySlugs?: string[];
  error?: string | null;
  description?: string;
  onTouched?: () => void;
  showMaxButton?: boolean;
  hideBalance?: boolean;
  touched?: boolean;
  isBalanceHidden?: boolean;
  // Todo remove this field in next sprints
  temporaryTotal?: string | null;
  accounts: AccountBalance[];
}

export const CurrencyAmountInput = ({
  amount,
  accountId,
  currency,
  decimalScale,
  label,
  handleSelectAccount,
  handleSelectCurrency,
  handleChangeAmount,
  isBalanceSufficient,
  fiat,
  crypto,
  sumOnly,
  selectCurrencyDisabled = false,
  allowedCurrencySlugs,
  error,
  description,
  onTouched,
  showMaxButton,
  hideBalance,
  touched = false,
  isBalanceHidden,
  temporaryTotal,
  accounts,
}: CurrencyAmountInputProps) => {
  const { rcc } = useThemeColors();
  const { formatMessage } = useIntl();

  const accountBalance = useAtomValue(accountBalanceByIdAtom(accountId ?? ''));
  const balances = accountBalance?.balances;

  // const currencyList = useAtomValue(currencyListAtom);

  // const allowedCurrency = useMemo(() => {
  //   if (
  //     allowedCurrencySlugs &&
  //     allowedCurrencySlugs.length > 0 &&
  //     !allowedCurrencySlugs.includes(currency.slug ?? '')
  //   ) {
  //     const fallback = currencyList.find((c) =>
  //       allowedCurrencySlugs.includes(c.slug ?? '')
  //     );
  //
  //     return fallback ?? currency;
  //   }
  //   return currency;
  // }, [currency, allowedCurrencySlugs, currencyList]);

  const balance = balances?.find((b) => b.currency === currency.slug);
  const lastAmountRef = useRef(amount);

  const handleChange = (value: string) => {
    onTouched?.();
    const newValue = new BigNumber(value.trim()).toFixed();

    if (newValue !== lastAmountRef.current) {
      lastAmountRef.current = newValue;
      debouncedChangeAmount(newValue);
    }
  };

  const debouncedChangeAmount = useMemo(
    () =>
      debounce((value: string) => {
        handleChangeAmount(value);
      }, 500),
    [handleChangeAmount]
  );

  useEffect(() => {
    return () => {
      debouncedChangeAmount.cancel();
    };
  }, [debouncedChangeAmount]);

  const handleAmountFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (['0', ''].includes(e.target.value.trim())) {
      lastAmountRef.current = '';
      handleChangeAmount('');
    }
  };

  const handleAmountBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onTouched?.();
    if (['0', ''].includes(e.target.value.trim())) {
      lastAmountRef.current = '0';
      handleChangeAmount('0');
    }
  };

  return (
    <Paper className={classes.container}>
      <Stack gap={12}>
        <Flex w="100%" align="center" justify="space-between" wrap="wrap">
          <Text size="sm" c={rcc('regular-content.tetriary')}>
            {label}
          </Text>
          {accountId && handleSelectAccount && (
            <AccountSelect
              accounts={accounts}
              minimal
              selectedAccountId={accountId}
              handleSelectAccount={handleSelectAccount}
            />
          )}
        </Flex>

        <Flex align="flex-start" justify="space-between">
          <Stack gap={6} className={classes.maxWidth}>
            <CurrencySelect
              allowedCurrencySlugs={allowedCurrencySlugs}
              target={
                <CurrencySelectButton
                  currency={currency}
                  selectCurrencyDisabled={selectCurrencyDisabled}
                />
              }
              balances={balances}
              onSelectCurrency={handleSelectCurrency}
              fiatOnly={fiat}
              cryptoOnly={crypto}
              sumOnly={sumOnly}
              selectCurrencyDisabled={selectCurrencyDisabled}
            />

            {balance && !hideBalance && (
              <Flex align="center" gap={4} wrap="wrap">
                <Text size="sm" c={rcc('regular-content.tetriary')}>
                  {formatMessage({
                    id: 'widget.exchange.balance',
                    defaultMessage: 'Balance',
                  })}
                  :
                </Text>
                <Text
                  size="sm"
                  c={rcc('regular-content.tetriary')}
                  data-hidden={isBalanceHidden && !touched}
                >
                  <FormattedAmount
                    amount={balance.balance}
                    slug={balance.currency}
                    hideSymbol
                    previewCalc
                  />
                </Text>
              </Flex>
            )}

            {description && (
              <Text size="sm" c={rcc('regular-content.tetriary')}>
                {description}
              </Text>
            )}
          </Stack>

          <Stack gap={2} align="flex-end">
            <NumberInput
              value={amount}
              variant="unstyled"
              thousandSeparator=" "
              hideControls
              allowNegative={false}
              decimalScale={decimalScale}
              onFocus={handleAmountFocus}
              onBlur={handleAmountBlur}
              onChange={(value) => handleChange(value.toString())}
              classNames={{
                input: classes.input,
                wrapper: classes.inputWrapper,
              }}
              error={!!error}
            />

            {showMaxButton && balance && (
              <Text
                size="sm"
                c={rcc('accent-content.primary')}
                className={classes.maxButton}
                onClick={() => handleChangeAmount(balance.balance)}
              >
                Max
              </Text>
            )}

            {error && (
              <Text size="sm" c={rcc('negative-content.primary')}>
                {error}
              </Text>
            )}
            {temporaryTotal ? (
              <Text size="md" c={rcc('regular-content.tetriary')}>
                {formatMessage({
                  id: 'widget.buy_sell_crypto.total_to_spend',
                  defaultMessage: 'Total to spend',
                })}
                {': '}
                <FormattedAmount
                  amount={temporaryTotal}
                  slug={balance?.currency ?? ''}
                  hideSymbol
                />
              </Text>
            ) : null}
            {new BigNumber(amount).isGreaterThan(0) &&
              isBalanceSufficient !== undefined &&
              !isBalanceSufficient && (
                <Text size="md" c={rcc('regular-content.primary')}>
                  {formatMessage({
                    id: 'widget.exchange.insufficient_balance',
                    defaultMessage: 'Not enough balance',
                  })}
                </Text>
              )}
          </Stack>
        </Flex>
      </Stack>
    </Paper>
  );
};
