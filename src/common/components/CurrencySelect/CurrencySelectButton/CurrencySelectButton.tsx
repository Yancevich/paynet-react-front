import { Avatar, Flex, Title } from '@mantine/core';

import { Currency } from '@/api/currency';
import { Icon } from '@/common/components/Icon';

import classes from './CurrencySelectButton.module.css';

interface CurrencySelectButtonProps {
  currency: Currency;
  selectCurrencyDisabled?: boolean;
}

export const CurrencySelectButton = ({
  currency,
  selectCurrencyDisabled = false,
}: CurrencySelectButtonProps) => {
  return (
    <Flex gap={8} align="center" w="100%">
      <Avatar size={20} src={currency?.iconUrl} alt={currency?.shortName} />

      <Flex gap={4} align="center">
        <Title size="lg">{currency?.shortName}</Title>

        {!selectCurrencyDisabled && (
          <Icon
            name="chevron-down"
            size={16}
            className={classes.dropdownIcon}
            color="var(--regular-primary-content)"
          />
        )}
      </Flex>
    </Flex>
  );
};
