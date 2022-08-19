import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppRecipesApi from '../utils/AppRecipesApi';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const { categoriesData, nationalitiesData, ingredientsData } = AppRecipesApi();
  console.log('ingredientsData', ingredientsData);
  const [categories, setCategories] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setCategories(categoriesData);
    setNationalities(nationalitiesData);
    setIngredients(ingredientsData);
    console.log('entrei', categories);
    // console.log(categoriesData, nationalitiesData, ingredientsData);
  }, [ingredientsData]);

  const providerValue = {
    categories,
    nationalities,
    ingredients,
  };

  console.log(providerValue);

  return (
    <AppContext.Provider value={ providerValue }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
