import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext';
import getRecipeById from '../utils/getRecipeById';

function RecipeDetail() {
  const { id } = useParams();
  const { isFoodRecipes } = useContext(RecipesContext);
  const [recipeInfo, setRecipeInfo] = useState({});
  useEffect(() => {
    if (isFoodRecipes !== undefined) {
      (
        async () => {
          const recipeData = await getRecipeById(isFoodRecipes, id);
          setRecipeInfo(recipeData);
        }
      )();
    }
  }, [isFoodRecipes]);

  return (
    <div>
      {recipeInfo?.strMeal}
    </div>
  );
}

export default RecipeDetail;
