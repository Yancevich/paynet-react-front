import { Center, Flex, Indicator, Text } from '@mantine/core';

export interface OperationStatusBadgeProps {
  status?: string;
}

const statusColors: Record<string, string> = {
  FAILED: 'var(--negative-border-4)',
  REJECTED: 'var(--negative-border-4)',
  CANCELED: 'var(--negative-border-4)',
  REJECTING: 'var(--negative-border-4)',

  SUCCESS: 'var(--positive-border-4)',
  COMPLETED: 'var(--positive-border-4)',
  APPROVED: 'var(--positive-border-4)',
  PROCESSED: 'var(--positive-border-4)',

  PENDING: 'var(--warning-border-4)',
  IN_PROGRESS: 'var(--warning-border-4)',
  PROCESSING: 'var(--warning-border-4)',
  PLACED: 'var(--warning-border-4)',
  APPROVING: 'var(--warning-border-4)',
};

const toCamelCaseWithSpaces = (status: string) => {
  return status
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const OperationStatusBadge = ({ status }: OperationStatusBadgeProps) => {
  const color = statusColors[status ?? ''] ?? 'gray';
  const normalizedStatus = toCamelCaseWithSpaces(status ?? 'UNDEFINED');

  return (
    <Flex gap={4} align="center" pos="relative" style={{ zIndex: 1 }}>
      <Center w={20} h={20}>
        <Indicator size={6} color={color} />
      </Center>
      <Text>{normalizedStatus?.replace(/_/g, ' ')}</Text>
    </Flex>
  );
};
