import { CategoriesState } from './categoriesState';
import { CategoriesAction } from './categoriesAction';

export const categoriesReducer = (
  state: CategoriesState,
  action: CategoriesAction,
): CategoriesState => {
  switch (action.type) {
    case 'loadCategories':
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
      };

    case 'createCategory':
      return {
        ...state,
        isLoading: true,
      };

    case 'createCategorySuccess':
      return {
        ...state,
        categories: [...state.categories, action.payload],
        isLoading: false,
      };

    default:
      return state;
  }
};
