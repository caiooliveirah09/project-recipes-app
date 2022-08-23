import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import appRecipesApi from '../utils/appRecipesApi';

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
        } = await appRecipesApi();
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
