import { Button, Center, Flex, Modal, Stack, Text } from '@mantine/core';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { useUi } from '@/contexts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './index.module.css';

interface NotAvailableCardOfferingModalProps {
  opened: boolean;
  onClose: () => void;
}

export const NotAvailableCardOfferingModal = ({
  opened,
  onClose,
}: NotAvailableCardOfferingModalProps) => {
  const { formatMessage } = useIntl();
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();

  const handleClose = () => {
    onClose();
  };

  const handleContactSupport = () => {
    if (zE) {
      window.zE('messenger', 'show');
      window.zE('messenger', 'open');
    }
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} centered>
      <Stack gap={32} style={{ overflow: 'auto' }} mah={500}>
        <Stack gap={8}>
          <Center className={classes.iconWrapper}>
            <Icon name="globe" size={20} />
          </Center>
          <Text
            fz={22}
            fw={600}
            ta="center"
            lh={1.2}
            c={rcc('regular-content.primary')}
          >
            {formatMessage({
              id: 'widget.select_card_offer.card_ordering_not_available',
              defaultMessage: 'Card ordering is not available for your region',
            })}
          </Text>
          <Text ta="center" c={rcc('regular-content.secondary')}>
            {formatMessage({
              id: 'widget.select_card_offer.card_ordering_not_available_description',
              defaultMessage:
                'In our FAQ you can find the list of countries where card ordering is possible',
            })}
          </Text>
        </Stack>
        <Flex
          wrap={isMobile ? 'wrap' : 'nowrap'}
          mt={32}
          justify="space-between"
          align="center"
          gap="sm"
        >
          <Button
            variant="secondary"
            size="md"
            w="100%"
            onClick={handleContactSupport}
          >
            {formatMessage({
              id: 'widget.select_card_offer.contact_support',
              defaultMessage: 'Contact support',
            })}
          </Button>
          <Button variant="accent" size="md" w="100%" onClick={handleClose}>
            {formatMessage({
              id: 'widget.select_card_offer.ok',
              defaultMessage: 'Ok',
            })}
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};
