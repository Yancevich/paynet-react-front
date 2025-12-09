import { Box, Flex, Text, Title } from '@mantine/core';

import { Icon } from '@/common/components/Icon';

import styles from './Info.module.css';

type InfoProps = {
  title?: string;
  message?: string;
};

export const Info = ({ title, message }: InfoProps) => {
  return (
    <Box className={styles.info}>
      <Flex gap="sm" align="center">
        <Icon name="info" className={styles.icon} />
        <Box>
          {title && (
            <Title order={3} size="md" mb={4}>
              {title}
            </Title>
          )}

          {message && <Text size="md">{message}</Text>}
        </Box>
      </Flex>
    </Box>
  );
};
