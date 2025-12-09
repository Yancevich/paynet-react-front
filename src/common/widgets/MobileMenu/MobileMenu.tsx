import { Flex } from '@mantine/core';
import { useLocation } from 'react-router';

import SidebarButton from '@/common/widgets/Sidebar/components/SidebarButton';
import { useVerification } from '@/store/verification';
import { useLinks } from '@/routes/useLinks';

type MobileMenuProps = {
  sidebarOpened: boolean;
  toggleSidebar: () => void;
};

export const MobileMenu = ({
  toggleSidebar,
  sidebarOpened,
}: MobileMenuProps) => {
  const location = useLocation();
  const { isUiAllowed } = useVerification();
  const { mobileAppLinks } = useLinks();

  return (
    <Flex align="center" w="100%" justify="space-between" pl={12} pr={12}>
      {mobileAppLinks.map((item) => {
        const isActive =
          item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);
        const available = isUiAllowed || item.path === '/';

        const isCards =
          item.path === '/cards' &&
          (location.pathname.startsWith('/cards') ||
            location.pathname.startsWith('/add-new-card'));

        return (
          <SidebarButton
            key={item.path}
            isCollapsed={false}
            navigateItem={item}
            isMobile={true}
            active={isActive || isCards}
            soon={item.disabled}
            disabled={!available}
          />
        );
      })}

      <SidebarButton
        isButton
        action={toggleSidebar}
        isCollapsed={false}
        navigateItem={{
          label: 'widget.sidebar.list.more',
          defaultMessage: 'More',
          icon: sidebarOpened ? 'close' : 'menu',
          path: 'more',
        }}
        isMobile={true}
      />
    </Flex>
  );
};
