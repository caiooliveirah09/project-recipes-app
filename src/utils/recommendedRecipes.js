const filterRecipesLength = (recipes, length) => (
  recipes.filter((recipe, index) => index < length)
);

const formatRecipes = (recipes) => (recipes.map((recipe) => ({
  thumb: recipe.strDrinkThumb || recipe.strMealThumb,
  name: recipe.strDrink || recipe.strMeal,
})));

const foodRecipesApi = async (length) => {
  const recipes = await
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((res) => res.json())
    .then((res) => res.meals);
  const recipesFormatted = formatRecipes(recipes);
  return filterRecipesLength(recipesFormatted, length);
};

const drinkRecipesApi = async (length) => {
  const recipes = await
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((res) => res.json())
    .then((res) => res.drinks);
  const recipesFormatted = formatRecipes(recipes);
  return filterRecipesLength(recipesFormatted, length);
};

const fetchRecommendedRecipes = async (isFoodRecipes, length) => {
  if (isFoodRecipes) return foodRecipesApi(length);
  if (isFoodRecipes !== undefined) return drinkRecipesApi(length);
  return [];
};

export default fetchRecommendedRecipes;
