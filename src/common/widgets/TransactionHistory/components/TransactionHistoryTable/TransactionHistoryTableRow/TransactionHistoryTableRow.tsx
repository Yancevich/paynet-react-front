import { Table } from '@mantine/core';

import {
  Deposit,
  DirectExchange,
  Payin,
  Payout,
  Transfer,
  Withdraw,
  OperationType,
} from '@/api/wallet_v2';
import { ExtendedOperationLogData } from '@/store/operationLog';

import { TableMode } from '../types';

import {
  DepositRow,
  ExchangeRow,
  PayinRow,
  PayoutRow,
  WithdrawRow,
  TransferRow,
} from './components';

interface TransactionHistoryTableRowProps {
  data: ExtendedOperationLogData;
  openDetails: () => void;
  tableMode?: TableMode;
}

export const TransactionHistoryTableRow = ({
  data,
  openDetails,
  tableMode = 'standard',
}: TransactionHistoryTableRowProps) => {
  const renderRowContent = () => {
    switch (data.operationType) {
      case OperationType.TRANSFER: {
        const operationDetails = data.transfer as Transfer;

        return (
          <TransferRow
            key={operationDetails.id}
            operationDetails={operationDetails}
            tableMode={tableMode}
          />
        );
      }

      case OperationType.PAYOUT: {
        const operationDetails = data.payout as Payout;

        return (
          <PayoutRow
            key={operationDetails.id}
            operationDetails={operationDetails}
            tableMode={tableMode}
          />
        );
      }

      case OperationType.DEPOSIT: {
        const operationDetails = data.deposit as Deposit & {
          explorerLink: string;
        };

        return (
          <DepositRow
            key={operationDetails.id}
            operationDetails={operationDetails}
            tableMode={tableMode}
          />
        );
      }

      case OperationType.PAYIN: {
        const operationDetails = data.payin as Payin;

        return (
          <PayinRow
            key={operationDetails.id}
            operationDetails={operationDetails}
            tableMode={tableMode}
          />
        );
      }

      case OperationType.EXCHANGE: {
        const operationDetails = data.exchange as DirectExchange;

        return (
          <ExchangeRow
            key={operationDetails.id}
            operationDetails={operationDetails}
            tableMode={tableMode}
          />
        );
      }

      case OperationType.WITHDRAW: {
        const operationDetails = data.withdraw as Withdraw & {
          explorerLink: string;
        };

        return (
          <WithdrawRow
            key={operationDetails.id}
            operationDetails={operationDetails}
            tableMode={tableMode}
          />
        );
      }
    }
  };

  return (
    <Table.Tr style={{ cursor: 'pointer' }} onClick={openDetails}>
      {renderRowContent()}
    </Table.Tr>
  );

  // if (isMobile || tableMode === 'minimal') {
  //   return (
  //     <Menu
  //       position={tableMode === 'minimal' ? 'bottom-end' : 'bottom'}
  //       offset={-8}
  //     >
  //       <Menu.Target>
  //         <Table.Tr style={{ cursor: 'pointer' }}>
  //           {renderRowContent()}
  //         </Table.Tr>
  //       </Menu.Target>
  //       <MenuDropdown>
  //         <MenuItem onClick={openDetails}>Details</MenuItem>
  //       </MenuDropdown>
  //     </Menu>
  //   );
  // }
  //
  // return (
  //   <Table.Tr style={{ cursor: 'pointer' }}>
  //     {renderRowContent()}
  //     {(!isMobile ||
  //       ['account', 'standard', 'exchange', 'minimal'].includes(tableMode)) && (
  //       <Menu position={'bottom-end'} offset={-8}>
  //         <Menu.Target>
  //           <UnstyledButton p={0}>
  //             <Table.Td>
  //               <ActionIcon variant="transparent" c="regular-content.1">
  //                 <Icon name={'ellipsis'} size={20} />
  //               </ActionIcon>
  //             </Table.Td>
  //           </UnstyledButton>
  //         </Menu.Target>
  //
  //         <MenuDropdown>
  //           <MenuItem onClick={openDetails}>Details</MenuItem>
  //         </MenuDropdown>
  //       </Menu>
  //     )}
  //   </Table.Tr>
  // );
};
