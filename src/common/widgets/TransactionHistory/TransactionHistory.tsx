import { Button, Flex, Pagination, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { OperationType } from '@/api/wallet_v2';
import { Icon } from '@/common/components/Icon';
import { NextButton } from '@/common/components/NextButton';
import { TransactionDetailsModal } from '@/common/widgets/TransactionDetailsModal';
import { PageBlockLayout } from '@/layout/PageBlockLayout';
import { ExtendedOperationLogData } from '@/store/operationLog';
import { useOperationLog } from '@/store/operationLog/hooks';
import { useThemeColors } from '@/theme/useThemeColors.ts';
import { useUi } from '@/contexts';

import { TransactionHistoryFilters } from './components/TransactionHistoryFilters';
import TransactionHistoryTable from './components/TransactionHistoryTable';
import { TableMode } from './components/TransactionHistoryTable/types';
import classes from './styles.module.css';

interface TransactionHistoryProps {
  type?: OperationType;
  accountId?: string;
  title?: { id: string; defaultMessage: string };
  hiddenFilters?: boolean;
  hiddenSeeAll?: boolean;
  hiddenTitle?: boolean;
  tableMode?: TableMode;
}

export const TransactionHistory = ({
  type,
  accountId,
  tableMode = 'standard',
  hiddenFilters = true,
  hiddenTitle = false,
  hiddenSeeAll = false,
  title = { id: 'widget.transfer_history.title', defaultMessage: 'History' },
}: TransactionHistoryProps) => {
  const { isMobile } = useUi();
  const { rcc } = useThemeColors();
  const { groupedOperations, goToPage, clearFilters } = useOperationLog(
    type,
    accountId
  );

  const { pagination, operations } = groupedOperations;
  const [filtersOpened, filtersHandler] = useDisclosure(false);

  const isOperationListEmpty = Object.entries(operations).length === 0;
  const isPaginationDisabled = pagination.totalPages === 1;

  const [selectedOperation, setSelectedOperation] = useState<
    ExtendedOperationLogData | undefined
  >(undefined);

  const { formatMessage } = useIntl();

  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, []);

  return (
    <>
      {!hiddenFilters ? (
        <Flex pb={16} w="100%" justify="flex-start">
          <Button
            onClick={filtersHandler.open}
            size="sm"
            variant="secondary"
            leftSection={<Icon name="settings-2" />}
          >
            {formatMessage({
              id: 'widget.transaction_history.filters',
              defaultMessage: 'Filters',
            })}
          </Button>
        </Flex>
      ) : null}
      <Stack gap={16}>
        <PageBlockLayout>
          <Stack gap={20}>
            <Flex align="center" justify="space-between">
              {!hiddenTitle ? (
                <Title
                  c={rcc('regular-content.primary')}
                  size={isMobile ? 'md' : 'lg'}
                >
                  {formatMessage(title)}
                </Title>
              ) : null}
              {!hiddenSeeAll ? (
                <NextButton
                  label={formatMessage({
                    id: 'common.see_all',
                    defaultMessage: 'See all',
                  })}
                  path="/history"
                />
              ) : null}
            </Flex>
            <Stack className={classes.scrollXAuto}>
              <TransactionHistoryTable
                tableMode={tableMode}
                isEmptyList={isOperationListEmpty}
                operationsList={groupedOperations.operations}
                selectOperation={setSelectedOperation}
              />
            </Stack>
          </Stack>
        </PageBlockLayout>
        {!isOperationListEmpty && (
          <Flex w="100%" justify="flex-end">
            <Pagination
              disabled={isPaginationDisabled}
              c={rcc('regular-content.primary')}
              total={pagination.totalPages}
              value={pagination.currentPage}
              onChange={goToPage}
            />
          </Flex>
        )}
      </Stack>

      {!hiddenFilters ? (
        <TransactionHistoryFilters
          opened={filtersOpened}
          onClose={filtersHandler.close}
        />
      ) : null}

      <TransactionDetailsModal
        transaction={selectedOperation}
        close={() => setSelectedOperation(undefined)}
      />
    </>
  );
};
