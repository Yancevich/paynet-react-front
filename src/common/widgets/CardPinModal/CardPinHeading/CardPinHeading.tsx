import { BackButton } from "@/common/components";

import { CardPinFormSteps } from "../types";

interface CardPinHeadingProps {
  step: CardPinFormSteps;
  setStep: (step: CardPinFormSteps) => void;
  onBack: () => void;
}

export const CardPinHeading = ({step, setStep, onBack}: CardPinHeadingProps) => {
  const handleBack = () => {
    if (step === CardPinFormSteps.ConfirmPin) {
      setStep(CardPinFormSteps.EnterPin);
      return;
    }

    onBack();
  };

  if (step === CardPinFormSteps.Success) {
    return null;
  }

  return <BackButton onClick={handleBack} />;
};
