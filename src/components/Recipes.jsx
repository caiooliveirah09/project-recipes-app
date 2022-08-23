import React, { useContext } from 'react';
import RecipeCard from './RecipeCard';
import RecipesCategories from './RecipesCategories';
import { RecipesContext } from '../context/RecipesContext';

function Recipes() {
  const { recipes } = useContext(RecipesContext);

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
          <RecipeCard
            key={ index }
            index={ index }
            thumb={ recipe.thumb }
            name={ recipe.name }
          />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
