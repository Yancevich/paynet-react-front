import { Drawer } from '@mantine/core';
import { ReactNode } from 'react';

import { useUi } from '@/contexts';
import { PageBlockLayout } from '@/layout/PageBlockLayout';

interface PaperDrawerProps {
  children: ReactNode;
  opened: boolean;
  toggle: () => void;
}

export const PaperDrawer = ({ children, opened, toggle }: PaperDrawerProps) => {
  const { isMobile } = useUi();

  if (isMobile)
    return (
      <Drawer opened={opened} onClose={toggle} position="bottom">
        {children}
      </Drawer>
    );

  return <PageBlockLayout>{children}</PageBlockLayout>;
};
