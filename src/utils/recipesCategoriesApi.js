const filterRecipesLength = (categories) => (
  categories.filter((category, index) => {
    const LENGHT = 5;
    return index < LENGHT;
  })
);

const foodCategoriesRecipesApi = async () => {
  const categories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((res) => res.json())
    .then((res) => res.meals);
  return filterRecipesLength(categories);
};

const drinkCategoriesRecipesApi = async () => {
  const categories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((res) => res.json())
    .then((res) => res.drinks);
  return filterRecipesLength(categories);
};

const fetchRecipesCategories = async (isFoodRecipes) => {
  if (isFoodRecipes) return foodCategoriesRecipesApi();
  return drinkCategoriesRecipesApi();
};

export default fetchRecipesCategories;
