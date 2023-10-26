export type AuthAction =
  | { type: 'signUp'; payload: { token: string; userId: string } }
  | { type: 'addError'; payload: string }
  | { type: 'removeError' }
  | { type: 'notAuthenticated' }
  | { type: 'logOut' }
  | { type: 'registerSuccess' };
