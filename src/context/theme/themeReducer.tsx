/**
 * @author Gary Franco
 **/
import { ThemeState } from './themeState';
import { ThemeAction } from './themeAction';

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case 'set_light_theme':
      return {
        ...action.payload,
      };
    case 'set_dark_theme':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
