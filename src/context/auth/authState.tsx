export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
}

export const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  errorMessage: '',
};
