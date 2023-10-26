export type AccountsAction =
  | { type: 'getAmountTotal'; payload: { userId: string } }
  | { type: 'getAmountTotalSuccess'; payload: number }
  | { type: 'loadAccounts'; payload: { userId: string } }
  | { type: 'loadAccountsSuccess'; payload: any }

  | { type: 'createAccount'; payload: string }
  | { type: 'createAccountSuccess'; payload: any };
