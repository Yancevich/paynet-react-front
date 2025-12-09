import { Stepper } from '@mantine/core';

import { useUi } from '@/contexts';

export interface StepperStep {
  id: string;
  defaultMessage: string;
}

interface PageStepperProps {
  activeStep: number;
  steps: StepperStep[];
}

export const PageStepper = ({ activeStep, steps }: PageStepperProps) => {
  const { isTablet } = useUi();

  return (
    <Stepper
      active={activeStep}
      size={isTablet ? 'xs' : 'sm'}
      ml={isTablet ? 'auto' : 0}
      mr={isTablet ? 'auto' : 0}
    >
      {steps.map((stepperStep, index) => {
        const isActive = index === activeStep;

        return (
          <Stepper.Step
            key={stepperStep.id}
            icon={isTablet && isActive ? `Step ${index + 1}` : undefined}
            styles={{
              stepIcon: {
                minWidth: isTablet && isActive ? 60 : 36,
                padding: isTablet && isActive ? '0 8px' : 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          />
        );
      })}
    </Stepper>
  );
};
