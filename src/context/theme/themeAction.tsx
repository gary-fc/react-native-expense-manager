/**
 * @author Gary Franco
 **/
import { ThemeState } from './themeState';

export type ThemeAction =
  | { type: 'set_light_theme'; payload: ThemeState }
  | { type: 'set_dark_theme'; payload: ThemeState };
