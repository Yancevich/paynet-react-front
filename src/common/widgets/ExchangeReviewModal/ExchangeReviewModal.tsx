import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useIntl } from 'react-intl';

import { Currency } from '@/api/currency';
import { CurrencyAmount } from '@/common/widgets/ExchangeReviewModal/components/CurrencyAmount';
import { Icon } from '@/common/components/Icon';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { useUi } from '@/contexts';

import classes from './exchangeReviewModal.module.css';

interface ExchangeReviewModalProps {
  fromAmount: string;
  toAmount: string;
  fromCurrency: Currency;
  toCurrency: Currency;
  opened: boolean;
  timer: number;
  onClose: () => void;
  totalAmount: string;
  onSubmit: () => void;
  isLoading: boolean;
  fee?: string;
  feeCurrency?: string;
  rate?: string;
}

export const ExchangeReviewModal = ({
  fromAmount,
  toAmount,
  fromCurrency,
  toCurrency,
  opened,
  onClose,
  rate,
  fee,
  timer,
  feeCurrency,
  totalAmount,
  onSubmit,
  isLoading,
}: ExchangeReviewModalProps) => {
  const intl = useIntl();
  const { isMobile } = useUi();

  return (
    <Modal opened={opened} onClose={onClose} centered>
      <Stack align="center" gap={32}>
        <Stack gap={8} align="center">
          <Title size="xl">
            {intl.formatMessage({
              id: 'widget.exchange_review.title',
              defaultMessage: 'Asset exchange',
            })}
          </Title>
          <Text size="lg">
            {intl.formatMessage({
              id: 'widget.exchange_review.subtitle',
              defaultMessage: 'Check all transaction details carefully',
            })}
          </Text>
        </Stack>

        {fromCurrency.slug && toCurrency.slug && (
          <Flex gap={12} w="100%" pos="relative">
            <CurrencyAmount amount={fromAmount} slug={fromCurrency.slug} previewCalc />
            <Box className={classes.directionIcon}>
              <Icon name="arrow-right" />
            </Box>
            <CurrencyAmount amount={toAmount} slug={toCurrency.slug} previewCalc />
          </Flex>
        )}

        {rate && fromCurrency.slug && toCurrency.slug && (
          <Stack gap={8} w="100%">
            <Flex
              className={classes.reviewDetailContainer}
              justify="space-between"
              w="100%"
            >
              <Text size="md">
                {intl.formatMessage({
                  id: 'widget.exchange_review.rate',
                  defaultMessage: 'Rate',
                })}
              </Text>
              <Flex gap={16}>
                <Flex gap={6}>
                  <Text size="md" fw={700}>
                    {timer}
                  </Text>
                  <Icon name="clock" size={20} color="var(--accent-border-4)" />
                </Flex>
                <Divider orientation="vertical" color="regular-borders.2" />
                <Text size="md" fw={700}>
                  <FormattedAmount amount="1" slug={fromCurrency.slug} />
                  {' ≈ '}
                  <FormattedAmount amount={rate} slug={toCurrency.slug} />
                </Text>
              </Flex>
            </Flex>
          </Stack>
        )}

        {fee && feeCurrency && toCurrency.slug && (
          <Stack className={classes.reviewDetailContainer} w="100%">
            <Flex justify="space-between">
              <Text size="md">
                {intl.formatMessage({
                  id: 'widget.exchange_review.fee',
                  defaultMessage: 'Transaction fee',
                })}
              </Text>

              <Text size="md" fw={700}>
                <FormattedAmount amount={fee} slug={feeCurrency} previewCalc />
              </Text>
            </Flex>

            <Flex justify="space-between">
              <Text size="md">
                {intl.formatMessage({
                  id: 'widget.exchange_review.receive',
                  defaultMessage: 'You will receive',
                })}
              </Text>

              <Text size="md" fw={700}>
                <FormattedAmount
                  amount={totalAmount}
                  slug={toCurrency.slug}
                  previewCalc
                />
              </Text>
            </Flex>
          </Stack>
        )}

        <Flex
          w="100%"
          gap={12}
          direction={isMobile ? 'column-reverse' : 'row'}
        >
          <Button
            flex={1}
            variant={isMobile ? 'ghost' : 'secondary'}
            onClick={onClose}
          >
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
            {intl.formatMessage({
              id: 'widget.exchange_review.exchange',
              defaultMessage: 'Exchange',
            })}
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};
