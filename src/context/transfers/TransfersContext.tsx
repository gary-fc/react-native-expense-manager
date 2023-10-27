import React, { createContext, useReducer } from 'react';
import transferApi from '../../api/services/transferApi';
import { transfersReducer } from './transfersReducer';
import { transfersInitialState } from './transfersState';

type TransfersContextProps = {
  transfers: any;
  loadTransfers: (userId: string) => Promise<void>;
  createTransfer: (
    accountSend: string,
    accountReceives: string,
    amount: number,
    date: Date,
    userId: string,
  ) => Promise<void>;
};

export const TransfersContext = createContext<TransfersContextProps>({});

export const TransfersProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(transfersReducer, transfersInitialState);
  const loadTransfers = async (userId: string) => {
    try {
      const resp = await transferApi.get('/transfer', {
        params: { userId: userId },
      });
      dispatch({ type: 'loadTransfers', payload: resp.data });
    } catch (e) {
      console.log(e);
    }
  };

  const createTransfer = async (
    accountSend: string,
    accountReceives: string,
    amount: number,
    date: Date,
    userId: string,
  ) => {
    try {
      const resp = await transferApi.post('/transfer', {
        accountSend,
        accountReceives,
        amount,
        date,
        userId,
      });
      console.log(resp);
      loadTransfers(userId);
    } catch (e) {
    }
  };

  return (
    <TransfersContext.Provider
      value={{
        ...state,
        loadTransfers,
        createTransfer,
      }}>
      {children}
    </TransfersContext.Provider>
  );
};
