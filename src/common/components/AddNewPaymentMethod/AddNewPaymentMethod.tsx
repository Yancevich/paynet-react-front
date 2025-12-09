import { Center, Flex, Stack, Text } from '@mantine/core';
import { useIntl } from 'react-intl';
import { useDisclosure } from '@mantine/hooks';

import { Icon } from '@/common/components/Icon';
import { AddCardModal } from '@/common/widgets/AddCardModal';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './addNewPaymentMethod.module.css';

export const AddNewPaymentMethod = () => {
  const intl = useIntl();
  const { rcc } = useThemeColors();
  const [opened, handler] = useDisclosure();

  return (
    <>
      <Flex
        justify="space-between"
        w="100%"
        align="center"
        style={{
          cursor: 'pointer',
        }}
        onClick={handler.open}
      >
        <Flex gap={12}>
          <Center className={classes.iconContainer}>
            <Icon name="card" size={20} />
          </Center>

          <Stack gap={4}>
            <Text size="md" fw={700} c={rcc('regular-content.primary')}>
              {intl.formatMessage({
                id: 'components.add_new_payment_method.title',
                defaultMessage: 'New card',
              })}
            </Text>

            <Text size="sm" c={rcc('regular-content.tetriary')} fw={700}>
              {intl.formatMessage({
                id: 'components.add_new_payment_method.subtitle',
                defaultMessage: "You don't have any saved cards yet.",
              })}
            </Text>
          </Stack>
        </Flex>

        <Icon name="plus" size={20} />
      </Flex>

      <AddCardModal opened={opened} onClose={handler.close} />
    </>
  );
};
