import { Button, Center, Flex, Modal, Stack, Text, Title } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Currency } from '@/api/currency';
import { CurrencyAmount } from '@/common/widgets/ExchangeReviewModal/components/CurrencyAmount';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { useUi } from '@/contexts';
import { CopyButton } from '@/common/components/CopyButton/CopyButton';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './cryptoAddressTransferReviewModal.module.css';

interface ExchangeReviewModalProps {
  fromAmount: string;
  fromCurrency: Currency;
  opened: boolean;
  recipient: string;
  network: string;
  onClose: () => void;
  receive: string;
  onSubmit: () => void;
  isLoading: boolean;
  fee: string;
}

export const CryptoAddressTransferReviewModal = ({
  fromAmount,
  fromCurrency,
  opened,
  onClose,
  fee,
  recipient,
  network,
  receive,
  onSubmit,
  isLoading,
}: ExchangeReviewModalProps) => {
  const { formatMessage } = useIntl();
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();

  return (
    <Modal opened={opened} onClose={onClose} centered>
      <Stack align="center" gap={32}>
        <Stack gap={8} align="center">
          <Title size="xl" c={rcc('regular-content.primary')}>
            {formatMessage({
              id: 'widget.crypto_address_transfer_review_modal.title',
              defaultMessage: 'Transferring asssets',
            })}
          </Title>
          <Text size="lg" c={rcc('regular-content.secondary')}>
            {formatMessage({
              id: 'widget.transfer_review.subtitle',
              defaultMessage: 'Check all transaction details carefully',
            })}
          </Text>
        </Stack>

        {fromCurrency.slug && (
          <Center>
            <Flex w="100%" justify="center">
              <CurrencyAmount amount={fromAmount} slug={fromCurrency.slug} />
            </Flex>
          </Center>
        )}

        <Stack gap={8} w="100%">
          {recipient && (
            <Stack className={classes.reviewDetailContainer} w="100%">
              <Flex justify="space-between" gap={8}>
                <Text size="md" c={rcc('regular-content.secondary')}>
                  {formatMessage({
                    id: 'widget.transfer_review.recipient',
                    defaultMessage: 'Recipient',
                  })}
                </Text>

                <Flex gap={8}>
                  <Text
                    style={{ wordBreak: 'break-all' }}
                    size="md"
                    fw={700}
                    w="100%"
                    c={rcc('positive-content.primary')}
                  >
                    {recipient.slice(0, 15) + '...' + recipient.slice(-15)}
                  </Text>

                  <CopyButton text={recipient} />
                </Flex>
              </Flex>
            </Stack>
          )}

          {network && (
            <Stack className={classes.reviewDetailContainer} w="100%">
              <Flex justify="space-between">
                <Text size="md" c={rcc('regular-content.secondary')}>
                  {formatMessage({
                    id: 'widget.transfer_review.network',
                    defaultMessage: 'Network',
                  })}
                </Text>

                <Text size="md" fw={700} c={rcc('regular-content.primary')}>
                  {network}
                </Text>
              </Flex>
            </Stack>
          )}

          {fee && fromCurrency.slug && (
            <Stack className={classes.reviewDetailContainer} w="100%">
              <Flex justify="space-between">
                <Text size="md" c={rcc('regular-content.secondary')}>
                  {formatMessage({
                    id: 'widget.transfer_review.fee',
                    defaultMessage: 'Transaction fee',
                  })}
                </Text>

                <Text size="md" fw={700} c={rcc('positive-content.primary')}>
                  <FormattedAmount
                    amount={fee}
                    slug={fromCurrency.slug}
                    previewCalc
                  />
                </Text>
              </Flex>

              <Flex justify="space-between">
                <Text size="md" c={rcc('regular-content.secondary')}>
                  {formatMessage({
                    id: 'widget.transfer_review.receive',
                    defaultMessage: 'Recipient will receive',
                  })}
                </Text>

                <Text size="md" fw={700} c={rcc('positive-content.primary')}>
                  <FormattedAmount
                    amount={receive}
                    slug={fromCurrency.slug}
                    previewCalc
                  />
                </Text>
              </Flex>
            </Stack>
          )}
        </Stack>

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
            {formatMessage({
              id: 'widget.crypto_address_transfer_review_modal.cancel',
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
            {formatMessage({
              id: 'widget.crypto_address_transfer_review_modal.transfer',
              defaultMessage: 'Transfer',
            })}
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};
