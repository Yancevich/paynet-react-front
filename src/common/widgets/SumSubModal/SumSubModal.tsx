import { Modal, ScrollArea } from '@mantine/core';
import SumsubWebSdk from '@sumsub/websdk-react';

import { useLanguage } from '@/store/language';
import { useVerification } from '@/store/verification';
import { VerificationType } from '@/api/registration/types';

interface SumSubModalProps {
  opened: boolean;
  accessToken: string;
  onClose: () => void;
  expirationHandler: () => Promise<string>;
}
export const SumSubModal = ({
  opened,
  accessToken,
  onClose,
  expirationHandler,
}: SumSubModalProps) => {
  const { language } = useLanguage();
  const { syncVerificationStatus } = useVerification();

  const onCloseHandler = () => {
    syncVerificationStatus(VerificationType.SUMSUB);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onCloseHandler}
      centered
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <SumsubWebSdk
        accessToken={accessToken}
        config={{
          lang: language.id,
          customizationName: 'Asterium New Design',
          theme: 'dark',
        }}
        options={{
          enableScrollIntoView: true,
          adaptIframeHeight: true,
        }}
        expirationHandler={expirationHandler}
      />
    </Modal>
  );
};
