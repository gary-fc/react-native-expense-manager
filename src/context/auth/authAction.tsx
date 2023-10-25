export type AuthAction =
  | { type: 'signUp'; payload: { token: string } }
  | { type: 'addError'; payload: string }
  | { type: 'removeError' }
  | { type: 'notAuthenticated' }
  | { type: 'logOut' };
