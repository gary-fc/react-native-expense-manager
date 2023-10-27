import React, { createContext, useReducer } from 'react';
import { transactionsReducer } from './transactionsReducer';
import { transactionsInitialState } from './transactionsState';
import transactionApi from '../../api/services/transactionApi';

type TransactionsContextProps = {
  transactions: any;
  transactionsPeriod: any;
  loadTransactions: (userId: string) => Promise<void>;
  loadTransactionsPeriod: (userId: string, startDate: string, endDate: string) => Promise<void>;
  createTransaction: (
    accountId: string,
    userId: string,
    categoryId: string,
    transactionDescription: string,
    transactionType: string,
    date: Date,
    amount: number,
  ) => Promise<void>;
  updateTransaction: (
    id: string,
    transactionDescription: string,
    date: Date,
    amount: number,
  ) => Promise<void>;
};

export const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps);

export const TransactionsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    transactionsReducer,
    transactionsInitialState,
  );

  const loadTransactions = async (userId: string) => {
    try {
      const resp = await transactionApi.get('/transaction', { params: { userId } });
      dispatch({ type: 'loadTransactions', payload: resp.data });
    } catch (e) {
      console.log(e);
    }
  };

  const loadTransactionsPeriod = async (userId: string, startDate: string, endDate: string) => {
    try {
      const resp = await transactionApi.get('/transaction/period', { params: { userId, startDate, endDate } });
      dispatch({ type: 'loadTransactionsPeriod', payload: resp.data });
    } catch (e) {
      console.log(e);
    }
  };

  const createTransaction = async (
    accountId: string,
    userId: string,
    categoryId: string,
    transactionDescription: string,
    transactionType: string,
    date: Date,
    amount: number,
  ) => {
    try {
      const resp = await transactionApi.post('/transaction',{
        accountId,
        userId,
        categoryId,
        transactionDescription,
        transactionType,
        date,
        amount,
      });
      loadTransactions(userId);
    } catch (e) {
    }
  };

  const updateTransaction = async (
    id: string,
    transactionDescription: string,
    date: Date,
    amount: number,
  ) => {
    try {
      const resp = await transactionApi.put('/transaction', {
        id,
        transactionDescription,
        date,
        amount,
      });
    } catch (e) {
    }
  }

  return (
    <TransactionsContext.Provider
      value={{ ...state, loadTransactions, createTransaction, updateTransaction, loadTransactionsPeriod }}>
      {children}
    </TransactionsContext.Provider>
  );
};
