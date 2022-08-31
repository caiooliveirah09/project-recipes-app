import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Recipes from '../components/Recipes';
import Context from '../context/Context';
import { RecipesContext } from '../context/RecipesContext';

export default function Foods() {
  const { setIsFoodRecipes } = useContext(RecipesContext);
  const { meals } = useContext(Context);

  useEffect(() => {
    setIsFoodRecipes(true);
  }, []);

  if (meals.length === 1) return <Redirect to={ `/foods/${meals[0].idMeal}` } />;

  return (
    <div>
      <Header />
      <Recipes />
      <RecipeCard />
      <Footer />
    </div>
  );
}
