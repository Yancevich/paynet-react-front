import { useAtomValue } from 'jotai/index';
import { Avatar } from '@mantine/core';

import { currencyBySlugAtom } from '@/store/currencies';

interface CurrencyIconProps {
  slug: string;
  size?: number;
}

export const CurrencyIcon = ({ slug, size = 28 }: CurrencyIconProps) => {
  const currency = useAtomValue(currencyBySlugAtom(slug));

  const iconUrl = currency?.iconUrl;

  if (iconUrl) {
    return <Avatar src={iconUrl} alt={currency.shortName} size={size} />;
  }

  return <Avatar size={size}>{currency?.shortName}</Avatar>;
};
