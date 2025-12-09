import { Button, Flex, PinInput, Stack, Title } from '@mantine/core';
import { useIntl } from 'react-intl';
import { useCallback, useEffect, useState } from 'react';

import { useUi } from '@/contexts';
import { useActivateCryptoCard } from '@/store/activateCryptoCard';
import { showNotification } from '@/utils';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import { CardPinFormStep, CardPinModalType } from '../types';
import { CARD_PIN_MESSAGES } from '../config';

import styles from './CardPinForm.module.css';

interface CardPinFormProps {
  formStep: CardPinFormStep;
  cardId?: string;
  onClose: () => void;
  onNext: () => void;
  modalType: CardPinModalType;
}

export const CardPinForm = ({
  formStep,
  cardId,
  onClose,
  onNext,
  modalType,
}: CardPinFormProps) => {
  const { isMobile } = useUi();
  const { formatMessage } = useIntl();
  const { rcc } = useThemeColors();

  const {
    activeCard,
    setActiveCard,
    cardPin,
    setCardPin,
    confirmPin,
    setConfirmPin,
    submitCardPin,
    isPinLoading,
  } = useActivateCryptoCard();

  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(false);

  const config = CARD_PIN_MESSAGES[formStep][modalType];

  const clearPinForms = () => {
    setCardPin('');
    setConfirmPin('');
  };

  useEffect(() => {
    if (cardId) {
      setActiveCard(cardId);
      clearPinForms();
    }
  }, []);

  const handleCloseForm = () => {
    clearPinForms();
    setIsDisabled(true);

    onClose();
  };

  const handleChangePin = useCallback(
    (pin: string) => {
      if (error) setError(false);

      if (formStep === 'set') {
        setCardPin(pin);
        setIsDisabled(pin.length !== 4);
      } else {
        setConfirmPin(pin);
        setIsDisabled(pin.length !== 4 || pin !== cardPin);
      }
    },
    [formStep, error, cardPin]
  );

  const handleSave = () => {
    if (formStep === 'set') {
      setIsDisabled(true);
      onNext();

      return;
    }

    if (cardPin !== confirmPin) {
      setError(true);
      return;
    }

    void handleSetPin();
  };

  const handleSetPin = async () => {
    if (!activeCard) {
      return;
    }

    const res = await submitCardPin(activeCard, { pin: confirmPin });

    if (!res?.success) {
      showNotification(
        formatMessage({
          id: res.key,
          defaultMessage: res.description,
        }),
        false
      );
      return;
    }

    onNext();
  };

  const handleComplete = () => {
    if (formStep === 'confirm' && cardPin !== confirmPin) {
      setError(true);
      setIsDisabled(true);
    }
  };

  const isSaveDisabled =
    formStep === 'set' ? cardPin.length !== 4 : isDisabled || error;

  return (
    <Stack mt={isMobile ? 24 : 32} gap={isMobile ? 24 : 32}>
      <Flex direction="column" align="center" gap={isMobile ? 24 : 32}>
        <Title
          order={1}
          size="x"
          ta="center"
          c={rcc('regular-content.primary')}
        >
          {formatMessage(config.title)}
        </Title>

        <PinInput
          value={formStep === 'set' ? cardPin : confirmPin}
          onChange={handleChangePin}
          onComplete={handleComplete}
          error={error}
          length={4}
          gap={12}
          size="lg"
          placeholder=""
          className={styles.pininput}
          type="number"
        />
      </Flex>

      <Flex
        direction={isMobile ? 'column-reverse' : 'row'}
        align="center"
        gap={12}
        w="100%"
      >
        <Button
          onClick={handleCloseForm}
          type="button"
          variant={isMobile ? 'ghost' : 'secondary'}
          size="lg"
          w="100%"
          disabled={isPinLoading}
        >
          {formatMessage(config.cancel)}
        </Button>

        <Button
          disabled={isSaveDisabled}
          onClick={handleSave}
          variant="accent"
          size="lg"
          w="100%"
          loading={isPinLoading}
        >
          {formatMessage(config.continue)}
        </Button>
      </Flex>
    </Stack>
  );
};
