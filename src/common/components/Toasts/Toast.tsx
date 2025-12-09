import { Button, Stack, Text, Group, Title } from '@mantine/core';

interface NotificationsMessageProps {
  text: string;
  primaryAction?: () => void;
  primaryText?: string;
  secondaryAction?: () => void;
  secondaryText?: string;
}

export const ToastMessage = ({
  primaryAction,
  primaryText,
  secondaryText,
  secondaryAction,
  text,
}: NotificationsMessageProps) => {
  return (
    <Stack gap={8}>
      <Text size="md">{text}</Text>
      <Group gap={8}>
        {primaryAction && primaryText ? (
          <Button onClick={primaryAction} size="sm" variant="secondary">
            {primaryText}
          </Button>
        ) : null}
        {secondaryAction && secondaryText ? (
          <Button onClick={secondaryAction} size="sm" variant="secondary">
            {secondaryText}
          </Button>
        ) : null}
      </Group>
    </Stack>
  );
};

type NotificationsTitleProps = {
  title: string;
};

export const ToastTitle = ({ title }: NotificationsTitleProps) => {
  return (
    <Title order={3} size="md">
      {title}
    </Title>
  );
};
