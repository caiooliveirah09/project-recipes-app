import React, { useState } from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [allRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));
  const [recipes, setRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));

  const filterAll = () => {
    setRecipes(allRecipes);
  };

  const filterFoods = () => {
    const favoriteFoods = allRecipes.filter((r) => r.type === 'food');
    setRecipes(favoriteFoods);
  };

  const filterDrinks = () => {
    const favoriteDrinks = allRecipes.filter((r) => r.type === 'drink');
    setRecipes(favoriteDrinks);
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterFoods }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks
      </button>
      { recipes.map((r, i) => (
        <div key={ i }>
          <img
            data-testid={ `${i}-horizontal-image` }
            src={ r.image }
            alt={ r.name }
          />
        </div>))}
    </div>
  );
}
