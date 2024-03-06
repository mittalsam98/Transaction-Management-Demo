import React, { useContext, useState, useTransition } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { TransactionContext } from '../transaction-context';

export default function TransactionForm() {
  const [accountId, setAccountId] = useState('');
  const [isPending, setISPending] = useState(false);
  const [amount, setAmount] = useState('');
  const { dispatchGetAllTransaction, allTransaction } = useContext(TransactionContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setISPending(true);
    const data = {
      account_id: accountId,
      amount
    };
    axios
      .post(API_URL, data)
      .then((response) => {
        dispatchGetAllTransaction('FETCH_TRANSACTION', {
          txn: [{ ...response.data }, ...allTransaction]
        });
        setAccountId('');
        setAmount('');
      })
      .finally(() => {
        setISPending(false);
      });
  };
  return (
    <div>
      <h3>Transaction Form</h3>
      <form className='form__container' onSubmit={handleFormSubmit}>
        <div className='form__container--field'>
          <label>Account Id</label>
          <input
            data-type='account-id'
            onChange={(e) => setAccountId(e.target.value)}
            value={accountId}
          />
        </div>
        <div className='form__container--field'>
          <label>Amount</label>
          <input
            data-type='amount'
            onChange={(e) => setAmount(e.target.value)}
            type='number'
            value={amount}
          />
        </div>
        <div className='form__container--field'>
          <button
            data-type='transaction-submit'
            disabled={!accountId || !amount || isPending}
            type='submit'
          >
            {isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
