import { IntlShape } from 'react-intl';

import { ColumnConfig } from '@/types';

import { TableMode } from '../types';

export const headerColumns: Record<TableMode, ColumnConfig[]> = {
  minimal: [],
  account: [
    {
      key: 'operation',
      render: (intl: IntlShape) =>
        intl.formatMessage({
          id: 'widget.transaction_history.operation',
          defaultMessage: 'Operation',
        }),
    },
    {
      key: 'network',
      render: (intl) =>
        intl.formatMessage({
          id: 'widget.transaction_history.network',
          defaultMessage: 'Network',
        }),
    },
    {
      key: 'status',
      render: (intl) =>
        intl.formatMessage({
          id: 'widget.transaction_history.status',
          defaultMessage: 'Status',
        }),
    },
    {
      key: 'amount',
      textAlign: 'right',
      render: (intl) =>
        intl.formatMessage({
          id: 'widget.transaction_history.amount_and_date',
          defaultMessage: 'Amount & date',
        }),
    },
  ],
  standard: [
    {
      key: 'operation',
      render: (intl: IntlShape) =>
        intl.formatMessage({
          id: 'widget.transaction_history.operation',
          defaultMessage: 'Operation',
        }),
    },
    {
      key: 'network',
      render: (intl) =>
        intl.formatMessage({
          id: 'widget.transaction_history.network',
          defaultMessage: 'Network',
        }),
    },
    {
      key: 'address',
      render: (intl) =>
        intl.formatMessage({
          id: 'widget.transaction_history.address',
          defaultMessage: 'Address',
        }),
    },
    {
      key: 'txid',
      render: (intl) =>
        intl.formatMessage({
          id: 'widget.transaction_history.txid',
          defaultMessage: 'TXID',
        }),
    },
    {
      key: 'status',
      render: (intl) =>
        intl.formatMessage({
          id: 'widget.transaction_history.status',
          defaultMessage: 'Status',
        }),
    },
    {
      key: 'amount',
      textAlign: 'right',
      render: (intl) =>
        intl.formatMessage({
          id: 'widget.transaction_history.amount_and_date',
          defaultMessage: 'Amount & Date',
        }),
    },
  ],
  exchange: [
    {
      key: 'operation',
      render: (intl: IntlShape) =>
        intl.formatMessage({
          id: 'widget.transaction_history.operation',
          defaultMessage: 'Operation',
        }),
    },
    {
      key: 'status',
      render: (intl) =>
        intl.formatMessage({
          id: 'widget.transaction_history.status',
          defaultMessage: 'Status',
        }),
    },
    {
      key: 'amount',
      textAlign: 'right',
      render: (intl) =>
        intl.formatMessage({
          id: 'widget.transaction_history.amount_and_date',
          defaultMessage: 'Amount & Date',
        }),
    },
  ],
};
