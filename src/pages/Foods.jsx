import React from 'react';
import Header from '../components/Header';
import Recipes from './Recipes';

export default function Foods() {
  return (
    <div>
      <Header />
      <Recipes isFoodRecipes />
    </div>
  );
}
