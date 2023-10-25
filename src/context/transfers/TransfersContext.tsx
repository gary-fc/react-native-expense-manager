import React, { createContext } from 'react';

type TransfersContextProps = {
  accounts: any;
  loadAccounts: () => Promise<void>;
  createAccount: (
    accountName: string,
    description: string,
    amount: number,
  ) => Promise<void>;
};

export const TransfersContext = createContext({});

export const TransfersProvider = ({ children }: any) => {
  return (
    <TransfersContext.Provider value={{}}>
      {children}
    </TransfersContext.Provider>
  );
};
