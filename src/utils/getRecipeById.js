const getFoodRecipeById = async (id) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((res) => res.meals[0])
);

const getDrinkRecipeById = async (id) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((res) => res.drinks[0])
);

const getRecipeById = async (isFoodRecipes, filter) => {
  if (isFoodRecipes) return getFoodRecipeById(filter);
  if (isFoodRecipes !== undefined) return getDrinkRecipeById(filter);
};

export default getRecipeById;
