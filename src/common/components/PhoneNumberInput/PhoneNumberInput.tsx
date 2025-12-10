import React, { ChangeEvent, useEffect, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { Combobox, Flex, Text, TextInput, useCombobox } from '@mantine/core';
import { useIntl } from 'react-intl';
import parsePhoneNumber, { CountryCode } from 'libphonenumber-js';

import { Country } from '@/types';
import { useFilteredCountries } from '@/hooks';
import { calculatePhoneMask } from '@/utils';
import { countries } from '@/assets/constants/countries';
import { useThemeColors } from '@/theme/useThemeColors.ts';
import { getPossibleLengths } from '@/utils/getPossibleLengths.ts';
import { Icon } from '@/common/components/Icon';
import { EmojiIcon } from '@/common/components/EmojiIcon';

import { CountryOptions } from './components';

type PhoneNumberInputProps = {
  w?: string | number;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withAsterisk?: boolean;
  onChange: (value: string) => void;
  error?: React.ReactNode;
  country?: Country;
  onBlur?: () => void;
  onCountryChange?: (country: Country) => void;
  label?: { id: string; defaultMessage: string };
  rightSection?: React.ReactNode;
  uzOnly?: boolean;
};

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  w = 'auto',
  value,
  size = 'lg',
  onChange,
  error,
  country,
  onCountryChange,
  onBlur,
  uzOnly,
  withAsterisk,
  required,
  disabled,
  rightSection,
  label = {
    id: 'page.signup.phone_form.phone',
    defaultMessage: 'Phone number',
  },
}) => {
  const intl = useIntl();
  const combobox = useCombobox();
  const inputRef = React.useRef<HTMLInputElement>();
  const [isManuallyTyping, setIsManuallyTyping] = useState(false);
  const { rcc } = useThemeColors();

  const [localValue, setLocalValue] = React.useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const defaultCountry =
    country ?? countries.find((c) => c.codeAlpha2 === 'UZ')!;
  const [localCountry, setLocalCountry] =
    React.useState<Country>(defaultCountry);

  const [search, setSearch] = React.useState('');
  const filteredCountries = useFilteredCountries(search).filter((item) =>
    uzOnly ? item.name === 'Uzbekistan' : true
  );

  const mask = React.useMemo(() => {
    const countryCode = localCountry.codeAlpha2 as CountryCode;
    const lengths = getPossibleLengths(countryCode);

    if (!lengths || lengths.length === 0) {
      return '';
    }

    const maxLength = Math.max(...lengths);

    return `+${localCountry.dialCode.replace(/./g, '\\$&')} ${calculatePhoneMask(
      localCountry.dialCode,
      maxLength
    )}`;
  }, [localCountry]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue.replace(/\s+/g, ''));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();

      const input = inputRef.current;

      if (input) {
        const lastPosition = input.value.trim().length;

        input.setSelectionRange(lastPosition, lastPosition);
      }
    }
  };

  const handleCountryChange = (selectedCountry: Country) => {
    onChange('');
    setSearch('');

    onCountryChange?.(selectedCountry);
    setLocalCountry(selectedCountry);
  };

  const handleSearchCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const moveCursorToEnd = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    const input = inputRef.current;

    if (input) {
      const lastPosition = input.value.trim().length;

      if (
        input.selectionStart &&
        input.selectionStart === input.selectionEnd &&
        input.selectionStart >= lastPosition
      ) {
        input.setSelectionRange(lastPosition, lastPosition);
      }
    }
  };

  // Use effect for country detection by value of phone number
  useEffect(() => {
    if (isManuallyTyping || !value) {
      return;
    }

    const cleanedPhone = value.replace(/\s+/g, '').replace(/^\+/, '');

    const parsePhone = parsePhoneNumber(value);
    const found = countries.find(
      (country) => country.codeAlpha2 === parsePhone?.country
    );
    setLocalCountry(found ?? defaultCountry);
    if (found) {
      const cleanedDialCode = found.dialCode.replace(/^\+/, '');
      const localNumber = cleanedPhone.slice(cleanedDialCode.length);
      setLocalValue(localNumber);
    } else {
      setLocalValue(cleanedPhone);
    }
  }, [value, isManuallyTyping, defaultCountry]);

  return (
    <Combobox
      store={combobox}
      withinPortal
      size="sm"
      disabled={disabled}
      onOptionSubmit={(val) => {
        const parsedCountry = JSON.parse(val) as Country;
        handleCountryChange(parsedCountry);
        combobox.closeDropdown();
      }}
    >
      <ReactInputMask
        mask={mask}
        alwaysShowMask
        maskChar={' '}
        value={localValue}
        onChange={(e) => {
          setIsManuallyTyping(true);
          handlePhoneChange(e);
        }}
        onKeyDown={handleKeyDown}
        onClick={moveCursorToEnd}
        onBlur={onBlur}
      >
        {(inputProps) => (
          <Combobox.Target>
            <TextInput
              withAsterisk={withAsterisk}
              ref={inputRef}
              required={required}
              disabled={disabled}
              w={w}
              label={intl.formatMessage(label)}
              size={size}
              rightSection={rightSection}
              {...inputProps}
              leftSectionWidth={92}
              leftSectionProps={{
                onMouseDown: (e) => {
                  e.stopPropagation();
                },
                onClick: () => combobox.toggleDropdown(),
              }}
              error={error}
              leftSection={
                <Flex
                  direction="row"
                  align="center"
                  gap={4}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <Flex align="center" gap={8}>
                    <EmojiIcon size={16}>{localCountry?.flag}</EmojiIcon>
                    <Text
                      size="md"
                      c={rcc('regular-content.secondary')}
                      fw={700}
                    >
                      {localCountry?.codeAlpha2}
                    </Text>
                  </Flex>

                  <Icon
                    name="chevron-down"
                    color="var(--regular-secondary-content)"
                  />
                </Flex>
              }
            />
          </Combobox.Target>
        )}
      </ReactInputMask>

      {combobox.dropdownOpened && (
        <Combobox.Dropdown>
          <TextInput
            size="md"
            value={search}
            onChange={handleSearchCountryChange}
            placeholder="Search country"
            mb={16}
          />

          <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
            <CountryOptions
              countries={filteredCountries}
              onSelect={(country) => handleCountryChange(country)}
            />
          </Combobox.Options>
        </Combobox.Dropdown>
      )}
    </Combobox>
  );
};
