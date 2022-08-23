import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import RecipeCard from '../components/RecipeCard';
import fetchRecipes from '../utils/recipesApi';

// nudar o isFooRecipes para um State
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
  console.log(recipes);
  return (
    <div>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          thumb={ recipe.thumb }
          name={ recipe.name }
        />
      ))}
    </div>
  );
}

Recipes.propTypes = {
  isFoodRecipes: Proptypes.bool.isRequired,
};

export default Recipes;
