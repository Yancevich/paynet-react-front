import { Box, Menu, Modal, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useIntl } from 'react-intl';
import { ReactNode } from 'react';

import { useUi } from '@/contexts';
import PopoverItem from '@/common/components/ProfileMenu/components/PopoverItem';
import { TokenWithDescription } from '@/api/currency';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface TokenSelectProps {
  tokens: TokenWithDescription[];
  selectToken: (token: TokenWithDescription) => void;
  target: ReactNode;
}

export const TokenSelect = ({
  tokens,
  selectToken,
  target,
}: TokenSelectProps) => {
  const { formatMessage } = useIntl();
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();
  const [opened, { toggle, open }] = useDisclosure();

  const onSelectTokenHandler = (token: TokenWithDescription) => {
    selectToken(token);
    toggle();
  };

  return (
    <Menu withinPortal position="bottom-end" width="target">
      <Menu.Target>
        <Box w="100%" onClick={() => isMobile && open()}>
          {target}
        </Box>
      </Menu.Target>

      {!isMobile ? (
        <Menu.Dropdown>
          <Stack gap={8}>
            {tokens
              ? tokens.map((token) => (
                  <PopoverItem
                    key={token.id}
                    onClick={() => onSelectTokenHandler(token)}
                    label={token.blockchain?.name ?? ''}
                    contentColor={rcc('regular-content.secondary')}
                  />
                ))
              : null}
          </Stack>
        </Menu.Dropdown>
      ) : (
        <Modal opened={opened} onClose={toggle} keepMounted>
          <Stack gap={32}>
            <Title
              order={2}
              size="lg"
              c={rcc('regular-content.secondary')}
              ta="center"
            >
              {formatMessage({
                id: 'widget.token_select.title',
                defaultMessage: 'Select network',
              })}
            </Title>
            <Stack gap={8}>
              {tokens ? (
                tokens.map((token) => (
                  <PopoverItem
                    key={token.id}
                    onClick={() => onSelectTokenHandler(token)}
                    label={token?.blockchain?.name ?? ''}
                    contentColor={rcc('regular-content.secondary')}
                  />
                ))
              ) : (
                <Text c={rcc('regular-content.primary')}>Nothing founded</Text>
              )}
            </Stack>
          </Stack>
        </Modal>
      )}
    </Menu>
  );
};
