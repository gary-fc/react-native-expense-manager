import React, { createContext } from 'react';

type CategoriesContextProps = {
  accounts: any;
  loadAccounts: () => Promise<void>;
  createAccount: (
    accountName: string,
    description: string,
    amount: number,
  ) => Promise<void>;
};

export const CategoriesContext = createContext({});

export const CategoriesProvider = ({ children }: any) => {
  return (
    <CategoriesContext.Provider value={{}}>
      {children}
    </CategoriesContext.Provider>
  );
};
