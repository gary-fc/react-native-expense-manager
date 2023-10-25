import React, { createContext } from 'react';

type TransactionsContextProps = {
  accounts: any;
  loadAccounts: () => Promise<void>;
  createAccount: (
    accountName: string,
    description: string,
    amount: number,
  ) => Promise<void>;
};

export const TransactionsContext = createContext({});

export const TransactionsProvider = ({ children }: any) => {
  return (
    <TransactionsContext.Provider value={{}}>
      {children}
    </TransactionsContext.Provider>
  );
};
