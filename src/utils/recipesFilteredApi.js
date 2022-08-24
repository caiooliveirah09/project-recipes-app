const filterRecipesLength = (recipes = []) => (
  recipes.filter((recipe, index) => {
    const LENGHT = 12;
    return index < LENGHT;
  })
);

const foodRecipesApi = async (filter) => {
  const recipes = await
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`)
    .then((res) => res.json())
    .then((res) => res.meals);
  return filterRecipesLength(recipes);
};

const drinkRecipesApi = async (filter) => {
  const recipes = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`)
    .then((res) => res.json())
    .then((res) => res.drinks);
  return filterRecipesLength(recipes);
};

const fetchRecipesFiltered = async (isFoodRecipes, filter) => {
  if (isFoodRecipes) return foodRecipesApi(filter);
  if (isFoodRecipes !== undefined) return drinkRecipesApi(filter);
  return [];
};

export default fetchRecipesFiltered;
