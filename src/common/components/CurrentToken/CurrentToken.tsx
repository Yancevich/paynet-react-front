import { Text, UnstyledButton } from '@mantine/core';
import React, { forwardRef } from 'react';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { TokenWithDescription } from '@/api/currency';

import classes from './currentToken.module.css';

interface CurrentTokenProps extends React.ComponentPropsWithoutRef<'button'> {
  token?: TokenWithDescription;
  disabled: boolean;
}

export const CurrentToken = forwardRef<HTMLButtonElement, CurrentTokenProps>(
  ({ token, disabled, ...props }, ref) => {
    const { formatMessage } = useIntl();
    return (
      <UnstyledButton
        classNames={{ root: classes.button }}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <Text classNames={{ root: classes.title }}>
          {token?.blockchain?.name ||
            formatMessage({
              id: 'widget.token_select.title',
              defaultMessage: 'Select network',
            })}
        </Text>
        <Icon name="chevron-down" />
      </UnstyledButton>
    );
  }
);

CurrentToken.displayName = 'CurrentToken';
