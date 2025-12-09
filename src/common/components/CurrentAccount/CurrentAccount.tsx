import { Badge, Center, Flex, Text, Title } from '@mantine/core';

import { useUi } from '@/contexts';
import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './currentAccount.module.css';

interface CurrentAccountProps {
  accountName?: string;
  accountType?: string;
  minimal?: boolean;
}

export const CurrentAccount = ({
  accountName,
  accountType,
  minimal,
}: CurrentAccountProps) => {
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();
  const accountTypeTitle = accountType === 'CHECKING' ? 'Crypto' : 'Card';

  const renderChevronIcon = () => (
    <Center style={{ order: isMobile ? 2 : 3 }}>
      <Icon
        name="chevron-down"
        size={16}
        className={classes.icon}
        color="var(--regular-primary-content)"
      />
    </Center>
  );

  return (
    <Flex
      gap={isMobile ? 0 : 16}
      justify={isMobile ? 'space-between' : 'flex-start'}
      align="center"
      miw={0}
      w="100%"
    >
      <Flex gap={8} align="center" miw={0}>
        {!minimal && (
          <Icon
            name="wallet"
            size={16}
            color="var(--regular-primary-content)"
            style={{ flexShrink: 0 }}
          />
        )}

        {minimal ? (
          <Text size="md" c={rcc('regular-content.primary')}>
            {accountName}
          </Text>
        ) : (
          <Title
            size="lg"
            className={classes.title}
            c={rcc('regular-content.primary')}
          >
            {accountName}
          </Title>
        )}

        {isMobile && renderChevronIcon()}
      </Flex>

      {!minimal && (
        <Badge
          size="md"
          variant={accountType === 'CHECKING' ? 'clear' : 'positive'}
          tt="none"
          style={{
            order: isMobile ? 3 : 2,
            flexShrink: 0,
          }}
        >
          {accountTypeTitle}
        </Badge>
      )}

      {!isMobile && renderChevronIcon()}
    </Flex>
  );
};
