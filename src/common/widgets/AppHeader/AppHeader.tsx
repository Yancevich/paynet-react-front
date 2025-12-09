import { Flex } from '@mantine/core';

import { ProfileMenu } from '@/common/components/ProfileMenu';
import { BackPageAnchor } from '@/common/components/BackPageAnchor';

export const AppHeader = () => {
  return (
    <>
      <BackPageAnchor />
      <Flex gap={12} align="center" ml="auto">
        <ProfileMenu />
      </Flex>
    </>
  );
};
