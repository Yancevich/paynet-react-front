import { Anchor, Text } from '@mantine/core';

import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './explorerLink.module.css';

interface ExplorerLinkProps {
  link?: string;
  originalHash?: string;
  startLength?: number; // количество символов с начала
  endLength?: number; // количество символов с конца
}

export const ExplorerLink = ({
  link,
  originalHash,
  startLength = 5,
  endLength = 5,
}: ExplorerLinkProps) => {
  const { rcc } = useThemeColors();
  const shortedLink =
    originalHash &&
    `${originalHash.slice(0, startLength)}...${originalHash.slice(-endLength)}`;

  if (!link) return '-';

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Anchor
      classNames={{ root: classes.explorerLink }}
      c={rcc('regular-content.primary')}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <Text size="lg" c={rcc('accent-content.primary')} td="underline">
        {shortedLink}
      </Text>
      <Icon name="external-link" />
    </Anchor>
  );
};
