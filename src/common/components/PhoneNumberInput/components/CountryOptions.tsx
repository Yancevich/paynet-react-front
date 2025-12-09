import React from 'react';
import { Combobox, Flex, Text } from '@mantine/core';

import { Country } from '@/types';
import { useThemeColors } from '@/theme/useThemeColors.ts';
import { EmojiIcon } from '@/common/components/EmojiIcon';

type CountryOptionsProps = {
  countries: Country[];
  onSelect: (country: Country) => void;
};

export const CountryOptions: React.FC<CountryOptionsProps> = ({
  countries,
  onSelect,
}) => {
  const { rcc } = useThemeColors();

  return (
    <>
      {countries.length > 0 ? (
        countries.map((country) => (
          <Combobox.Option
            value={JSON.stringify(country)}
            key={country.name}
            onClick={() => onSelect(country)}
          >
            <Flex gap={8}>
              <EmojiIcon>{country.flag}</EmojiIcon>
              <Text size="lg" c={rcc('regular-content.tetriary')}>
                {country.name} +{country.dialCode}
              </Text>
            </Flex>
          </Combobox.Option>
        ))
      ) : (
        <Combobox.Empty>Nothing found</Combobox.Empty>
      )}
    </>
  );
};
