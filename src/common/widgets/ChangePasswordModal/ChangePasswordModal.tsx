import { Modal } from '@mantine/core';

import { ResetPassword } from '@/pages/ResetPassword';
import { ResetPasswordAction, useResetPassword } from '@/store/resetPassword';

interface ChangePasswordModalProps {
  opened: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({
  opened,
  onClose,
}: ChangePasswordModalProps) => {
  const { reset } = useResetPassword();

  const onCloseHandler = () => {
    reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onCloseHandler} centered>
      <ResetPassword isSingIn={false} action={ResetPasswordAction.Change} />
    </Modal>
  );
};
