import { Box, Flex, Text } from '@mantine/core';

import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import styles from './Error.module.css';

type ErrorProps = {
  error: string;
};

export const Error = ({ error }: ErrorProps) => {
  const { rcc } = useThemeColors();
  return (
    <Box className={styles.error}>
      <Flex gap="sm" align="center">
        <Icon name="triangle-alert" className={styles.icon} />
        <Text size="lg" c={rcc('negative-content.primary')}>
          {error}
        </Text>
      </Flex>
    </Box>
  );
};
