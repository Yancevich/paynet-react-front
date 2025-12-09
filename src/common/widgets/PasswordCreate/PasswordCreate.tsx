import { FC, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from '@mantine/form';
import { Button, PasswordInput, Stack, Title } from '@mantine/core';

import { ErrorMessage } from '@/utils';
import { BackButton } from '@/common/components';
import { PasswordRequirement } from '@/common/widgets/PasswordCreate/components';
import { useThemeColors } from '@/theme/useThemeColors.ts';

interface PasswordCreateFormValues {
  password: string;
  confirm_password: string;
}

interface PasswordCreateProps {
  action: 'create' | 'change';
  errors: ErrorMessage[];
  loading: boolean;
  signOutCheckbox?: boolean;
  onBack: () => void;
  onPasswordSubmit: (password: string) => void;
  withBackButton?: boolean;
}

export const PasswordCreate: FC<PasswordCreateProps> = (props) => {
  const {
    action,
    errors,
    loading,
    onBack,
    onPasswordSubmit,
    withBackButton = true,
  } = props;
  const { formatMessage } = useIntl();
  const { rcc } = useThemeColors();

  const isChangeAction = action === 'change';

  const onSubmitHandler = (values: PasswordCreateFormValues) => {
    onPasswordSubmit(values.password);
  };

  const requirements = [
    {
      pattern: /.{12,}/,
      label: formatMessage({
        id: 'widget.password_create.requirement.characters_count',
        defaultMessage: 'At least 12 characters',
      }),
    },
    {
      pattern: /[0-9]/,
      label: formatMessage({
        id: 'widget.password_create.requirement.one_digit',
        defaultMessage: 'Minimum 1 digit',
      }),
    },
    {
      pattern: /[A-Z]/,
      label: formatMessage({
        id: 'widget.password_create.requirement.one_uppercase_letter',
        defaultMessage: 'Minimum 1 uppercase letter',
      }),
    },
    {
      pattern: /[a-z]/,
      label: formatMessage({
        id: 'widget.password_create.requirement.one_lowercase_letter',
        defaultMessage: 'Minimum 1 lowercase letter',
      }),
    },
    {
      pattern: /[$&+,:;=?@#|'<>.^*()%!-]/,
      label: formatMessage({
        id: 'widget.password_create.requirement.one_special_symbol',
        defaultMessage: 'Minimum 1 special symbol',
      }),
    },
  ];

  const {
    errors: formErrors,
    getInputProps,
    isValid,
    onSubmit,
    values,
  } = useForm<PasswordCreateFormValues>({
    initialValues: { password: '', confirm_password: '' },
    validate: {
      password: (value) => {
        const isPasswordValid = requirements.every((requirement) =>
          requirement.pattern.test(value)
        );
        return isPasswordValid
          ? null
          : formatMessage({
              id: 'widget.password_create.validation.all_requirements',
              defaultMessage: 'Password does not meet all requirements',
            });
      },
      confirm_password: (value, values) =>
        value === values.password
          ? null
          : formatMessage({
              id: 'widget.password_create.validation.does_not_match',
              defaultMessage: 'Passwords do not match',
            }),
    },
  });
  const passwordError = formErrors.password || errors[0]?.description;
  const isPasswordMatching =
    values.password.length >= 12 && values.password === values.confirm_password;

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);

  const requirementElements = requirements.map((requirement) => {
    const { pattern, label } = requirement;
    const isMatch = pattern.test(values.password);

    return <PasswordRequirement key={label} isMatch={isMatch} label={label} />;
  });

  return (
    <form onSubmit={onSubmit(onSubmitHandler)}>
      <Stack gap={44}>
        <Stack gap={20} align="flex-start">
          {withBackButton ? <BackButton onClick={onBack} /> : null}

          <Title
            order={1}
            size="xl"
            fw={700}
            ta="center"
            w="100%"
            c={rcc('regular-content.primary')}
          >
            {formatMessage(
              isChangeAction
                ? {
                    id: 'widget.password_create.title.change',
                    defaultMessage: 'Change password',
                  }
                : {
                    id: 'widget.password_create.title.create',
                    defaultMessage: 'Create a password',
                  }
            )}
          </Title>
        </Stack>

        <Stack gap={20}>
          <PasswordInput
            ref={passwordInputRef}
            label={formatMessage({
              id: 'widget.password_create.field.password',
              defaultMessage: 'Password',
            })}
            {...getInputProps('password')}
            error={passwordError}
            size="lg"
          />
          <PasswordInput
            label={formatMessage({
              id: 'widget.password_create.field.confirm_password',
              defaultMessage: 'Confirm password',
            })}
            {...getInputProps('confirm_password')}
            error={formErrors.confirm_password}
            size="lg"
          />

          <Stack gap={4}>
            {requirementElements.map(
              (requirementElement) => requirementElement
            )}
            <PasswordRequirement
              isMatch={isPasswordMatching}
              label={formatMessage({
                id: 'widget.password_create.requirement.match',
                defaultMessage: 'Passwords must match',
              })}
            />
          </Stack>

          {/*TODO: clarify logic for `sign out from all devices` from backend side*/}
          {/*{isChangeAction && signOutCheckbox && (*/}
          {/*  <Checkbox*/}
          {/*    label={formatMessage({*/}
          {/*      id: 'widget.password_create.sign_out_all_devices',*/}
          {/*      defaultMessage: 'Sign out of all devices',*/}
          {/*    })}*/}
          {/*    size="lg"*/}
          {/*  />*/}
          {/*)}*/}
        </Stack>

        <Button
          type="submit"
          disabled={!isValid()}
          loading={loading}
          size="lg"
          variant="accent"
        >
          {formatMessage(
            isChangeAction
              ? {
                  id: 'widget.password_create.submit.change',
                  defaultMessage: 'Change password',
                }
              : {
                  id: 'widget.password_create.submit.create',
                  defaultMessage: 'Set password',
                }
          )}
        </Button>
      </Stack>
    </form>
  );
};
