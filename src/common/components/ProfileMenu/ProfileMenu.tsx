import { Avatar, Flex, Menu, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';

import PopoverItem from '@/common/components/ProfileMenu/components/PopoverItem';
import { useUi } from '@/contexts';
import { Icon } from '@/common/components/Icon';
import { useAuth } from '@/store/auth';
import { useKYB } from '@/store/kyb';
import { ROUTES } from '@/routes';
import { useThemeColors } from '@/theme/useThemeColors.ts';
import { UserType } from '@/api/registration/types';

interface ProfileMenuProps {
  isPrivate?: boolean;
  hideChevron?: boolean;
}

export const ProfileMenu = ({
  isPrivate = false,
  hideChevron,
}: ProfileMenuProps) => {
  const { isMobile } = useUi();
  const { rcc, rbgc, rbdc } = useThemeColors();
  const { formatMessage } = useIntl();
  const { userInfo, userType, logout } = useAuth();
  const { kybBasicInfoData } = useKYB();
  const navigate = useNavigate();

  const isBusinessUser = userType === UserType.BUSINESS;

  const userName = isBusinessUser
    ? (userInfo?.companyName ?? kybBasicInfoData?.legalName)
    : `${userInfo?.firstName ?? ''} ${userInfo?.lastName ?? ''}`.trim();

  const onExitHandler = async () => {
    await logout();
  };

  return (
    <Menu position="bottom-end" width="300">
      <Menu.Target>
        <Flex
          style={{ cursor: 'pointer' }}
          gap={!isMobile ? 40 : 12}
          align="center"
        >
          <Flex gap={12} align="center">
            <Avatar
              color={rbdc('regular-borders.border-5')}
              c={rbdc('regular-borders.border-5')}
              bg={rbgc('alpha-background.bg-2')}
              radius={isMobile ? 32 : 'xl'}
            >
              <Icon name="user" fill="currentColor" width={20} height={20} />
            </Avatar>
            {!isMobile || !isPrivate ? (
              <Stack gap={2}>
                <Text
                  size={isMobile ? 'md' : 'lg'}
                  c={rcc('regular-content.primary')}
                >
                  {userName}
                </Text>
              </Stack>
            ) : null}
          </Flex>
          {!hideChevron ? (
            <Icon name="chevron-down" width={20} height={20} />
          ) : null}
        </Flex>
      </Menu.Target>
      <Menu.Dropdown w={160}>
        {!isPrivate ? (
          <PopoverItem
            onClick={() => navigate(ROUTES.settings.fullPath)}
            label={formatMessage({
              id: 'component.profile_menu.settings',
              defaultMessage: 'Settings',
            })}
            contentColor={rcc('regular-content.primary')}
            icon="settings"
          />
        ) : null}
        <PopoverItem
          onClick={onExitHandler}
          label={formatMessage({
            id: 'component.profile_menu.exit',
            defaultMessage: 'Exit',
          })}
          contentColor={rcc('regular-content.primary')}
          icon="exit"
        />
      </Menu.Dropdown>
    </Menu>
  );
};
