import { ReactNode } from 'react';
import { Drawer, Modal } from '@mantine/core';

import { useUi } from '@/contexts/UiContext';

interface ModalDrawerProps {
  opened: boolean;
  close: () => void;
  children: ReactNode;
  drawerSize?: number | string;
  zIndex?: number;
  withCloseButton?: boolean
}

export const ModalDrawer = ({
  opened,
  children,
  close,
  drawerSize = 'lg',
  zIndex,
  withCloseButton = true,
}: ModalDrawerProps) => {
  const { isMobile } = useUi();

  if (isMobile)
    return (
      <Drawer
        keepMounted
        opened={opened}
        onClose={close}
        position="bottom"
        size={drawerSize}
        zIndex={zIndex}
        withCloseButton={withCloseButton}
      >
        {children}
      </Drawer>
    );
  return (
    <Modal
      keepMounted
      opened={opened}
      onClose={close}
      centered
      style={{ overflow: 'hidden' }}
      zIndex={zIndex}
      withCloseButton={withCloseButton}
    >
      {children}
    </Modal>
  );
};
