import React, { useContext, useEffect } from 'react';
import RecipeDetail from '../components/RecipeDetail';
import { RecipesContext } from '../context/RecipesContext';

export default function FoodDetail() {
  const { setIsFoodRecipes } = useContext(RecipesContext);

  useEffect(() => {
    setIsFoodRecipes(true);
  }, []);

  return (
    <div>
      <RecipeDetail />
    </div>
  );
}
