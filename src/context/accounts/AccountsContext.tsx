import React, { createContext, useReducer } from 'react';
import { accountsReducer } from './accountsReducer';
import { accountsInitialState } from './accountsState';

type AccountsContextProps = {
  accounts: any;
  loadAccounts: () => Promise<void>;
  createAccount: (
    accountName: string,
    description: string,
    amount: number,
  ) => Promise<void>;
};

export const AccountsContext = createContext<AccountsContextProps>(
  {} as AccountsContextProps,
);

export const AccountsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(accountsReducer, accountsInitialState);

  const loadAccounts = async () => {

  };

  const createAccount = async (
    accountName: string,
    description: string,
    amount: number,
  ) => {

  };

  return (
    <AccountsContext.Provider
      value={{
        ...state,
        loadAccounts,
        createAccount,
      }}>
      {children}
    </AccountsContext.Provider>
  );
};
