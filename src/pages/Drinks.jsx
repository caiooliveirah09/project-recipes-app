import React from 'react';
import Header from '../components/Header';
import Recipes from './Recipes';

export default function Drinks() {
  return (
    <div>
      <Header />
      <Recipes isFoodRecipes={ false } />
    </div>
  );
}
