export interface CategoriesState {
  categories: any;
  isLoading: boolean;
  composeCategory: boolean;
}

export const accountsInitialState: CategoriesState = {
  categories: [],
  isLoading: false,
  composeCategory: false,
};
