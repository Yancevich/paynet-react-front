import { TextInput } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';

interface SearchProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  isAutoFocused?: boolean;
  size?: string;
}

export const Search = ({
  setSearchValue,
  searchValue,
  size,
  isAutoFocused,
}: SearchProps) => {
  const { formatMessage } = useIntl();
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAutoFocused) {
      textInputRef.current?.focus();
    }
  }, []);

  return (
    <TextInput
      ref={textInputRef}
      placeholder={formatMessage({
        id: 'component.search.placeholder',
        defaultMessage: 'Search',
      })}
      leftSection={<Icon name="search" />}
      onChange={(e) => setSearchValue(e.target.value)}
      value={searchValue}
      size={size || 'md'}
    />
  );
};
