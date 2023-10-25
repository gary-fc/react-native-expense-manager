import React, { createContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer, AuthState } from './authReducer';
import userApi from '../../api/services/userApi';
import { LoginInput } from '../../api/input/user/LoginInput';
import { RegisterInput } from '../../api/input/user/RegisterInput';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (data: RegisterInput) => void;
  signIn: (data: LoginInput) => void;
  logOut: () => void;
  notAuthenticated: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  errorMessage: '',
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    console.log(state)
    AsyncStorage.getItem('token')
      .then(token => {
        console.log(token);
        if (!token) return dispatch({ type: 'notAuthenticated' });
        console.log('token');
        dispatch({ type: 'signUp', payload: { token } });
      })
      .catch(() => {
        dispatch({ type: 'notAuthenticated' });
        //TODO: validate token with backend
      });
  }, []);
  const signUp = async (data: RegisterInput) => {
    try {
      const resp = await userApi.post('/auth/register', data);
      console.log(resp.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  const signIn = async (data: LoginInput) => {
    try {
      const resp = await userApi.post('/auth/login', data);
      dispatch({
        type: 'signUp', payload: {
          token: resp.data,
        },
      });

      await AsyncStorage.setItem('token', resp.data);
    } catch (error: any) {
      console.log(error.response.data);
      dispatch({ type: 'addError', payload: 'error.response.data' });
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
        removeError
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
