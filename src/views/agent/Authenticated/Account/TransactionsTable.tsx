/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useMemo } from 'react';
import { format } from 'date-fns';

import { Table } from '../../../../components';
import { FortispayTransactionResponseType } from '../../../../redux/ducks/fortis.d';

type TransactionsTableProps = {
  transactions: Array<FortispayTransactionResponseType>;
};

const TransactionsTable: FunctionComponent<TransactionsTableProps> = ({ transactions }) => {
  const getTransactionStatus = (status: number) => {
    switch (status) {
      case 101:
        return 'Approved';
      case 111:
        return 'Refunded';
      case 201:
        return 'Voided';
      case 301:
        return 'Declined';
      default:
        return '';
    }
  };

  const columns = useMemo(
    () => [
      {
        header: 'Date',
        accessor: 'created_ts', // accessor is the "key" in the data
      },
      {
        header: 'Amount',
        accessor: 'auth_amount',
      },
      {
        header: 'Card',
        accessor: 'last_four',
      },
      {
        header: 'Status',
        accessor: 'status_id',
      },
      {
        header: 'Type',
        accessor: 'is_recurring',
      },
      {
        header: 'Auth #',
        accessor: 'auth_code',
      },
    ],
    []
  );

  const data = transactions
    .sort((a, b) => b.created_ts - a.created_ts)
    .map((transaction) => {
      return {
        ...transaction,
        created_ts: format(new Date(Number(`${transaction.created_ts}000`)), 'MMM do, yyyy'),
        auth_amount: `$${transaction.auth_amount}`,
        last_four: `**** **** **** ${transaction.last_four}`,
        status_id: getTransactionStatus(transaction.status_id),
        is_recurring: transaction.is_recurring ? 'Recurring Payment' : 'One Time Payment',
        auth_code: transaction.auth_code,
      };
    });
  if (transactions.length === 0) {
    return null;
  }
  return <Table columns={columns} data={data} />;
};

export default TransactionsTable;