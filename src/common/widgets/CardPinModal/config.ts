import { CardPinFormStep, CardPinMessageConfig, CardPinModalType } from "./types";

export const CARD_PIN_MESSAGES: Record<
  CardPinFormStep,
  Record<CardPinModalType, CardPinMessageConfig>
> = {
  set: {
    set: {
      title: { id: 'card.settings.set_pin', defaultMessage: 'Set PIN' },
      continue: { id: 'common.continue', defaultMessage: 'Continue' },
      cancel: { id: 'common.cancel', defaultMessage: 'Cancel' },
    },
    change: {
      title: { id: 'card.settings.enter_pin', defaultMessage: 'Enter new PIN' },
      continue: { id: 'common.continue', defaultMessage: 'Continue' },
      cancel: { id: 'common.cancel', defaultMessage: 'Cancel' },
    },
  },
  confirm: {
    set: {
      title: { id: 'card.settings.confirm_pin', defaultMessage: 'Confirm PIN' },
      continue: { id: 'card.settings.set_pin', defaultMessage: 'Set PIN' },
      cancel: { id: 'common.cancel', defaultMessage: 'Cancel' },
    },
    change: {
      title: { id: 'card.settings.confirm_pin', defaultMessage: 'Confirm PIN' },
      continue: { id: 'common.continue', defaultMessage: 'Continue' },
      cancel: { id: 'common.cancel', defaultMessage: 'Cancel' },
    },
  },
};
