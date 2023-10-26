export interface TransactionsState {
  transactions: any;
  isLoading: boolean;
  composeTransaction: boolean;
}

export const transactionsInitialState: TransactionsState = {
  transactions: [],
  isLoading: false,
  composeTransaction: false,
};
