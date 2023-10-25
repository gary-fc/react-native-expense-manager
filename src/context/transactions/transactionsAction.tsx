export type TransactionsAction =
  | { type: 'loadTransactions'; payload: { token: string } }
  | { type: 'createTransaction'; payload: string }
  | { type: 'createTransactionSuccess'; payload: any };
