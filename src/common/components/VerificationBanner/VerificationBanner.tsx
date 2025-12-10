import { Box, Button, Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { useIntl } from 'react-intl';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router';

import {
  UserType,
  VerificationLevel,
  VerificationType,
} from '@/api/registration/types';
import { Icon } from '@/common/components/Icon';
import { useVerification } from '@/store/verification';
import { SumSubModal } from '@/common/widgets/SumSubModal';
import { useUi } from '@/contexts';
import { showNotification } from '@/utils';
import { useAuth } from '@/store/auth';
import { ROUTES } from '@/routes';

import { getBannerData, VerificationLevelShorted } from './bannerInfo';
import classes from './verificationBanner.module.css';

function isVerificationType(value: unknown): value is VerificationType {
  return Object.values(VerificationType).includes(
    value as VerificationType
  );
}

export const VerificationBanner = () => {
  const intl = useIntl();
  const { isMobile } = useUi();
  const navigate = useNavigate();
  const { verificationStatus, sumSubToken, getSumSubToken } = useVerification();
  const { userInfo } = useAuth();
  const [sumSubModalOpened, sumSubModalHandlers] = useDisclosure(false);

  const status = verificationStatus?.status;

  if (!status || !userInfo || !verificationStatus?.type) {
    return null;
  }

  const handleActionClick = async () => {
    try {
      if (userInfo.userType === UserType.CUSTOMER) {
        await getSumSubToken(
          verificationStatus.level === VerificationLevel.L2
            ? VerificationLevel.L2
            : VerificationLevel.L1
        );
        sumSubModalHandlers.open();
      } else if (userInfo.userType === UserType.BUSINESS) {
        navigate(ROUTES.kyb.path);
      }
    } catch {
      showNotification('Failed to upgrade verification level', false);
    }
  };

  if (
    !verificationStatus?.type ||
    !isVerificationType(verificationStatus.type)
  ) {
    console.warn('Invalid verification type:', verificationStatus?.type);
    return null;
  }

  const data = getBannerData(
    verificationStatus.type,
    status,
    intl,
    verificationStatus.level as VerificationLevelShorted | undefined
  );

  if (!data) return null;

  const { title, description, button } = data;

  return (
    <>
      <Paper className={classes.container} data-status={status}>
        <Flex
          justify="space-between"
          align={isMobile ? 'flex-start' : 'center'}
          direction={isMobile ? 'column' : 'row'}
          gap={isMobile ? 12 : 0}
        >
          <Flex gap={12} align="flex-start">
            <Icon
              className={classes.icon}
              name="circle-alert"
              data-status={status}
              size={20}
            />
            <Stack gap={4}>
              <Title order={2} size="lg">
                {title}
              </Title>
              <Text size="md">{description}</Text>
            </Stack>
          </Flex>

          {button && (
            <Box pl={isMobile ? 24 : 0}>
              <Button
                variant="primary"
                onClick={handleActionClick}
                size={isMobile ? 'sm' : 'md'}
              >
                {button}
              </Button>
            </Box>
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
