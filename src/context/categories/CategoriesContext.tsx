import React, { createContext, useReducer } from 'react';

import { categoriesInitialState } from './categoriesState';
import { categoriesReducer } from './categoriesReducer';
import categoryApi from '../../api/services/categoryApi';

type CategoriesContextProps = {
  categories: any;
  loadCategories: (userId: string) => Promise<void>;
  createCategory: (
    categoryName: string,
    categoryIcon: string,
    categoryDescription: string,
    categoryType: string,
    userId: string,
  ) => Promise<void>;
};

export const CategoriesContext = createContext<CategoriesContextProps>({} as CategoriesContextProps);

export const CategoriesProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    categoriesReducer,
    categoriesInitialState,
  );
  const loadCategories = async (userId: string) => {
    try {
      const resp = await categoryApi.get('/category', {
        params: {
          userId: userId,
        },
      });
      console.log(resp.data);
      dispatch({ type: 'loadCategories', payload: resp.data });
    } catch (e) {
      console.log(e.data);
    }
  };

  const createCategory = async (
    categoryName: string,
    categoryIcon: string,
    categoryDescription: string,
    categoryType: string,
    userId: string,
  ) => {
    console.log(categoryName)
    try {
      const resp = await categoryApi.post('/category', {
        categoryName,
        categoryIcon,
        categoryDescription,
        categoryType,
        userId,
      });
      loadCategories(userId);
      console.log("resp.data");
      console.log(resp);
    } catch (e) {
      console.log("e");
      console.log(e);
    }

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
