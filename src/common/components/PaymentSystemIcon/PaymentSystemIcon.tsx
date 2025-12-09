import { Image } from '@mantine/core';

import MasterCardIcon from '@/assets/images/icons/mastercard.svg';
import VisaIcon from '@/assets/images/icons/visa.svg';
import UnionPayIcon from '@/assets/images/icons/union-pay.svg';
import HumoCard from '@/assets/images/icons/humo.svg';
import CreditCard from '@/assets/images/icons/credit-card.svg';

interface PaymentSystemIconProps {
  paymentSystem: string;
  size?: number;
}

const iconsMap = {
  visa: { src: VisaIcon, alt: 'Visa' },
  mastercard: { src: MasterCardIcon, alt: 'MasterCard' },
  maestro: { src: MasterCardIcon, alt: 'MasterCard' },
  unionpay: { src: UnionPayIcon, alt: 'UnionPay' },
  humo: { src: HumoCard, alt: 'Humo' },
  unknown: { src: CreditCard, alt: 'Unknown card' },
} as const;

type IconKey = keyof typeof iconsMap;

export const PaymentSystemIcon = ({
  paymentSystem,
  size = 20,
}: PaymentSystemIconProps) => {
  const icon = iconsMap[paymentSystem as IconKey] ?? iconsMap.unknown;

  const { src, alt } = icon ?? { src: CreditCard, alt: 'Unknown card' };

  return <Image src={src} alt={alt} width={size} height={size} />;
};
