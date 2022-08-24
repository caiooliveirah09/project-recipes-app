import React, { useContext, useEffect, useState } from 'react';
import fetchRecipesCategories from '../utils/recipesCategoriesApi';
import { RecipesContext } from '../context/RecipesContext';

const RecipesCategories = () => {
  const { isFoodRecipes, setFilter } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  console.log(isFoodRecipes);
  const handlerClick = ({ target }) => {
    setFilter((oldState) => (oldState === target.value ? 'All' : target.value));
  };

  useEffect(() => {
    (
      async () => {
        const categoriesData = await fetchRecipesCategories(isFoodRecipes);
        const categoriesFiltered = categoriesData
          .map((category) => category.strCategory);
        setCategories(['All', ...categoriesFiltered]);
      }
    )();
  }, [isFoodRecipes]);

  return (
    <div>
      {categories.map((category, key) => (
        <input
          type="button"
          data-testid={ `${category}-category-filter` }
          value={ category }
          key={ key }
          onClick={ handlerClick }
        />
      ))}
    </div>
  );
};

export default RecipesCategories;
