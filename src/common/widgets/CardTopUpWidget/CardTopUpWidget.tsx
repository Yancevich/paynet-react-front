import { Suspense, useEffect, useMemo } from 'react';
import { Button, Center, Loader, Paper, Stack, Title } from '@mantine/core';
import { useIntl } from 'react-intl';
import { useAtomValue } from 'jotai/index';
import BigNumber from 'bignumber.js';
import { useSearchParams } from 'react-router';

import classes from '@/common/widgets/ExchangeWidget/ExchangeWidget.module.css';
import { CurrencyAmountInput } from '@/common/components/CurrencyAmountInput';
import { useCardTopUp } from '@/store/cardTopUp';
import { cardInfoByIdAtom } from '@/store/cards';
import { checkingAccountsAtom } from '@/store/accounts';
import { CurrentCardForTopUp } from '@/common/widgets/CardTopUpWidget/components/CurrenctCardForTopUp';
import { useNotifications } from '@/utils/notifications.ts';
import { useCurrencies } from '@/store/currencies/hooks.ts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface CardTopUpWidgetProps {
  cardId: string;
}

export const CardTopUpWidget = ({ cardId }: CardTopUpWidgetProps) => {
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const { getCurrencyBySlug } = useCurrencies();
  const { rcc } = useThemeColors();
  const [searchParams] = useSearchParams();
  const direction = searchParams.get('direction') || 'to';
  const preselectedCurrency = searchParams.get('currency') || undefined;
  const usdtCurrency = getCurrencyBySlug('usdt');

  const {
    currency,
    amount,
    handleChangeAmount,
    handleSelectCurrency,
    isLoading,
    handleTopUp,
    handleWithdraw,
    checkBalanceSufficient,
    accountList,
  } = useCardTopUp();

  useEffect(() => {
    if (!usdtCurrency || !handleSelectCurrency) {
      return;
    }

    if (!preselectedCurrency) {
      handleSelectCurrency(usdtCurrency);
      return;
    }

    const findCurrency = getCurrencyBySlug(preselectedCurrency);
    if (!findCurrency) {
      return;
    }

    handleSelectCurrency(findCurrency);
  }, [preselectedCurrency]);

  const cardDetails = useAtomValue(cardInfoByIdAtom(cardId));
  const checkingAccounts = useAtomValue(checkingAccountsAtom);
  const accountId = checkingAccounts[0]?.account;

  const isTopUpDirection = direction === 'to';

  const fromAccountId = isTopUpDirection ? accountId : cardDetails?.accountId;
  const toAccountId = isTopUpDirection ? cardDetails?.accountId : accountId;

  const handleSubmit = async () => {
    if (!fromAccountId || !toAccountId) {
      showNotification(
        formatMessage({
          id: 'widget.card_top_up.failed.title',
          defaultMessage: 'Transaction failed',
        }),
        false,
        formatMessage({
          id: 'widget.card_top_up.failed.description',
          defaultMessage: 'Unable to complete the transaction',
        })
      );
      return;
    }

    const resp = isTopUpDirection
      ? await handleTopUp(fromAccountId, toAccountId)
      : await handleWithdraw(fromAccountId, toAccountId);

    if (resp.success) {
      showNotification(
        formatMessage({
          id: 'widget.card_top_up.success.title',
          defaultMessage: 'Successful transaction',
        }),
        true,
        formatMessage({
          id: 'widget.card_top_up.success.message',
          defaultMessage: 'Funds have been successfully transferred',
        })
      );
    } else {
      showNotification(
        formatMessage({
          id: 'widget.card_top_up.failed.title',
          defaultMessage: 'Transaction failed',
        }),
        false,
        resp.description ||
          formatMessage({
            id: 'widget.card_top_up.failed.description',
            defaultMessage: 'Unable to complete the transaction',
          })
      );
    }
  };

  const isBalanceSufficient = useMemo(() => {
    return checkBalanceSufficient(fromAccountId, currency?.slug, amount);
  }, [fromAccountId, currency?.slug, amount]);

  const isDisabled = useMemo(() => {
    const isZeroAmount = new BigNumber(amount).isLessThanOrEqualTo(0);
    return isZeroAmount || !isBalanceSufficient;
  }, [amount, isBalanceSufficient]);

  return (
    <Suspense
      fallback={
        <Center h="100%" w="100%">
          <Loader />
        </Center>
      }
    >
      <Paper w="100%" className={classes.container}>
        <Title mb={20} size="lg" c={rcc('regular-content.primary')}>
          {formatMessage({
            id: isTopUpDirection
              ? 'page.card_topup.title'
              : 'page.card_withdraw.title',
            defaultMessage: isTopUpDirection ? 'Top up' : 'Withdraw',
          })}
        </Title>

        <Stack gap={16}>
          {currency && currency.slug && cardDetails && accountId && (
            <>
              {isTopUpDirection ? (
                <>
                  <CurrencyAmountInput
                    accounts={accountList}
                    label=""
                    crypto
                    amount={amount}
                    currency={currency}
                    accountId={accountId}
                    handleSelectCurrency={handleSelectCurrency}
                    handleChangeAmount={handleChangeAmount}
                    decimalScale={currency.decimals}
                    showMaxButton
                  />
                  <CurrentCardForTopUp
                    cardId={cardId}
                    currency={currency.slug}
                  />
                </>
              ) : (
                <>
                  <CurrencyAmountInput
                    accounts={accountList}
                    label=""
                    crypto
                    amount={amount}
                    currency={currency}
                    accountId={cardDetails.accountId}
                    handleSelectCurrency={handleSelectCurrency}
                    handleChangeAmount={handleChangeAmount}
                    decimalScale={currency.decimals}
                    showMaxButton
                  />
                  <CurrentCardForTopUp
                    cardId={cardId}
                    currency={currency.slug}
                  />
                </>
              )}
            </>
          )}

          <Button
            fullWidth
            loading={isLoading}
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            {formatMessage({
              id: isTopUpDirection
                ? 'widget.card_top_up.send'
                : 'widget.card_withdraw.send',
              defaultMessage: isTopUpDirection ? 'Top up' : 'Withdraw',
            })}
          </Button>
        </Stack>
      </Paper>
    </Suspense>
  );
};
