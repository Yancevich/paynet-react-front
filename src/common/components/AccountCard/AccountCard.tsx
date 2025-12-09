import { Badge, Flex, Paper, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router';

import { useUi } from '@/contexts';
import { FormattedAmount } from '@/common/components/FormattedAmount';
import { ROUTES } from '@/routes';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './accountCard.module.css';

type AccountCardProps = {
  accountId: string;
  amount: string;
  slug?: string;
  type: string;
  className?: string;
  accountName: string;
  disabled?: boolean;
  isHiddenBalance: boolean;
};

const accountTypes: Record<string, { title: string; color: string }> = {
  CHECKING: { title: 'Crypto', color: 'var(--warning-default-content)' },
  CARD_PREPAID: { title: 'Card', color: 'var(--information-default-content)' },
};

export const AccountCard = ({
  accountName,
  accountId,
  amount,
  slug,
  type,
  className,
  isHiddenBalance,
}: AccountCardProps) => {
  const { isMobile } = useUi();
  const navigate = useNavigate();
  const { rcc } = useThemeColors();

  return (
    <Paper
      onClick={() => navigate(ROUTES.account.getFullPath(accountId))}
      classNames={{ root: classes.root }}
      className={className}
      h={isMobile ? 100 : 128}
      data-card-type={type}
      p={isMobile ? 12 : 16}
    >
      <Stack gap={isMobile ? 28 : 38}>
        <Flex justify="space-between">
          <Text
            size="lg"
            c={rcc('regular-content.tetriary')}
            className={classes.title}
          >
            {accountName}
          </Text>

          <Badge variant="clear" size={isMobile ? 'xs' : 'md'} tt="none">
            {accountTypes[type] ? accountTypes[type].title : type}
          </Badge>
        </Flex>

        <Text
          c={rcc('regular-content.primary')}
          size={isMobile ? 'xl' : '2xl'}
          classNames={{ root: classes.balance }}
        >
          {isHiddenBalance ? (
            '***'
          ) : (
            <FormattedAmount amount={amount} slug={slug!} previewCalc />
          )}
        </Text>
      </Stack>
    </Paper>
  );
};
