import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetail from '../components/RecipeDetail';
import { RecipesContext } from '../context/RecipesContext';

export default function FoodDetail() {
  const { id } = useParams();
  const { setIsFoodRecipes } = useContext(RecipesContext);

  useEffect(() => {
    setIsFoodRecipes(true);
  }, []);

  return (
    <div>
      Food Detail
      <p>
        {` id: ${id}`}
      </p>
      <RecipeDetail />
    </div>
  );
}
