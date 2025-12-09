import { FC } from 'react';
import { useIntl } from 'react-intl';
import { Anchor, PinInput, Stack, Title } from '@mantine/core';

import { ErrorMessage } from '@/utils';
import { Error } from '@/common/components/Error';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import styles from './PinWidget.module.scss';

interface PinWidgetProps {
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
  onClose: () => void;
  loading: boolean;
  errors: ErrorMessage[];
}

export const PinWidget: FC<PinWidgetProps> = ({
  onChange,
  onComplete,
  onClose,
  errors,
  loading,
}) => {
  const intl = useIntl();
  const { rcc } = useThemeColors();

  const widgetError = errors[0]?.description;

  return (
    <Stack gap={44} w="100%">
      <Stack gap={8} align="center">
        <Title size="xl" ta="center" c={rcc('regular-content.primary')}>
          {intl.formatMessage({
            id: 'widget.pin.title',
            defaultMessage: 'Come up with a PIN',
          })}
        </Title>
      </Stack>

      <Stack gap={32}>
        {widgetError && <Error error={widgetError} />}

        <Stack gap={12} align="center">
          <PinInput
            oneTimeCode
            onChange={onChange}
            onComplete={onComplete}
            length={4}
            gap={12}
            size="lg"
            placeholder=""
            className={styles.pininput}
            disabled={loading}
            error={!!widgetError}
          />
        </Stack>

        <Stack>
          <Anchor
            component="button"
            type="button"
            fw={700}
            onClick={onClose}
            size="lg"
          >
            {intl.formatMessage({
              id: 'widget.pin.not_now',
              defaultMessage: 'Not now',
            })}
          </Anchor>
        </Stack>
      </Stack>
    </Stack>
  );
};
