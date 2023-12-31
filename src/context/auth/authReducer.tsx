import { AuthAction } from './authAction';
import { AuthState } from './authState';

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        errorMessage: action.payload,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    case 'signUp':
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        status: 'authenticated',
        errorMessage: '',
      };

    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        errorMessage: '',
      };

    case 'logOut':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        errorMessage: '',
      };

    case 'registerSuccess':
      return {
        ...state,
        registerSuccess: true,
      };

    default:
      return state;
  }
};
