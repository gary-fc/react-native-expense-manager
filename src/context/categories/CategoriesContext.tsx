import React, { createContext, useReducer } from 'react';

import { categoriesInitialState } from './categoriesState';
import { categoriesReducer } from './categoriesReducer';

type CategoriesContextProps = {
  accounts: any;
  loadCategories: () => Promise<void>;
  createCategory: (
    categoryName: string,
    categoryIcon: string,
    categoryDescription: string,
    categoryType: string,
  ) => Promise<void>;
};

export const CategoriesContext = createContext({});

export const CategoriesProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    categoriesReducer,
    categoriesInitialState,
  );
  const loadCategories = async () => {

  };

  const createCategory = async (
    categoryName: string,
    categoryIcon: string,
    categoryDescription: string,
    categoryType: string,
  ) => {

  };

  return (
    <CategoriesContext.Provider
      value={{
        ...state,
        loadCategories,
        createCategory,
      }}>
      {children}
    </CategoriesContext.Provider>
  );
};
