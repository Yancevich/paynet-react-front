import { Menu, StyleProp, Text } from '@mantine/core';

import { Icon } from '@/common/components/Icon';
import { IconName } from '@/assets/icons';

import classes from './popoverItem.module.css';

type PopoverItemProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onClick: () => void;
  label: string;
  icon?: IconName;
  contentColor: StyleProp<string> | undefined;
};

export const PopoverItem = ({
  label,
  size = 'md',
  icon,
  contentColor,
  onClick,
}: PopoverItemProps) => {
  return (
    <Menu.Item
      onClick={onClick}
      leftSection={icon ? <Icon name={icon} /> : null}
      className={classes.popoverItem}
      c={contentColor}
    >
      <Text size={size} c={contentColor}>
        {label}
      </Text>
    </Menu.Item>
  );
};
