import { Box, Center, Flex, Radio, Stack, Text } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { CardDtoExtended } from '@/store/paymentMethods';
import { PaymentSystemIcon } from '@/common/components/PaymentSystemIcon/PaymentSystemIcon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './selectCardListItem.module.css';
import { useUi } from '@/contexts';

interface SelectCardListItemProps {
  paymentMethod: CardDtoExtended;
  onSelect?: (cardId: string) => void;
  selected?: boolean;
  isDeletable?: boolean;
  selectForDelete?: (paymentMethod: CardDtoExtended) => void;
}

export const SelectCardListItem = ({
  paymentMethod,
  selected,
  onSelect,
  isDeletable,
  selectForDelete,
}: SelectCardListItemProps) => {
  const intl = useIntl();
  const { rcc } = useThemeColors();
  const { isTablet } = useUi();

  return (
    <Box
      className={classes.container}
      onClick={() => onSelect && onSelect(paymentMethod.id!)}
    >
      <Flex justify="space-between" align="center">
        <Flex gap={12} wrap="wrap">
          <Center className={classes.iconContainer}>
            <PaymentSystemIcon
              paymentSystem={paymentMethod.paymentSystem}
              size={20}
            />
          </Center>
          {/*Todo check colors*/}
          <Stack gap={4}>
            <Text size="md" fw={700} c={rcc('regular-content.primary')}>
              {intl.formatMessage({
                id: 'widgets.current_payment_method.title',
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

        <Flex gap={isTablet ? 0 : 16} align="center">
          {!isDeletable ? (
            <>
              <Center
                w={44}
                h={44}
                style={{
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectForDelete) {
                    selectForDelete(paymentMethod);
                  }
                }}
              >
                <Icon name="trash" size={20} />
              </Center>
              <Radio size="md" checked={selected} />
            </>
          ) : (
            <Text size="md" c={rcc('regular-content.tetriary')}>
              {intl.formatMessage({
                id: 'This card will be deleted',
                defaultMessage: 'This card will be deleted',
              })}
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
