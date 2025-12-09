import {
  Button,
  Center,
  Flex,
  Paper,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useIntl } from 'react-intl';
import { useDisclosure } from '@mantine/hooks';

import { useVerification } from '@/store/verification';
import { Icon } from '@/common/components/Icon';
import {
  VerificationLevel,
  VerificationStatus,
} from '@/api/registration/types';
import { useUi } from '@/contexts';
import { SumSubModal } from '@/common/widgets/SumSubModal';
import { showNotification } from '@/utils';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './KYCLevelStatusBadge.module.css';

export const KYCLevelStatusBadge = () => {
  const intl = useIntl();
  const { isMobile } = useUi();
  const { colorScheme } = useMantineColorScheme();
  const { rcc } = useThemeColors();
  const isLight = colorScheme === 'light';

  const { verificationStatus, sumSubToken, getSumSubToken } = useVerification();
  const [sumSubModalOpened, sumSubModalHandlers] = useDisclosure(false);

  if (verificationStatus?.status !== VerificationStatus.GREEN) {
    return null;
  }

  const verificationStatusText = {
    L1: intl.formatMessage({
      id: 'components.verification_status_badge.level_1',
      defaultMessage: 'Basic',
    }),
    L2: intl.formatMessage({
      id: 'components.verification_status_badge.level_2',
      defaultMessage: 'Advanced',
    }),
  };

  const canUpgrade =
    verificationStatus.status === VerificationStatus.GREEN &&
    verificationStatus?.level === VerificationLevel.L1;

  const upgrade = async () => {
    try {
      if (verificationStatus?.level === VerificationLevel.L1) {
        await getSumSubToken(VerificationLevel.L2);
        sumSubModalHandlers.open();
      }
    } catch {
      showNotification('Failed to upgrade verification level', false);
    }
  };

  return (
    <>
      <Paper className={classes.container} w={isMobile ? '100%' : undefined}>
        <Flex
          gap={isMobile ? undefined : 48}
          align="center"
          justify={isMobile ? 'space-between' : undefined}
        >
          <Flex gap={8}>
            <Center className={classes.iconContainer}>
              <Icon
                name="id-card"
                size={20}
                color={
                  isLight ? 'var(--regular-border-5)' : 'var(--accent-border-4)'
                }
              />
            </Center>

            <Stack gap={0}>
              <Text size="md" c={rcc('regular-content.tetriary')}>
                {intl.formatMessage({
                  id: 'components.verification_status_badge.title',
                  defaultMessage: 'Verification',
                })}
              </Text>
              <Text
                size={isMobile ? 'md' : 'lg'}
                c={rcc('regular-content.primary')}
              >
                {
                  verificationStatusText[
                    verificationStatus?.level === VerificationLevel.L1
                      ? 'L1'
                      : 'L2'
                  ]
                }
              </Text>
            </Stack>
          </Flex>
          {canUpgrade && (
            <Button onClick={upgrade}>
              {intl.formatMessage({
                id: 'widgets.verification_status_badge.upgrade',
                defaultMessage: 'Upgrade level',
              })}
            </Button>
          )}
        </Flex>
      </Paper>

      {sumSubToken && (
        <SumSubModal
          opened={sumSubModalOpened}
          accessToken={sumSubToken}
          onClose={sumSubModalHandlers.close}
          expirationHandler={getSumSubToken}
        />
      )}
    </>
  );
};
