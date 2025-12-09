import React, { useEffect, useState } from 'react';
import { Button, Flex, Modal, Stack, Text, Title } from '@mantine/core';
import { useIntl } from 'react-intl';
import { useDisclosure } from '@mantine/hooks';

import { SelectCardList } from '@/common/widgets/SelectCardModal/components/SelectCardList';
import { CardDtoExtended, usePaymentMethods } from '@/store/paymentMethods';
import { Icon } from '@/common/components/Icon';
import { AddCardModal } from '@/common/widgets/AddCardModal';
import { showNotification } from '@/utils';
import { DeleteApproveModal } from '@/pages/Settings/nested/PaymentMethods/widgets/DeleteApproveModal';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface SelectCardModalProps {
  opened: boolean;
  onClose: () => void;
}

export const SelectCardModal = ({ opened, onClose }: SelectCardModalProps) => {
  const intl = useIntl();
  const [addNewCardModalOpened, addNewCardModalHandler] = useDisclosure();
  const { paymentMethods, setPreferredPaymentMethod } = usePaymentMethods();
  const [cardToDelete, setCardToDelete] = useState<
    CardDtoExtended | undefined
  >();
  const { rcc } = useThemeColors();

  const [selectedCardId, setSelectedCardId] = React.useState<string | null>(
    paymentMethods.find((card) => card.preferred)?.id || null
  );

  const handleSelectPaymentMethod = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  useEffect(() => {
    setSelectedCardId(
      paymentMethods.find((card) => card.preferred)?.id || null
    );
  }, [paymentMethods]);

  const handleSaveSelectedCard = async () => {
    try {
      if (selectedCardId) {
        await setPreferredPaymentMethod(selectedCardId);
        showNotification(
          intl.formatMessage({
            id: 'widget.payment_methods_list.success',
            defaultMessage: 'Selected card saved successfully',
          }),
          true
        );
        onClose();
      }
    } catch (e) {
      console.error(e);
      showNotification(
        intl.formatMessage({
          id: 'widget.payment_methods_list.fail',
          defaultMessage: 'Failed to save selected card',
        }),
        false
      );
      onClose();
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={onClose} centered>
        <Stack gap={32} mt={32} pr={30} style={{ overflow: 'auto' }} mah={500}>
          <Stack align="center">
            <Title order={2} size="lg" c={rcc('regular-content.primary')}>
              {intl.formatMessage({
                id: 'widget.payment_methods_list.title',
                defaultMessage: 'Your bank cards',
              })}
            </Title>
            <Text size="md" c={rcc('regular-content.secondary')}>
              {intl.formatMessage({
                id: 'widget.payment_methods_list.subtitle',
                defaultMessage:
                  'Here you can manage your cards for payments and withdrawals',
              })}
            </Text>
          </Stack>
          <SelectCardList
            paymentMethods={paymentMethods}
            onSelect={handleSelectPaymentMethod}
            selectedPaymentMethodId={selectedCardId}
            onSelectForDelete={setCardToDelete}
          />

          <Flex w="100%" gap={12}>
            <Button
              size="lg"
              w="100%"
              variant="secondary"
              rightSection={<Icon name="plus" />}
              onClick={addNewCardModalHandler.open}
            >
              {intl.formatMessage({
                id: 'widget.payment_methods_list.add_new_card',
                defaultMessage: 'Add new card',
              })}
            </Button>
            <Button size="lg" w="100%" onClick={handleSaveSelectedCard}>
              {intl.formatMessage({
                id: 'widget.payment_methods_list.save',
                defaultMessage: 'Save changes',
              })}
            </Button>
          </Flex>
        </Stack>
      </Modal>

      <AddCardModal
        opened={addNewCardModalOpened}
        onClose={addNewCardModalHandler.close}
      />

      <DeleteApproveModal
        selectedCard={cardToDelete}
        closeModal={() => setCardToDelete(undefined)}
      />
    </>
  );
};
