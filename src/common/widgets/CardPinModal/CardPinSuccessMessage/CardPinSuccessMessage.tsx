import { Button, Center, Flex, Stack, Text, Title } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { CardPinModalType } from '../types';

import styles from './CardPinSuccessMessage.module.css';

interface CardPinSuccessMessageProps {
  modalType: CardPinModalType;
  onClose: () => void;
}

export const CardPinSuccessMessage = ({
  onClose,
  modalType,
}: CardPinSuccessMessageProps) => {
  const { formatMessage } = useIntl();
  const { rcc, rbgc } = useThemeColors();

  const isSetPinForm = modalType === 'set';

  return (
    <Stack gap={32}>
      <Center>
        <Flex
          className={styles.icon}
          align="center"
          justify="center"
          bg={rbgc('regular-background.bg-3')}
        >
          <Icon name="check" size={32} color={rbgc('accent-background.bg-3')} />
        </Flex>
      </Center>
      <Stack gap={8}>
        <Title
          size="xxl"
          ta="center"
          fw="bold"
          c={rcc('regular-content.primary')}
        >
          {formatMessage({
            id: 'card.settings.steps.pin.success.title',
            defaultMessage: 'Congratulations!',
          })}
        </Title>
        <Text ta="center" c={rcc('regular-content.secondary')}>
          {isSetPinForm
            ? formatMessage({
                id: 'card.settings.steps.pin.success.activate.description',
                defaultMessage: "You've successfully activated your card",
              })
            : formatMessage({
                id: 'card.settings.steps.pin.success.description',
                defaultMessage: 'Your PIN has been successfully updated',
              })}
        </Text>
      </Stack>
      <Button className={styles.button} onClick={onClose}>
        {formatMessage({
          id: 'common.got_it',
          defaultMessage: 'Got it!',
        })}
      </Button>
    </Stack>
  );
};
