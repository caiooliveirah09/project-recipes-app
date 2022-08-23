const filterRecipesLength = (recipes) => (
  recipes.filter((recipe, index) => {
    const LENGHT = 12;
    return index < LENGHT;
  })
);

const foodRecipesApi = async () => {
  const recipes = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((res) => res.json())
    .then((res) => res.meals);
  return filterRecipesLength(recipes);
};

const drinkRecipesApi = async () => {
  const recipes = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((res) => res.json())
    .then((res) => res.drinks);
  return filterRecipesLength(recipes);
};

const fetchRecipes = async (isFoodRecipes) => {
  if (isFoodRecipes) return foodRecipesApi();
  return drinkRecipesApi();
};

export default fetchRecipes;
