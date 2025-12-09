import { Box, Flex, Text } from '@mantine/core';

import { Icon } from '@/common/components/Icon';
import classes from '@/common/components/CurrentAsset/currentAsset.module.css';
import { IconName } from '@/assets/icons';

interface SelectButtonProps {
  title: string;
  icon?: IconName;
}

export const SelectButton = ({ title, icon }: SelectButtonProps) => {
  return (
    <Box className={classes.root}>
      <Flex classNames={{ root: classes.info }}>
        <Text classNames={{ root: classes.title }}>{title}</Text>
      </Flex>
      <Icon name={icon || 'chevron-down'} />
    </Box>
  );
};
