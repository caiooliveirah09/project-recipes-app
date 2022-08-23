import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import fetchRecipesCategories from '../utils/recipesCategoriesApi';

const RecipesCategories = ({ isFoodRecipes }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (
      async () => {
        const categoriesData = await fetchRecipesCategories(isFoodRecipes);
        const categoriesFiltered = categoriesData.map((category) => category.strCategory);
        setCategories(categoriesFiltered);
      }
    )();
  }, []);

  return (
    <div>
      {categories.map((category, key) => (<input
        type="button"
        data-testid={ `${category}-category-filter` }
        value={ category }
        key={ key }
      />))}
    </div>
  );
};

RecipesCategories.propTypes = {
  isFoodRecipes: Proptypes.bool.isRequired,
};

export default RecipesCategories;
