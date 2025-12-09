import { Box, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { useIntl } from 'react-intl';

import { useThemeColors } from '@/theme/useThemeColors.ts';

import styles from './styles.module.css';

export const EmptyOperationsMessage = () => {
  const { formatMessage } = useIntl();
  const { rcc } = useThemeColors();
  return (
    <Box className={styles.box}>
      <Stack gap={24} align="center">
        <Title size="sm">
          {formatMessage({
            id: 'component.empty_operations_message.empty_message.title',
            defaultMessage: 'No transactions yet',
          })}
        </Title>
        <Text c={rcc('regular-content.tetriary')} size="sm">
          {formatMessage({
            id: 'component.empty_operations_message.empty_message.description',
            defaultMessage:
              'Once you start using your card, your history will appear here.',
          })}
        </Text>
      </Stack>
    </Box>
  );
};
