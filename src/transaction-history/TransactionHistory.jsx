import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../constants';
import { TransactionContext } from '../transaction-context';
import History from './History';

export default function TransactionHistory() {
  const { allTransaction, dispatchGetAllTransaction } = useContext(TransactionContext);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      dispatchGetAllTransaction('FETCH_TRANSACTION', { txn: [...res.data] });
    });
  }, []);
  return (
    <div>
      <h3>Transaction history</h3>
      {allTransaction.map((txn) => {
        return <History key={txn.transaction_id} datum={txn} />;
      })}
    </div>
  );
}
