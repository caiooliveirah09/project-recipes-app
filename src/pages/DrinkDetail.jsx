import React, { useContext, useEffect } from 'react';
import RecipeDetail from '../components/RecipeDetail';
import { RecipesContext } from '../context/RecipesContext';

export default function DrinkDetail() {
  const { setIsFoodRecipes } = useContext(RecipesContext);

  useEffect(() => {
    setIsFoodRecipes(false);
  }, []);

  return (
    <div>
      <RecipeDetail />
    </div>
  );
}
