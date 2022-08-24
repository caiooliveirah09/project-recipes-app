import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../utils/recipesApi';
import fetchRecipesFiltered from '../utils/recipesFilteredApi';

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isFoodRecipes, setIsFoodRecipes] = useState();
  console.log(isFoodRecipes);
  useEffect(() => {
    if (isFoodRecipes !== undefined) {
      (
        async () => {
          const recipesData = filter === 'All'
            ? await fetchRecipes(isFoodRecipes)
            : await fetchRecipesFiltered(isFoodRecipes, filter);
          const recipesFiltered = recipesData.map((recipe) => ({
            id: recipe.idMeal || recipe.idDrink,
            name: recipe.strMeal || recipe.strDrink,
            thumb: recipe.strMealThumb || recipe.strDrinkThumb,
          }));
          setRecipes(recipesFiltered);
        }
      )();
    }
  }, [isFoodRecipes, filter]);

  const providerValue = {
    recipes,
    setRecipes,
    isFoodRecipes,
    setIsFoodRecipes,
    setFilter,
  };

  return (
    <RecipesContext.Provider value={ providerValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
