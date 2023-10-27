export interface TransactionsState {
  transactions: any;
  transactionsPeriod: any;
  isLoading: boolean;
  composeTransaction: boolean;
}

export const transactionsInitialState: TransactionsState = {
  transactions: [],
  transactionsPeriod: [],
  isLoading: false,
  composeTransaction: false,
};
