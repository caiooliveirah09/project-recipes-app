import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { RecipesContext } from '../context/RecipesContext';

export default function Drinks() {
  const { setIsFoodRecipes } = useContext(RecipesContext);

  useEffect(() => {
    setIsFoodRecipes(false);
  }, []);

  return (
    <div>
      <Header />
      <Recipes />
    </div>
  );
}
