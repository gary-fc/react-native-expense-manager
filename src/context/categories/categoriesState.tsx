export interface CategoriesState {
  categories: any;
  isLoading: boolean;
  composeCategory: boolean;
}

export const categoriesInitialState: CategoriesState = {
  categories: [],
  isLoading: false,
  composeCategory: false,
};
