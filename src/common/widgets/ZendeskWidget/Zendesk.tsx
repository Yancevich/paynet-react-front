import React, { useEffect } from 'react';

import SidebarButton from '@/common/widgets/Sidebar/components/SidebarButton';
import { useUi } from '@/contexts';

interface ZendeskWidgetProps {
  isCollapsed: boolean;
  closeSidebar: () => void;
}

export const ZendeskWidget = ({
  isCollapsed,
  closeSidebar,
}: ZendeskWidgetProps) => {
  const { isMobile } = useUi();

  const openZendesk = () => {
    if (zE) {
      window.zE('messenger', 'show');
      window.zE('messenger', 'open');
      closeSidebar();
    }
  };

  useEffect(() => {
    window.zE('messenger:on', 'close', () => {
      if (!isMobile) {
        const timeout = setTimeout(
          () => {
            window.zE('messenger', 'hide');
          },
          10 * 60 * 1000
        );

        return () => clearTimeout(timeout);
      } else {
        window.zE('messenger', 'hide');
      }
    });
  }, [isMobile]);

  return (
    <SidebarButton
      isMobile={false}
      isCollapsed={isCollapsed}
      navigateItem={{
        path: 'help',
        icon: 'circle-help',
        label: 'widget.sidebar.list.support',
        defaultMessage: 'Support',
      }}
      isButton
      action={openZendesk}
      active={false}
    />
  );
};
