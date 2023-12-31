import React, { createContext, useReducer } from 'react';
import { accountsReducer } from './accountsReducer';
import { accountsInitialState } from './accountsState';
import accountApi from '../../api/services/accountApi';

type AccountsContextProps = {
  accounts: any;
  amountTotal: number;
  getAmountTotal: (userId: string) => Promise<void>;
  loadAccounts: (userId: string) => Promise<void>;
  createAccount: (
    accountName: string,
    description: string,
    amount: number,
    userId: string,
  ) => Promise<void>;
};

export const AccountsContext = createContext<AccountsContextProps>(
  {} as AccountsContextProps,
);

export const AccountsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(accountsReducer, accountsInitialState);

  const loadAccounts = async (userId: string) => {
    try {
      const resp = await accountApi.get('/account/GetAccounts', {
        params: { userId: userId },
      });

      dispatch({ type: 'loadAccountsSuccess', payload: resp.data });
    } catch (e) {
      console.log('error');
      console.log(e);
    }
  };

  const getAmountTotal = async (userId: string) => {
    try {
      console.log(userId);
      const resp = await accountApi.get('/account/GetAmountTotal', {
        params: { userId: userId },
      });
      dispatch({ type: 'getAmountTotalSuccess', payload: resp.data });
      console.log(resp.data);
    } catch (e: any) {
      console.log(e.response.data);
    }
  };

  const createAccount = async (
    accountName: string,
    description: string,
    amount: number,
    userId: string,
  ) => {
    console.log("createAccount")
    try {
      const resp = await accountApi.post('/account', {
        accountName,
        description,
        amount,
        userId
      });

      loadAccounts(userId);
      getAmountTotal(userId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AccountsContext.Provider
      value={{
        ...state,
        loadAccounts,
        getAmountTotal,
        createAccount,
      }}>
      {children}
    </AccountsContext.Provider>
  );
};
