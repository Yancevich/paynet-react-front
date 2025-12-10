import { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import {
  Anchor,
  Group,
  PinInput,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Loader,
  Flex,
} from '@mantine/core';
import { useAtomValue } from 'jotai';

import { maskEmail, maskPhone } from '@/utils';
import { Icon } from '@/common/components/Icon';
import { turnstileTokenAtom } from '@/store/turstileToken';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import styles from './OtpWidget.module.scss';

enum OtpType {
  Email = 'email',
  Phone = 'phone',
}

interface OtpWidgetProps {
  contact: string;
  type?: OtpType;
  value: string;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
  timer: number | null;
  onResendCodeClick: () => void;
  captchaSlot?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export const OtpWidget: FC<OtpWidgetProps> = ({
  contact,
  type = OtpType.Email,
  value,
  onChange,
  onComplete,
  timer,
  onResendCodeClick,
  captchaSlot,
  disabled,
  loading,
}) => {
  const intl = useIntl();
  const { rcc, rbgc, rbdc } = useThemeColors();
  const iconName = type === OtpType.Phone ? 'phone' : 'mail';
  const token = useAtomValue(turnstileTokenAtom);

  const isCaptchaValid = !token;

  const maskedContact =
    type === OtpType.Phone ? maskPhone(contact) : maskEmail(contact);

  const onResendHandler = () => {
    if (token) {
      onResendCodeClick();
    }
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" w="100%">
        <Loader />
      </Flex>
    );
  }

  return (
    <Stack gap={44} w="100%">
      <Stack gap={8} align="center">
        <Stack gap={8} align="center">
          <ThemeIcon
            radius="xl"
            size="60"
            color={rbgc('accent-background.bg-1')}
          >
            <Icon name={iconName} color={rbdc('accent-borders.border-5')} />
          </ThemeIcon>
          <Title size="xl" ta="center" c={rcc('regular-content.primary')}>
            {intl.formatMessage({
              id: 'widget.otp.title',
              defaultMessage: 'One-time password',
            })}
          </Title>
          <Group gap={0}>
            <Text
              size="lg"
              fw={500}
              ta="center"
              c={rcc('regular-content.secondary')}
            >
              {intl.formatMessage({
                id: 'widget.otp.code_sent',
                defaultMessage: 'Code sent to',
              })}
            </Text>
            <Text size="lg" fw={700} c={rcc('accent-content.primary')} ml={5}>
              {maskedContact}
            </Text>
          </Group>
        </Stack>
        <Stack gap={16} align="center">
          <Stack gap={12} align="center">
            <PinInput
              oneTimeCode
              value={value}
              disabled={disabled}
              onChange={onChange}
              onComplete={onComplete}
              length={5}
              gap={12}
              size="lg"
              placeholder=""
              className={styles.pininput}
              type="number"
            />

            <Text size="lg" ta="center" c={rcc('regular-content.primary')}>
              {intl.formatMessage({
                id: 'widget.otp.valid_duration',
                defaultMessage:
                  'The code is valid for 10 minutes. Didn’t receive the email? Please check your Spam folder.',
              })}
            </Text>
          </Stack>

          <Stack gap={16}>
            {timer && timer > 0 ? (
              <Text size="lg" ta="center" c={rcc('regular-content.secondary')}>
                {intl.formatMessage(
                  {
                    id: 'widget.otp.resend_code_countdown',
                    defaultMessage:
                      'You can request a new code in {timer} seconds',
                  },
                  { timer }
                )}
              </Text>
            ) : (
              <>
                {captchaSlot}
                <Anchor
                  disabled={captchaSlot ? isCaptchaValid : true}
                  component="button"
                  type="button"
                  fw={700}
                  td="underline"
                  onClick={onResendHandler}
                  size="lg"
                  c={rcc(
                    captchaSlot && isCaptchaValid
                      ? 'regular-content.disabled'
                      : 'accent-content.primary'
                  )}
                >
                  {intl.formatMessage({
                    id: 'widget.otp.resend_code',
                    defaultMessage: 'Send Code Again',
                  })}
                </Anchor>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
