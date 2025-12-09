import { useIntl } from 'react-intl';
import { Box, Button, Flex, Modal, Stack, Text, Title } from '@mantine/core';

import { Currency } from '@/api/currency';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { BuySellOperationType } from '@/store/buySellCrypto';
import { CurrencyAmount } from '@/common/widgets/ExchangeReviewModal/components/CurrencyAmount';
import classes from '@/common/widgets/ExchangeReviewModal/exchangeReviewModal.module.css';
import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface BuySellCryptoReviewModalProps {
  fromAmount: string;
  fromCurrency: Currency;
  toAmount: string;
  toCurrency: Currency;
  opened: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  fee: string;
  feeCurrency: string;
  totalCharge: string;
  operationType: BuySellOperationType;
}

export const BuySellCryptoReviewModal = ({
  fromCurrency,
  fromAmount,
  toAmount,
  toCurrency,
  opened,
  onClose,
  onSubmit,
  isLoading,
  fee,
  feeCurrency,
  totalCharge,
  operationType,
}: BuySellCryptoReviewModalProps) => {
  const intl = useIntl();
  const { rcc } = useThemeColors();

  return (
    <Modal opened={opened} onClose={onClose} centered>
      <Stack align="center" gap={32}>
        <Stack gap={8} align="center">
          <Title size="xl" c={rcc('regular-content.primary')}>
            {operationType === BuySellOperationType.BUY
              ? intl.formatMessage({
                  id: 'widget.buy_sell_review.buy',
                  defaultMessage: 'Buying assets',
                })
              : intl.formatMessage({
                  id: 'widget.buy_sell_review.sell',
                  defaultMessage: 'Selling assets',
                })}
          </Title>
          <Text size="lg" c={rcc('regular-content.secondary')}>
            {intl.formatMessage({
              id: 'widget.buy_sell_review.subtitle',
              defaultMessage: 'Check transaction details',
            })}
          </Text>
        </Stack>

        {fromCurrency.slug && toCurrency.slug && (
          <Flex gap={12} w="100%" pos="relative">
            <CurrencyAmount amount={fromAmount} slug={fromCurrency.slug} />

            <Box className={classes.directionIcon}>
              <Icon name="arrow-right" />
            </Box>
            <CurrencyAmount amount={toAmount} slug={toCurrency.slug} />
          </Flex>
        )}

        <Stack className={classes.reviewDetailContainer} w="100%">
          <Flex justify="space-between">
            <Text size="md" c={rcc('regular-content.secondary')}>
              {intl.formatMessage({
                id: 'widget.buy_sell_review.fee',
                defaultMessage: 'Transaction fee',
              })}
            </Text>
            <Text size="md" fw={700} c={rcc('regular-content.primary')}>
              <FormattedAmount
                amount={fee}
                slug={feeCurrency || ''}
                previewCalc
              />
            </Text>
          </Flex>
          <Flex justify="space-between">
            <Text size="md" c={rcc('regular-content.secondary')}>
              {intl.formatMessage({
                id: 'widget.buy_sell_review.total',
                defaultMessage: 'You will be charged',
              })}
            </Text>
            <Text size="lg" fw={900} c={rcc('regular-content.primary')}>
              <FormattedAmount
                amount={totalCharge}
                slug={feeCurrency || ''}
                previewCalc
              />
            </Text>
          </Flex>

          {toCurrency.slug && (
            <Flex justify="space-between">
              <Text size="md" c={rcc('regular-content.secondary')}>
                {intl.formatMessage({
                  id: 'widget.buy_sell_review.you_will_receive',
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

        <Flex w="100%" gap={12} direction="row">
          <Button flex={1} variant="ghost" onClick={onClose}>
            {intl.formatMessage({
              id: 'common.cancel',
              defaultMessage: 'Cancel',
            })}
          </Button>
          <Button
            flex={1}
            variant="positive"
            onClick={onSubmit}
            loading={isLoading}
            disabled={isLoading}
            data-disabled={isLoading}
          >
            {operationType === BuySellOperationType.BUY
              ? intl.formatMessage({ id: 'common.buy', defaultMessage: 'Buy' })
              : intl.formatMessage({
                  id: 'common.sell',
                  defaultMessage: 'Sell',
                })}
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};
