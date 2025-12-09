import {
  Button,
  Center,
  Divider,
  Flex,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useIntl } from 'react-intl';
import { useDisclosure } from '@mantine/hooks';
import BigNumber from 'bignumber.js';
import { Suspense, useEffect, useMemo } from 'react';

import { CurrencyAmountInput } from '@/common/components/CurrencyAmountInput';
import { useExchange } from '@/store/exchange';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { ExchangeReviewModal } from '@/common/widgets/ExchangeReviewModal/ExchangeReviewModal';
import { useNotifications } from '@/utils/notifications';
import { parseApiError } from '@/utils';
import { useLimits } from '@/store/limits';
import { DirectExchangeStatus } from '@/api/wallet';
import { useOperationLog } from '@/store/operationLog/hooks.ts';
import { Currency } from '@/api/currency';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './ReceiveBetweenAccountsWidget.module.css';

type ReceiveBetweenAccountsWidgetProps = {
  showTitle?: boolean;
  fromCurrency?: Currency;
  toCurrency?: Currency;
  fromAccountId?: string;
  toAccountId?: string;
  allowedCurrencies?: string[];
};

export const ReceiveBetweenAccountsWidget = ({
  showTitle,
  fromCurrency: fromCurrencyProp,
  toCurrency: toCurrencyProp,
  fromAccountId: fromAccountIdProp,
  toAccountId: toAccountIdProp,
  allowedCurrencies,
}: ReceiveBetweenAccountsWidgetProps) => {
  const { formatMessage } = useIntl();
  const [opened, handlers] = useDisclosure(false);
  const { showNotification } = useNotifications();
  const { refreshCurrentLimits } = useLimits();
  const { updateOperationLog } = useOperationLog();
  const { rcc } = useThemeColors();

  const {
    fromCurrency,
    handleSelectFromCurrency,
    toCurrency,
    handleSelectToCurrency,
    fromAmount,
    handleChangeFromAmount,
    toAmount,
    handleChangeToAmount,
    fromAccountId,
    handleSelectFromAccount,
    toAccountId,
    handleSelectToAccount,
    handleSubmit,
    rate,
    fee,
    feeCurrency,
    isLoading,
    startTimer,
    stopTimer,
    timer,
    isBalanceSufficient,
    resetExchange,
    accountList,
  } = useExchange();

  const activeToAccount = toAccountIdProp ?? toAccountId;
  const activeFromAccount = fromAccountIdProp ?? fromAccountId;

  useEffect(() => {
    if (fromCurrencyProp && fromCurrencyProp.slug !== fromCurrency?.slug) {
      handleSelectFromCurrency(fromCurrencyProp);
    }
  }, [fromCurrencyProp]);

  useEffect(() => {
    if (toCurrencyProp && toCurrencyProp.slug !== toCurrency?.slug) {
      handleSelectToCurrency(toCurrencyProp);
    }
  }, [toCurrencyProp]);

  useEffect(() => {
    if (fromAccountIdProp && fromAccountIdProp !== fromAccountId) {
      handleSelectFromAccount(fromAccountIdProp);
    }
  }, [fromAccountIdProp]);

  useEffect(() => {
    if (toAccountIdProp && toAccountIdProp !== toAccountId) {
      handleSelectToAccount(toAccountIdProp);
    }
  }, [toAccountIdProp]);

  useEffect(() => {
    resetExchange();
    return () => resetExchange();
  }, []);

  const handleReviewModalOpen = () => {
    handlers.open();
    startTimer();
  };

  const handleReviewModalClose = () => {
    handlers.close();
    stopTimer();
  };

  const notify = (
    titleId: string,
    descriptionId: string,
    status: 'success' | 'error' | 'info'
  ) => {
    showNotification(
      formatMessage({ id: titleId, defaultMessage: titleId }),
      status === 'success' || status === 'info',
      formatMessage({ id: descriptionId, defaultMessage: descriptionId })
    );
  };

  const isSameCurrencySameAccount =
    toCurrency?.slug === fromCurrency?.slug &&
    activeToAccount === activeFromAccount;

  const isDisabled = useMemo(() => {
    const isZeroAmount =
      new BigNumber(fromAmount).isLessThanOrEqualTo(0) ||
      new BigNumber(toAmount).isLessThanOrEqualTo(0);

    return isZeroAmount || isSameCurrencySameAccount || !isBalanceSufficient;
  }, [fromAmount, toAmount, isBalanceSufficient, isSameCurrencySameAccount]);

  const handleCompleteExchange = async () => {
    try {
      const data = await handleSubmit();

      switch (data?.status) {
        case DirectExchangeStatus.PENDING:
        case DirectExchangeStatus.PROCESSING:
        case DirectExchangeStatus.APPROVING:
          notify(
            'exchange.status.in_progress.title',
            'exchange.status.in_progress.description',
            'info'
          );
          break;
        case DirectExchangeStatus.SUCCESS:
        case DirectExchangeStatus.ACCEPTED:
        case DirectExchangeStatus.APPROVED:
          notify(
            'exchange.status.success.title',
            'exchange.status.success.description',
            'success'
          );
          break;
        case DirectExchangeStatus.FAILED:
        case DirectExchangeStatus.REJECTED:
        case DirectExchangeStatus.REJECTING:
          notify(
            'exchange.status.failed.title',
            'exchange.status.failed.description',
            'error'
          );
          break;
        default:
          showNotification('Unknown exchange status', false);
      }

      refreshCurrentLimits();
      updateOperationLog();
      handleReviewModalClose();
    } catch (error) {
      console.log('Error:', error);
      const parsedErrors = parseApiError(error);
      showNotification(parsedErrors[0].description, false);
      handleReviewModalClose();
    }
  };

  return (
    <Suspense
      fallback={
        <Center h="100%" w="100%">
          <Loader />
        </Center>
      }
    >
      <Paper w="100%" className={classes.container}>
        {showTitle && (
          <Title mb={20} size="lg" c={rcc('regular-content.primary')}>
            {formatMessage({
              id: 'page.exchange.title',
              defaultMessage: 'Exchange',
            })}
          </Title>
        )}
        <Stack gap={8}>
          {fromCurrency && (
            <CurrencyAmountInput
              accounts={accountList}
              label={formatMessage({
                id: 'widget.exchange.from',
                defaultMessage: 'From',
              })}
              amount={fromAmount}
              currency={fromCurrency}
              accountId={activeFromAccount}
              handleSelectAccount={handleSelectFromAccount}
              handleSelectCurrency={handleSelectFromCurrency}
              handleChangeAmount={handleChangeFromAmount}
              isBalanceSufficient={isBalanceSufficient}
              decimalScale={fromCurrency.decimals}
              allowedCurrencySlugs={allowedCurrencies}
              showMaxButton
            />
          )}

          {toCurrency && (
            <CurrencyAmountInput
              accounts={accountList}
              label={formatMessage({
                id: 'widget.exchange.to',
                defaultMessage: 'To',
              })}
              amount={toAmount}
              currency={toCurrency}
              accountId={activeToAccount}
              handleSelectAccount={handleSelectToAccount}
              handleSelectCurrency={handleSelectToCurrency}
              handleChangeAmount={handleChangeToAmount}
              decimalScale={toCurrency.decimals}
              allowedCurrencySlugs={allowedCurrencies}
            />
          )}
        </Stack>

        {fromCurrency?.shortName && toCurrency?.slug && rate && (
          <Divider
            mt={20}
            labelPosition="center"
            label={
              <Text size="xs" c={rcc('regular-content.tetriary')}>
                1 {fromCurrency.shortName} ≈{' '}
                <FormattedAmount amount={rate} slug={toCurrency.slug} />
              </Text>
            }
          />
        )}

        <Stack gap={4} mt={8}>
          {fee && feeCurrency && (
            <Flex justify="space-between">
              <Text size="md" c={rcc('regular-content.secondary')}>
                {formatMessage({
                  id: 'widget.exchange.transaction_fee',
                  defaultMessage: 'Transaction fee',
                })}
              </Text>

              <Text size="md" fw={700} c={rcc('regular-content.primary')}>
                <FormattedAmount amount={fee} slug={feeCurrency} previewCalc />
              </Text>
            </Flex>
          )}

          {new BigNumber(toAmount).isGreaterThan(0) &&
            !isDisabled &&
            toCurrency?.slug && (
              <Flex justify="space-between">
                <Text size="md" c={rcc('regular-content.secondary')}>
                  {formatMessage({
                    id: 'widget.exchange.total_amount',
                    defaultMessage: 'You will receive',
                  })}
                </Text>

                <Text size="md" fw={700} c={rcc('regular-content.primary')}>
                  <FormattedAmount
                    amount={toAmount}
                    slug={toCurrency.slug}
                    previewCalc
                  />
                </Text>
              </Flex>
            )}
        </Stack>

        <Button
          w="100%"
          mt={20}
          loading={isLoading}
          disabled={isDisabled}
          onClick={handleReviewModalOpen}
        >
          {formatMessage({
            id: 'widget.receive_between_accounts.send',
            defaultMessage: 'Send',
          })}
        </Button>
      </Paper>

      {fromCurrency && toCurrency && (
        <ExchangeReviewModal
          fromAmount={fromAmount}
          toAmount={toAmount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          opened={opened}
          rate={rate}
          fee={fee}
          timer={timer}
          feeCurrency={feeCurrency}
          totalAmount={toAmount}
          onClose={handleReviewModalClose}
          onSubmit={handleCompleteExchange}
          isLoading={isLoading}
        />
      )}
    </Suspense>
  );
};
