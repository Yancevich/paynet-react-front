import { Anchor, Box, Center } from '@mantine/core';
import React from 'react';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const intl = useIntl();
  const { rcc } = useThemeColors();

  return (
    <Anchor
      component="button"
      type="button"
      fw={700}
      size="md"
      onClick={onClick}
      c={rcc('regular-content.primary')}
    >
      <Center inline>
        <Icon name="chevron-left" size={12} />
        <Box ml={2}>
          {intl.formatMessage({
            id: 'common.back',
            defaultMessage: 'Back',
          })}
        </Box>
      </Center>
    </Anchor>
  );
};
