export interface AccountsState {
  accounts: any;
  isLoading: boolean;
}

export const accountsInitialState: AccountsState = {
  accounts: [],
  isLoading: false,
};
