import { AccountsState } from './accountsState';
import { AccountsAction } from './accountsAction';

export const accountsReducer = (
  state: AccountsState,
  action: AccountsAction,
): AccountsState => {
  switch (action.type) {
    case 'getAmountTotalSuccess':
      return {
        ...state,
        amountTotal: action.payload,
      };

    case 'loadAccountsSuccess':
      return {
        ...state,
        accounts: action.payload,
      };

    case 'createAccountSuccess':
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
        isLoading: false,
      };

    default:
      return state;
  }
};
