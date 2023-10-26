import React, { createContext, useReducer } from 'react';
import { transactionsReducer } from './transactionsReducer';
import { transactionsInitialState } from './transactionsState';

type TransactionsContextProps = {
  accounts: any;
  loadTransactions: () => Promise<void>;
  createTransaction: (
    accountName: string,
    description: string,
    amount: number,
  ) => Promise<void>;
};

export const TransactionsContext = createContext({});

export const TransactionsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    transactionsReducer,
    transactionsInitialState,
  );

  const loadTransactions = async () => {

  };

  return (
    <TransactionsContext.Provider value={{ ...state, loadTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
