import BigNumber from 'bignumber.js';
import { useAtomValue } from 'jotai';
import { NumberFormatter } from '@mantine/core';

import { currencyBySlugAtom } from '@/store/currencies';

interface FormattedAmountProps {
  amount: string;
  slug: string;
  hideSymbol?: boolean;
  hideValue?: boolean;
  previewCalc?: boolean;
}

export const FormattedAmount = ({
  amount,
  slug,
  hideSymbol,
  hideValue,
  previewCalc,
}: FormattedAmountProps) => {
  const currencyObject = useAtomValue(currencyBySlugAtom(slug.toLocaleLowerCase()));

  let prefix = '';
  let suffix = '';

  if (!hideSymbol) {
    if (slug === 'usd') {
      prefix = '$';
    } else if (slug === 'eur') {
      prefix = '€';
    } else {
      suffix = ` ${currencyObject?.shortName}`;
    }
  }

  if (hideValue) {
    return (
      <>
        {prefix}***{suffix}
      </>
    );
  }

  const formatAmount = (value: string | number) => {
    const rawString = typeof value === 'number' ? value.toFixed(18) : value;
    const numValue = parseFloat(rawString);

    if (isNaN(numValue)) {
      return '0';
    }

    const precision = previewCalc
      ? (currencyObject?.decimals ?? 2)
      : (currencyObject?.totalsPrecision ?? 2);

    return new BigNumber(value)
      .absoluteValue()
      .decimalPlaces(precision, BigNumber.ROUND_DOWN)
      .toFixed();
  };

  return (
    <NumberFormatter
      prefix={prefix}
      suffix={suffix}
      value={formatAmount(amount)}
      thousandSeparator=" "
    />
  );
};
