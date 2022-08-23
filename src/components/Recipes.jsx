import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import RecipeCard from './RecipeCard';
import fetchRecipes from '../utils/recipesApi';
import RecipesCategories from './RecipesCategories';

function Recipes({ isFoodRecipes }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (
      async () => {
        const recipesData = await fetchRecipes(isFoodRecipes);
        const recipesFiltered = recipesData.map((recipe) => ({
          name: recipe.strMeal || recipe.strDrink,
          thumb: recipe.strMealThumb || recipe.strDrinkThumb,
        }));
        setRecipes(recipesFiltered);
      }
    )();
  }, []);

  const style = {
    display: 'flex',
    width: '210px',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  };

  return (
    <div>
      <RecipesCategories isFoodRecipes={ isFoodRecipes } />
      <div style={ style }>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={ index }
            index={ index }
            thumb={ recipe.thumb }
            name={ recipe.name }
          />
        ))}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  isFoodRecipes: Proptypes.bool.isRequired,
};

export default Recipes;
