import { Text, Badge, Flex, Box } from '@mantine/core';
import React from 'react';
import { useIntl } from 'react-intl';

import { Icon } from '@/common/components/Icon';
import { Currency } from '@/api/currency';
import { CurrencyIcon } from '@/common/components/CurrencyIcon';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from './currentAsset.module.css';

interface CurrentAssetProps extends React.ComponentPropsWithoutRef<'button'> {
  currency?: Currency;
  accountName?: string;
}

export const CurrentAsset = ({ currency, accountName }: CurrentAssetProps) => {
  const { formatMessage } = useIntl();
  const { rcc, rbgc } = useThemeColors();
  return (
    <Box className={classes.root}>
      {currency ? (
        <Flex classNames={{ root: classes.info }}>
          {currency?.slug && <CurrencyIcon size={20} slug={currency?.slug} />}
          <Text
            classNames={{ root: classes.title }}
            c={rcc('regular-content.primary')}
          >
            {currency?.shortName}
          </Text>
          {accountName && (
            <Badge size="xs" bg={rbgc('regular-background.bg-4')}>
              {accountName}
            </Badge>
          )}
        </Flex>
      ) : (
        <Text fw={700} c={rcc('regular-content.secondary')}>
          {formatMessage({
            id: 'widgets.current_asset.placeholder',
            defaultMessage: 'Select asset',
          })}
        </Text>
      )}

      <Icon name="chevron-down" />
    </Box>
  );
};

CurrentAsset.displayName = 'CurrentAsset';
