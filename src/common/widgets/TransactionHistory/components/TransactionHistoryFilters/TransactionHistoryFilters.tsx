import {
  Box,
  Text,
  Drawer,
  Flex,
  Stack,
  Title,
  Select,
  Button,
  Checkbox,
} from '@mantine/core';
import { useIntl } from 'react-intl';
import { DateTimePicker } from '@mantine/dates';
import dayjs from 'dayjs';

import { OperationType } from '@/api/wallet_v2';
import { normalizeDate, useOperationLog } from '@/store/operationLog/hooks';
import { Icon } from '@/common/components/Icon';
import { getFromTime } from '@/utils/getFromTime';
import { useUi } from '@/contexts';
import { useThemeColors } from '@/theme/useThemeColors.ts';

import classes from '../styles.module.css';

import { dateRanges } from './ranges';
import { operationsTypes } from './operations';

interface TransactionHistoryFiltersProps {
  opened: boolean;
  onClose: () => void;
}

export const TransactionHistoryFilters = ({
  opened,
  onClose,
}: TransactionHistoryFiltersProps) => {
  const { formatMessage } = useIntl();
  const { isMobile } = useUi();
  const { rbgc, rcc } = useThemeColors();

  const {
    selectedAccount,
    selectAccountById,
    accountList,
    selectedDateRange,
    changeDateRange,
    clearFilters,
    selectedOperationsType,
    setOperationTypes,
    applyFilters,
    toTime,
    setToTime,
    fromTime,
    setFromTime,
  } = useOperationLog();

  const applyFiltersHandler = () => {
    applyFilters();
    onClose();
  };

  const todayISO = normalizeDate(new Date().toISOString());

  const isMatched = (daysAgo: number) => {
    return (
      fromTime &&
      toTime &&
      normalizeDate(fromTime) === normalizeDate(getFromTime(daysAgo)) &&
      normalizeDate(toTime) === todayISO
    );
  };

  const handleClearFilters = () => {
    clearFilters();
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size={isMobile ? '100%' : 'md'}
      position={isMobile ? 'bottom' : 'right'}
      title={
        <Title order={1} size="xl">
          {formatMessage({
            id: 'widget.transaction_history.filters',
            defaultMessage: 'Filters',
          })}
        </Title>
      }
    >
      <Stack align="space-between" h="100%">
        <Stack gap={40} mt={40}>
          {/* ACCOUNT */}

          <Select
            label={formatMessage({
              id: 'widget.transaction_history_filters.account',
              defaultMessage: 'Account',
            })}
            placeholder={formatMessage({
              id: 'widget.transaction_history.placeholder_account',
              defaultMessage: 'Account',
            })}
            size="lg"
            value={selectedAccount?.account || ''}
            onChange={(value) => selectAccountById(value || '')}
            rightSection={<Icon name="chevron-down" />}
            data={accountList.map((acc) => ({
              value: acc.account,
              label: acc.shortName || acc.account,
            }))}
          />

          {/* DATE RANGE */}
          <Stack gap={16}>
            <Flex gap={12} align="flex-end">
              <DateTimePicker
                label={formatMessage({
                  id: 'widget.transaction_history_filters.date',
                  defaultMessage: 'Date',
                })}
                w="100%"
                timeInputProps={{ autoComplete: 'off' }}
                valueFormat="DD MMMM YYYY HH:mm"
                maxDate={new Date()}
                onChange={(fromTimeValue) => {
                  setFromTime(fromTimeValue?.toISOString());
                  changeDateRange(null);

                  if (
                    toTime &&
                    fromTimeValue &&
                    fromTimeValue > new Date(toTime)
                  ) {
                    setToTime(fromTimeValue.toISOString());
                  }
                }}
                value={fromTime ? new Date(fromTime) : undefined}
                placeholder={formatMessage({
                  id: 'widget.transaction_history_filters.from',
                  defaultMessage: 'From',
                })}
                size="lg"
                rightSection={<Icon name="calendar" />}
              />
              <DateTimePicker
                w="100%"
                valueFormat="DD MMMM YYYY HH:mm"
                maxDate={dayjs().endOf('day').toDate()}
                minDate={fromTime ? new Date(fromTime) : undefined}
                value={toTime ? new Date(toTime) : undefined}
                onChange={(toDateValue) => {
                  setToTime(toDateValue?.toISOString());
                  changeDateRange(null);
                }}
                placeholder={formatMessage({
                  id: 'widget.transaction_history_filters.to',
                  defaultMessage: 'To',
                })}
                size="lg"
                rightSection={<Icon name="calendar" />}
              />
            </Flex>

            <Flex gap={8} direction="row" wrap="wrap">
              {dateRanges.map(({ defaultMessage, label, daysAgo }) => (
                <Box
                  px={12}
                  py={8}
                  bg={
                    selectedDateRange === daysAgo || isMatched(daysAgo)
                      ? rbgc('accent-background.bg-3')
                      : 'var(--button-secondary-bg)'
                  }
                  style={{
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}
                  key={label}
                  onClick={() =>
                    changeDateRange(
                      selectedDateRange !== daysAgo ? daysAgo : null
                    )
                  }
                >
                  <Text size="sm" fw={700} c={rcc('regular-content.primary')}>
                    {formatMessage({
                      id: label,
                      defaultMessage: defaultMessage,
                    })}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Stack>

          {/* CURRENCY (NOT SUPPORTED YET) */}
          {/*<Stack gap={16}>*/}
          {/*  <Title order={2}>*/}
          {/*    {intl.formatMessage({*/}
          {/*      id: 'widget.transaction_history_filters.currency',*/}
          {/*      defaultMessage: 'Currency',*/}
          {/*    })}*/}
          {/*  </Title>*/}

          {/*  <Select*/}
          {/*    placeholder="All"*/}
          {/*    size="lg"*/}
          {/*    value={selectedCurrency}*/}
          {/*    onChange={handleSelectCurrency}*/}
          {/*    searchable*/}
          {/*    data={currencyList*/}
          {/*      .filter((c) => typeof c.slug === 'string' && c.slug)*/}
          {/*      .map((c) => c.slug!.toUpperCase())}*/}
          {/*  />*/}
          {/*</Stack>*/}

          {/* OPERATION TYPE */}
          <Stack gap={16}>
            <Title
              size="md"
              c={rcc('regular-content.primary')}
              order={2}
              mb={8}
            >
              {formatMessage({
                id: 'widget.transaction_history_filters.operation_type',
                defaultMessage: 'Operation',
              })}
            </Title>

            <Checkbox.Group
              value={selectedOperationsType?.map((operation) =>
                operation.toString()
              )}
              onChange={(value) => {
                setOperationTypes(value as OperationType[]);
              }}
            >
              <Stack gap={16}>
                {operationsTypes.map((type) => (
                  <Checkbox.Card
                    className={classes.root}
                    key={type.label}
                    value={type.value}
                    checked={selectedOperationsType?.includes(type.value)}
                    w="100%"
                    style={{ border: 'none' }}
                  >
                    <Flex justify="space-between" align="center">
                      <Text size="md" c={rcc('regular-content.primary')}>
                        {formatMessage({
                          id: type.label,
                          defaultMessage: type.default,
                        })}
                      </Text>
                      <Checkbox.Indicator className={classes.indicator} />
                    </Flex>
                  </Checkbox.Card>
                ))}
              </Stack>
            </Checkbox.Group>
          </Stack>

          <Flex w="100%" gap={12}>
            <Button
              onClick={handleClearFilters}
              size="lg"
              variant="secondary"
              w="100%"
            >
              {formatMessage({
                id: 'widget.transaction_history_filters.reset',
                defaultMessage: 'Reset',
              })}
            </Button>
            <Button onClick={applyFiltersHandler} size="lg" w="100%">
              {formatMessage({
                id: 'widget.transaction_history_filters.apply',
                defaultMessage: 'Apply',
              })}
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Drawer>
  );
};
