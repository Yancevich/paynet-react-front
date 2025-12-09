import { Modal, ScrollArea } from '@mantine/core';

import { Enable2faStep, use2fa } from '@/store/2fa';
import { Select2FAMethod } from '@/pages/Settings/nested/Security/widgets/Select2FAMethod';
import { GoogleAuthCreate } from '@/pages/Settings/nested/Security/widgets/Google2FACreate';

interface Enable2faModalProps {
  opened: boolean;
  onClose: () => void;
}
export const Enable2faModal = ({ opened, onClose }: Enable2faModalProps) => {
  const { step } = use2fa();

  const renderStep = () => {
    switch (step) {
      case Enable2faStep.SELECT_METHOD:
        return <Select2FAMethod />;
      case Enable2faStep.DOWNLOAD_APP:
        return <GoogleAuthCreate onFinished={onClose} />;
      case Enable2faStep.ADD_APP_KEY:
        return <GoogleAuthCreate onFinished={onClose} />;
      case Enable2faStep.ENTER_APP_CODE:
        return <GoogleAuthCreate onFinished={onClose} />;
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {renderStep()}
    </Modal>
  );
};
