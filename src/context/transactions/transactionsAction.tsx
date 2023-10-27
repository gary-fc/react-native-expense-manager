export type TransactionsAction =
  | { type: 'loadTransactions'; payload: { token: string } }
  | { type: 'loadTransactionsPeriod'; payload: { token: string } }
  | { type: 'createTransaction'; payload: string };
