import { Button, Center, Modal, Stack, Text, Title } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface Disable2faModalProps {
  opened: boolean;
  onClose: () => void;
}

export const Disable2faModal = ({ opened, onClose }: Disable2faModalProps) => {
  const intl = useIntl();
  const { rbgc } = useThemeColors();

  const openZendeskWidget = () => {
    if (typeof zE !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      zE('messenger', 'show');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      zE('messenger', 'open');
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} centered>
      <Stack gap={32}>
        <Stack gap={8} align="center">
          <Center
            w={60}
            h={60}
            bg={rbgc('accent-background.bg-2')}
            style={{ borderRadius: '50%' }}
          >
            <Icon name="headset" size={20} />
          </Center>

          <Title size="xl" ta="center">
            {intl.formatMessage({
              id: 'widget.disable_2fa.title',
              defaultMessage: 'Disable Google Authenticator?',
            })}
          </Title>

          <Text size="lg">
            {intl.formatMessage({
              id: 'widget.disable_2fa.subtitle',
              defaultMessage: 'Our support will quickly help you with this',
            })}
          </Text>
        </Stack>

        <Button fullWidth onClick={openZendeskWidget}>
          {intl.formatMessage({
            id: 'widget.disable_2fa.button',
            defaultMessage: 'Contact support center',
          })}
        </Button>
      </Stack>
    </Modal>
  );
};
