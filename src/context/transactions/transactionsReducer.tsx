import { TransactionsState } from './transactionsState';
import { TransactionsAction } from './transactionsAction';

export const transactionsReducer = (
  state: TransactionsState,
  action: TransactionsAction,
) => {
  switch (action.type) {
    case 'loadTransactions':
      return {
        ...state,
        transactions: action.payload,
        isLoading: false,
      };

    case 'loadTransactionsPeriod':
      return {
        ...state,
        transactionsPeriod: action.payload,
        isLoading: false,
      };

    case 'createTransaction':
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
