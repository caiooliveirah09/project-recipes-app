import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import RecipesCategories from './RecipesCategories';
import { RecipesContext } from '../context/RecipesContext';

function Recipes() {
  const { recipes } = useContext(RecipesContext);
  const location = useLocation();

  const style = {
    display: 'flex',
    width: '220px',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  };

  return (
    <div>
      <RecipesCategories />
      <div style={ style }>
        {recipes.map((recipe, index) => (
          <Link to={ `${location.pathname}/${recipe.id}` } key={ index }>
            <RecipeCard
              index={ index }
              thumb={ recipe.thumb }
              name={ recipe.name }
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
