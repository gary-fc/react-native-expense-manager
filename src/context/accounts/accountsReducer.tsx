import { AccountsState } from './accountsState';
import { AccountsAction } from './accountsAction';

export const accountsReducer = (
  state: AccountsState,
  action: AccountsAction,
): AccountsState => {
  switch (action.type) {
    case 'loadAccounts':
      return {
        ...state,
        accounts: action.payload,
        isLoading: false,
      };

    case 'createAccount':
      return {
        ...state,
        isLoading: true,
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
