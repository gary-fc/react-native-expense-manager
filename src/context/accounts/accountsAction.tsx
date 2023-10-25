export type AccountsAction =
  | { type: 'loadAccounts'; payload: { token: string } }
  | { type: 'createAccount'; payload: string }
  | { type: 'createAccountSuccess'; payload: any };
