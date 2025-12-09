import { ActionIcon, Flex, Text, UnstyledButton } from '@mantine/core';

import { Icon } from '@/common/components/Icon';
import { IconName } from '@/assets/icons';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './SelectActionButton.module.css';

interface SelectActionButtonProps {
  title: string;
  icon: IconName;
  onClick: () => void;
}

export const SelectActionButton = ({
  title,
  icon,
  onClick,
}: SelectActionButtonProps) => {
  const { rcc } = useThemeColors();
  return (
    <UnstyledButton
      classNames={{ root: classes.button }}
      p={16}
      onClick={onClick}
    >
      <Flex
        gap={4}
        align="center"
        justify="space-between"
        c={rcc('regular-content.primary')}
      >
        <Text size="md" c={rcc('regular-content.primary')}>
          {title}
        </Text>
        <Icon name="chevron-right" />
      </Flex>

      <ActionIcon variant="secondary" component="span" size={44} radius={12}>
        <Icon name={icon} />
      </ActionIcon>
    </UnstyledButton>
  );
};
