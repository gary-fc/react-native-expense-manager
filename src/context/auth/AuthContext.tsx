import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userApi from '../../api/services/userApi';
import { LoginInput } from '../../api/input/user/LoginInput';
import { RegisterInput } from '../../api/input/user/RegisterInput';
import { authInitialState } from './authState';
import { authReducer } from './authReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  userId: string | null;
  registerSuccess: boolean;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (data: RegisterInput) => Promise<void>;
  signIn: (data: LoginInput) => Promise<void>;
  logOut: () => void;
  notAuthenticated: () => void;
  removeError: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    AsyncStorage.clear();
    Promise.all([AsyncStorage.getItem('token'), AsyncStorage.getItem('userId')])
      .then(([token, userId]) => {
        if (!token || !userId) return dispatch({ type: 'notAuthenticated' });
        dispatch({ type: 'signUp', payload: { token, userId } });
      })
      .catch(() => {
        dispatch({ type: 'notAuthenticated' });
      });
  }, []);
  const signUp = async (data: RegisterInput) => {
    try {
      const resp = await userApi.post('/auth/register', data);
      dispatch({
        type: 'registerSuccess',
      });
    } catch (error: any) {
      dispatch({ type: 'addError', payload: error.response.data });
      console.log(error.response.data);
    }
  };
  const signIn = async (data: LoginInput) => {
    try {
      const resp = await userApi.post('/auth/login', data);
      dispatch({
        type: 'signUp', payload: {
          token: resp.data.jwt,
          userId: resp.data.userId,
        },
      });

      await AsyncStorage.setItem('token', resp.data.jwt);
      await AsyncStorage.setItem('userId', resp.data.userId);
    } catch (error: any) {
      console.log(error);
      dispatch({ type: 'addError', payload: error });
    }
  };
  const logOut = () => {
  };
  const removeError = () => {
    dispatch({ type: 'removeError' });
  };

  const notAuthenticated = () => {
    dispatch({ type: 'notAuthenticated' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        notAuthenticated,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
