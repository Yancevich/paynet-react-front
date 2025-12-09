import { useState } from 'react';
import { Modal } from '@mantine/core';

import { CardPinSuccessMessage } from './CardPinSuccessMessage';
import { CardPinForm } from './CardPinForm';
import { CardPinHeading } from './CardPinHeading';
import { CardPinFormSteps, CardPinModalType } from './types';

interface CardPinModalProps {
  opened: boolean;
  onClose: () => void;
  onBack: () => void;
  cardId?: string;
  modalType: CardPinModalType;
}

export const CardPinModal = ({
  opened, onClose, onBack, cardId, modalType
}: CardPinModalProps) => {
  const [step, setStep] = useState(CardPinFormSteps.EnterPin);

  const renderStep: Record<CardPinFormSteps, JSX.Element> = {
    [CardPinFormSteps.EnterPin]: (
      <CardPinForm
        formStep="set"
        modalType={modalType}
        cardId={cardId}
        onClose={onClose}
        onNext={() => setStep(CardPinFormSteps.ConfirmPin)}
      />
    ),
    [CardPinFormSteps.ConfirmPin]: (
      <CardPinForm
        formStep="confirm"
        modalType={modalType}
        cardId={cardId}
        onClose={onClose}
        onNext={() => setStep(CardPinFormSteps.Success)}
      />
    ),
    [CardPinFormSteps.Success]: (
      <CardPinSuccessMessage
        modalType={modalType}
        onClose={onClose}
      />
    ),
  };

  const handleClose = () => {
    setStep(CardPinFormSteps.EnterPin);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={(
        <CardPinHeading
          step={step}
          setStep={setStep}
          onBack={onBack}
        />
      )}
      centered
    >
      {renderStep[step]}
    </Modal>
  );
};
