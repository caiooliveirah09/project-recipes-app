import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { RecipesContext } from '../context/RecipesContext';

export default function Foods() {
  const { setIsFoodRecipes } = useContext(RecipesContext);

  useEffect(() => {
    setIsFoodRecipes(true);
  }, []);

  return (
    <div>
      <Header />
      <Recipes />
      <Footer />
    </div>
  );
}
