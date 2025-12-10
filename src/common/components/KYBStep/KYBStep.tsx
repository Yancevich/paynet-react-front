import { Flex, Text, UnstyledButton } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './kybStep.module.css';

interface KYBStepProps {
  text?: string;
  defaultText?: string;
  onClick?: () => void;
}

export const KYBStep = ({
  text,
  defaultText,
  onClick,
}: KYBStepProps) => {
  const { rcc } = useThemeColors();
  const { formatMessage } = useIntl();
  return (
    <UnstyledButton
      classNames={{ root: classes.stepContainer }}
      onClick={onClick}
    >
      <Text size="lg" c={rcc('regular-content.primary')}>
        {formatMessage({ id: text, defaultMessage: defaultText })}
      </Text>
      <Flex align="center" gap={12}>
        {/* <Badge
          classNames={{ root: classes.badge }}
          size="sm"
          variant={passed ? 'positive' : 'neutral'}
        >
          {passed
            ? formatMessage({
                id: 'component.kyb_step.badge.finished',
                defaultMessage: 'Finished',
              })
            : formatMessage({
                id: 'component.kyb.step.badge.not_started',
                defaultMessage: 'Not started',
              })}
        </Badge> */}
        <Icon name="chevron-right" />
      </Flex>
    </UnstyledButton>
  );
};
