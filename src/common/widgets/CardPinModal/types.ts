export const enum CardPinFormSteps {
  EnterPin,
  ConfirmPin,
  Success
}

export type CardPinModalType = 'set' | 'change';

export type CardPinFormStep = 'set' | 'confirm';

type FormatMessage = {
  id: string;
  defaultMessage: string;
}

export type CardPinMessageConfig = {
  title: FormatMessage;
  continue: FormatMessage;
  cancel: FormatMessage;
};
