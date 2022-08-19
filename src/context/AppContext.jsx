import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppRecipesApi from '../utils/AppRecipesApi';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    (
      async () => {
        const {
          categoriesData,
          nationalitiesData,
          ingredientsData,
        } = await AppRecipesApi();
        setCategories(categoriesData);
        setNationalities(nationalitiesData);
        setIngredients(ingredientsData);
      }
    )();
  }, []);

  const providerValue = {
    categories,
    nationalities,
    ingredients,
  };

  return (
    <AppContext.Provider value={ providerValue }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
