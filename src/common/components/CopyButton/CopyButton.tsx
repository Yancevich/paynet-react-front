import { FC, MouseEvent } from 'react';
import { useIntl } from 'react-intl';
import {
  ActionIcon,
  ActionIconProps,
  Button,
  ButtonProps,
  CopyButton as CopyButtonMantine,
  Group,
  Tooltip,
} from '@mantine/core';

import { Icon, TIconProps } from '@/common/components/Icon';

interface CopyButtonProps {
  text: string;
  buttonText?: string;
  buttonIconAlign?: 'left' | 'right';
  buttonProps?: ButtonProps;
  actionIconProps?: ActionIconProps;
  iconProps?: Omit<TIconProps, 'name'>;
  isButtonMode?: boolean;
}

export const CopyButton: FC<CopyButtonProps> = ({
  text,
  buttonText,
  buttonIconAlign = 'left',
  buttonProps,
  actionIconProps,
  iconProps,
  isButtonMode,
}) => {
  const intl = useIntl();

  const handleClick = (event: MouseEvent, copyFn: () => void) => {
    event.stopPropagation();
    copyFn();
  };

  if (isButtonMode)
    return (
      <CopyButtonMantine value={text}>
        {({ copied, copy }) => (
          <Button
            onClick={(e) => handleClick(e, copy)}
            size="sm"
            {...buttonProps}
          >
            <Group gap="8">
              {buttonIconAlign === 'left' && <Icon name="copy" size={16} />}
              {copied
                ? intl.formatMessage({
                    id: 'common.copy_component.copied',
                    defaultMessage: 'Copied',
                  })
                : buttonText ||
                  intl.formatMessage({
                    id: 'common.copy_component.copy',
                    defaultMessage: 'Copy',
                  })}
              {buttonIconAlign === 'right' && <Icon name="copy" size={16} />}
            </Group>
          </Button>
        )}
      </CopyButtonMantine>
    );

  return (
    <CopyButtonMantine value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          label={
            copied
              ? intl.formatMessage({
                  id: 'common.copy_component.copied',
                  defaultMessage: 'Copied',
                })
              : intl.formatMessage({
                  id: 'common.copy_component.copy',
                  defaultMessage: 'Copy',
                })
          }
          position="top"
        >
          <ActionIcon
            c={copied ? 'positive-borders.3' : 'regular-borders.4'}
            variant="transparent"
            onClick={(e) => handleClick(e, copy)}
            onMouseDown={(e) => e.stopPropagation()}
            size={20}
            {...actionIconProps}
          >
            <Icon name={copied ? 'check' : 'copy'} size={16} {...iconProps} />
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButtonMantine>
  );
};
