import { Center, Flex, Stack, Text } from '@mantine/core';
import { useIntl } from 'react-intl';
import { useDisclosure } from '@mantine/hooks';

import { Icon } from '@/common/components/Icon';
import { CardDtoExtended } from '@/store/paymentMethods';
import { SelectCardModal } from '@/common/widgets/SelectCardModal';
import { PaymentSystemIcon } from '@/common/components/PaymentSystemIcon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './currentPaymentMethod.module.css';

interface CurrentPaymentMethodProps {
  paymentMethod: CardDtoExtended;
}

export const CurrentPaymentMethod = ({
  paymentMethod,
}: CurrentPaymentMethodProps) => {
  const { rcc } = useThemeColors();
  const intl = useIntl();
  const [selectCardModalOpened, selectCardModalHandler] = useDisclosure();

  return (
    <>
      <Flex
        justify="space-between"
        w="100%"
        align="center"
        style={{
          cursor: 'pointer',
        }}
        onClick={selectCardModalHandler.open}
      >
        <Flex gap={12}>
          <Center className={classes.iconContainer}>
            <PaymentSystemIcon
              paymentSystem={paymentMethod.paymentSystem}
              size={20}
            />
          </Center>

          <Stack gap={4}>
            <Text size="md" fw={700} c={rcc('regular-content.primary')}>
              {intl.formatMessage({
                id: 'components.current_payment_method.title',
                defaultMessage: 'Card',
              })}{' '}
              {paymentMethod.paymentSystem.trim() !== ''
                ? `(${paymentMethod.paymentSystem.toUpperCase()})`
                : null}
            </Text>

            <Text size="sm" c={rcc('regular-content.tetriary')} fw={700}>
              {paymentMethod.pan
                ?.toString()
                .substring(paymentMethod.pan.length - 8)}
            </Text>
          </Stack>
        </Flex>

        <Icon name="chevron-right" size={20} />
      </Flex>

      <SelectCardModal
        opened={selectCardModalOpened}
        onClose={selectCardModalHandler.close}
      />
    </>
  );
};
