export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
}

type AuthAction =
  | { type: 'signUp'; payload: { token: string } }
  | { type: 'addError'; payload: string }
  | { type: 'removeError' }
  | { type: 'notAuthenticated' }
  | { type: 'logOut' };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

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

    default:
      return state;
  }
};
