import { Paper, Text } from '@mantine/core';

import { CopyButton } from '@/common/components/CopyButton/CopyButton';

import classes from './copyLine.module.css';

interface CopyLineProps {
  value: string;
  paddings?: boolean;
}

export const CopyLine = ({ value, paddings = true }: CopyLineProps) => {
  return (
    <Paper pl={paddings ? 12 : 0} pr={paddings ? 12 : 0} classNames={classes}>
      <Text size="md" fw={600}>
        {value}
      </Text>
      <CopyButton text={value} />
    </Paper>
  );
};
