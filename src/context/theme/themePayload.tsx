/**
 * @author Gary Franco
 **/
import { ThemeState } from './themeState';

const PALETTE_DARK = {
  primary: '#4F98CA',
  secondary: '#50D890',
  background: '#272727',
  black: '#272727',
  white: '#EFFFFB',
};

const PALETTE_LIGHT = {
  primary: '#50D890',
  secondary: '#4F98CA',
  background: '#EFFFFB',
  black: '#272727',
  white: '#EFFFFB',
};

export const lightTheme: ThemeState = {
  dark: false,
  dividerColor: '#d9d9d9',
  currentTheme: 'light',
  colors: {
    primary: PALETTE_LIGHT.primary,
    secondary: PALETTE_LIGHT.secondary,
    background: PALETTE_LIGHT.background,
    card: PALETTE_LIGHT.white,
    text: PALETTE_LIGHT.black,
    border: PALETTE_LIGHT.black,
    notification: 'teal',
    icons: PALETTE_LIGHT.black,
  },
  palette: { ...PALETTE_LIGHT },
};

export const darkTheme: ThemeState = {
  dark: true,
  dividerColor: '#d9d9d9',
  currentTheme: 'dark',
  colors: {
    primary: PALETTE_DARK.primary,
    secondary: PALETTE_DARK.secondary,
    background: PALETTE_DARK.background,
    card: PALETTE_DARK.black,
    text: PALETTE_DARK.white,
    border: PALETTE_DARK.white,
    notification: 'teal',
    icons: PALETTE_DARK.white,
  },
  palette: { ...PALETTE_DARK },
};
