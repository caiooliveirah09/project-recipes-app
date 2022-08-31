import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Recipes from '../components/Recipes';
import Context from '../context/Context';
import { RecipesContext } from '../context/RecipesContext';

export default function Drinks() {
  const { setIsFoodRecipes } = useContext(RecipesContext);
  const { drinks } = useContext(Context);

  useEffect(() => {
    setIsFoodRecipes(false);
  }, []);

  if (drinks.length === 1) return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;

  return (
    <div>
      <Header />
      <Recipes />
      <RecipeCard />
      <Footer />
    </div>
  );
}
