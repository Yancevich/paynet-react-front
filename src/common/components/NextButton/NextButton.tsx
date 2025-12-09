import { Button } from '@mantine/core';
import { useNavigate } from 'react-router';

import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

type NextButtonProps = {
  label: string;
  path: string;
};

export const NextButton = ({ label, path }: NextButtonProps) => {
  const navigate = useNavigate();
  const { rcc } = useThemeColors();
  return (
    <Button
      onClick={() => navigate(path)}
      c={rcc('regular-content.primary')}
      variant="ghost"
      rightSection={<Icon name="chevron-right" size={20} />}
    >
      {label}
    </Button>
  );
};
