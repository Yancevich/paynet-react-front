import { Button, Flex, Modal, Stack, Text } from '@mantine/core';
import { useIntl } from 'react-intl';

import { useUi } from '@/contexts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface CardIssueGetHelpModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CardIssueGetHelpModal = ({
  opened,
  onClose,
}: CardIssueGetHelpModalProps) => {
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();
  const { formatMessage } = useIntl();

  const handleClose = () => {
    onClose();
  };

  const handleGetHelp = () => {
    if (zE) {
      window.zE('messenger', 'show');
      window.zE('messenger', 'open');
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={handleClose} centered>
      <Stack
        gap={32}
        mah={500}
        style={{
          overflow: 'auto',
        }}
      >
        <Stack gap={0} ta="center">
          <Text fz={22} fw="bold" mb={8} c={rcc('regular-content.primary')}>
            {formatMessage({
              id: 'widget.get_help_modal.title',
              defaultMessage: 'See a mistake in your name?',
            })}
          </Text>
          <Text c={rcc('regular-content.secondary')}>
            {formatMessage({
              id: 'widget.get_help_modal.description',
              defaultMessage:
                'This is the name we received from our KYC provider. If it doesn’t look right, our support team will be happy to help you fix it.',
            })}
          </Text>
        </Stack>
        <Flex w="100%" gap={12} direction={isMobile ? 'column-reverse' : 'row'}>
          <Button
            flex={1}
            variant={isMobile ? 'ghost' : 'secondary'}
            onClick={onClose}
          >
            {formatMessage({
              id: 'common.cancel',
              defaultMessage: 'Cancel',
            })}
          </Button>
          <Button flex={1} variant="accent" onClick={handleGetHelp}>
            {formatMessage({
              id: 'widget.get_help_modal.get_help',
              defaultMessage: 'Get help',
            })}
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};
