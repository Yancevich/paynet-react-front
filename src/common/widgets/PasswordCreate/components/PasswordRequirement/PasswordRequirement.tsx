import { FC } from 'react';
import { Group, Text } from '@mantine/core';

import { Icon } from '@/common/components/Icon';

interface PasswordRequirementProps {
  isMatch: boolean;
  label: string;
}

export const PasswordRequirement: FC<PasswordRequirementProps> = (props) => {
  const { isMatch, label } = props;

  const color = isMatch
    ? 'positive-content.1'
    : 'var(--regular-disabled-content)';

  return (
    <Text component="div" c={color} size="md">
      <Group gap={4}>
        <Icon name={isMatch ? 'check' : 'dot'} />
        {label}
      </Group>
    </Text>
  );
};
