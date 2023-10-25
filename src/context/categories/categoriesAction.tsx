export type CategoriesAction =
  | { type: 'loadCategories'; payload: { token: string } }
  | { type: 'createCategory'; payload: string }
  | { type: 'createCategorySuccess'; payload: any };
