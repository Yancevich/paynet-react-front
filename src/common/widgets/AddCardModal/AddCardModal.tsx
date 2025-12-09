import { useForm } from '@mantine/form';
import {
  Button,
  Flex,
  Grid,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import InputMask from 'react-input-mask';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { useUi } from '@/contexts';
import { BackButton } from '@/common/components';
import { Icon } from '@/common/components/Icon';
import SecureIcon from '@/assets/images/3d-secure.svg';
import PciIcon from '@/assets/images/pci-dss.svg';
import SslIcon from '@/assets/images/ssl.svg';
import { usePaymentMethods } from '@/store/paymentMethods';
import { CardDto } from '@/api/acquiring';
import { useNotifications } from '@/utils/notifications';
import { isValidCardNumber } from '@/utils/luhnValidator.ts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface AddCardModalProps {
  opened: boolean;
  onClose: () => void;
}

export const AddCardModal = ({ opened, onClose }: AddCardModalProps) => {
  const { isMobile } = useUi();
  const { showNotification } = useNotifications();
  const { formatMessage } = useIntl();
  const { addPaymentMethod, isLoading } = usePaymentMethods();
  const { rcc } = useThemeColors();

  const [isCvvHidden, setIsCvvHidden] = useState(false);
  const [isCardHolderRequired, setIsCardHolderRequired] = useState(false);

  const checkIsVisaOrMastercard = (cardNumber: string) => {
    const clean = cardNumber.replace(/\s/g, '');

    const visaPrefix = /^4\d{15}$/;
    const mcPrefix =
      /^(?:5[1-5]\d{14}|(?:222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12})$/;

    return visaPrefix.test(clean) || mcPrefix.test(clean);
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      cvv: '',
    },
    validate: {
      cardNumber: (value) => {
        const clean = value.replace(/\s/g, '');

        if (clean.length > 0) {
          const humoPrefix = /^9860\d{12}$/;
          const isVisaOrMastercard = checkIsVisaOrMastercard(clean);

          const isSupportedPrefix =
            isVisaOrMastercard || humoPrefix.test(clean);

          if (!isSupportedPrefix) {
            return formatMessage({
              id: 'widget.add_card_modal.unsupported_card',
              defaultMessage: 'This card type is not supported',
            });
          }

          setIsCardHolderRequired(isVisaOrMastercard);
        }

        return isValidCardNumber(value)
          ? null
          : formatMessage({
              id: 'widget.add_card_modal.invalid_card',
              defaultMessage: 'Invalid card number',
            });
      },
      cardHolder: (value) => {
        if (isCardHolderRequired && value.trim() === '') {
          return formatMessage({
            id: 'widget.add_card_modal.card_name_required',
            defaultMessage:
              'Card holder name is required for Visa and Mastercard',
          });
        }
        return null;
      },
    },
  });

  const checkBin = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return cleanNumber.startsWith('9860');
  };

  form.watch('cardNumber', (cardNumber) => {
    const clean = cardNumber.value.replace(/\s/g, '');
    const isVisaOrMastercard = checkIsVisaOrMastercard(clean);

    setIsCvvHidden(checkBin(clean));
    setIsCardHolderRequired(isVisaOrMastercard);
  });

  const handleAddCard = async () => {
    const { cardNumber, cardHolder, expirationDate, cvv } = form.getValues();
    const addCardDto: CardDto = {
      pan: cardNumber.replace(/\s/g, ''),
      cardHolder: cardHolder,
      expirationDate: `${expirationDate.split('/')[0]}${expirationDate.split('/')[1]}`,
      cvv: cvv.trim() !== '' ? cvv : undefined,
      preferred: true,
    };
    try {
      await addPaymentMethod(addCardDto);
      showNotification(
        formatMessage({
          id: 'widget.add_card_modal.success',
          defaultMessage: 'Card added successfully',
        }),
        true
      );
    } catch (e) {
      showNotification(
        formatMessage({
          id: 'widget.add_card_modal.error',
          defaultMessage: 'Failed to add card',
        }),
        false
      );
      console.error(e);
    } finally {
      form.reset();
      setIsCvvHidden(false);
      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<BackButton onClick={onClose} />}
      centered
    >
      <form onSubmit={form.onSubmit(handleAddCard)}>
        <Stack mt={isMobile ? 16 : 32} gap={isMobile ? 16 : 20}>
          <Title
            order={1}
            size="xl"
            ta="center"
            c={rcc('regular-content.primary')}
          >
            {formatMessage({
              id: 'widget.add_card_modal.title',
              defaultMessage: 'Adding bank card',
            })}
          </Title>

          <Stack gap={20}>
            <TextInput
              size="lg"
              {...form.getInputProps('cardHolder')}
              withAsterisk={isCardHolderRequired}
              label={formatMessage({
                id: 'widget.add_card_modal.card_name',
                defaultMessage: 'Сard name (personal, credit)',
              })}
            />

            <InputMask
              mask="9999 9999 9999 9999"
              maskChar={null}
              {...form.getInputProps('cardNumber')}
            >
              {(inputProps) => (
                <TextInput
                  size="lg"
                  {...inputProps}
                  label={formatMessage({
                    id: 'widget.add_card_modal.card_number',
                    defaultMessage: 'Card number',
                  })}
                  placeholder="1234 5678 1234 5678"
                />
              )}
            </InputMask>

            <Grid w="100%" columns={4} justify="space-between">
              <Grid.Col span={2}>
                <InputMask
                  mask="99/99"
                  maskChar=" "
                  {...form.getInputProps('expirationDate')}
                >
                  {(inputProps) => (
                    <TextInput
                      w="100%"
                      size="lg"
                      {...inputProps}
                      label={formatMessage({
                        id: 'widget.add_card_modal.expiration_date',
                        defaultMessage: 'Expiration date',
                      })}
                    />
                  )}
                </InputMask>
              </Grid.Col>

              <Grid.Col span={2}>
                {!isCvvHidden ? (
                  <InputMask
                    mask="999"
                    maskChar=" "
                    {...form.getInputProps('cvv')}
                  >
                    {(inputProps) => (
                      <TextInput
                        w="100%"
                        size="lg"
                        {...inputProps}
                        label="CVV"
                      />
                    )}
                  </InputMask>
                ) : null}
              </Grid.Col>
            </Grid>
          </Stack>

          <Flex align="center" justify="space-between">
            <Flex gap={4}>
              <Icon
                name="shield"
                color={rcc('regular-content.tetriary')}
                size={20}
              />
              <Text size="md" c={rcc('regular-content.tetriary')}>
                {formatMessage({
                  id: 'widget.add_card_modal.secure_payments',
                  defaultMessage: '100% safe and secure payments',
                })}
              </Text>
            </Flex>

            <Flex align="center" gap={16}>
              <SecureIcon />
              <PciIcon />
              <SslIcon />
            </Flex>
          </Flex>

          <Flex
            direction={isMobile ? 'column-reverse' : 'row'}
            align="center"
            gap={12}
            w="100%"
          >
            <Button
              onClick={onClose}
              type="button"
              variant={isMobile ? 'ghost' : 'secondary'}
              size="lg"
              w="100%"
              disabled={isLoading}
            >
              {formatMessage({ id: 'common.cancel', defaultMessage: 'Cancel' })}
            </Button>
            <Button
              type="submit"
              variant="accent"
              size="lg"
              w="100%"
              loading={isLoading}
            >
              {formatMessage({ id: 'common.add', defaultMessage: 'Add' })}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  );
};
