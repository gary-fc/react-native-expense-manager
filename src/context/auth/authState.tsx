export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  userId: string | null;
  errorMessage: string;
  registerSuccess: boolean;
}

export const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  userId: null,
  errorMessage: '',
  registerSuccess: false,
};
