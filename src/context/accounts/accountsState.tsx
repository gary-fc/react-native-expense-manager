export interface AccountsState {
  accounts: any;
  isLoading: boolean;
  amountTotal: number;
}

export const accountsInitialState: AccountsState = {
  accounts: [],
  isLoading: false,
  amountTotal: 0,
};
