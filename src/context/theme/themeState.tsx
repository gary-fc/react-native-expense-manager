/**
 * @author Gary Franco
 **/
import { Theme } from '@react-navigation/native';

export interface ThemeState extends Theme {
  dividerColor: string;
  currentTheme: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    border: string;
    card: string;
    notification: string;
    text: string;
    icons: string;
  };
  palette: {
    primary: string;
    secondary: string;
    black: string;
    white: string;
  };
}
