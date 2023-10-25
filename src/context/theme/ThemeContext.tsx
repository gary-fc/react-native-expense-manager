/**
 * @author Gary Franco
 **/
import { createContext, useEffect, useReducer } from 'react';
import { themeReducer } from './themeReducer';
import { darkTheme, lightTheme } from './themePayload';
import { ThemeState } from './themeState';
import { useColorScheme } from 'react-native';

interface ThemeContextProps {
  theme: ThemeState;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {
  const colorScheme = useColorScheme();
  const [theme, dispatch] = useReducer(
    themeReducer,
    colorScheme === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    colorScheme === 'dark' ? setDarkTheme() : setLightTheme();
  }, [colorScheme]);
  const setDarkTheme = () => {
    dispatch({ type: 'set_dark_theme', payload: darkTheme });
  };

  const setLightTheme = () => {
    dispatch({ type: 'set_light_theme', payload: lightTheme });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setDarkTheme,
        setLightTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
