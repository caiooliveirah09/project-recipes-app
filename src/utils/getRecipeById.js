const formatRecipe = (recipe) => {
  const ingredients = [];
  for (let i = 1; recipe[`strIngredient${i}`]; i += 1) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    ingredients.push({ ingredient, measure });
  }
  const urlVideo = (recipe.strYoutube || '');
  const urlVideoSplitted = urlVideo ? urlVideo.split('watch?v=') : urlVideo;
  const video = urlVideo ? `${urlVideoSplitted[0]}embed/${urlVideoSplitted[1]}` : '';
  return {
    id: recipe.idMeal || recipe.idDrink,
    thumb: recipe.strDrinkThumb || recipe.strMealThumb,
    name: recipe.strDrink || recipe.strMeal,
    category: recipe.strCategory || '',
    ingredients,
    instructions: recipe.strInstructions,
    video,
    alcoholic: recipe.strAlcoholic || '',
    nationality: recipe.strArea || '',
  };
};

const getFoodRecipeById = async (id) => {
  const recipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((res) => res.meals[0]);
  return formatRecipe(recipe);
};

const getDrinkRecipeById = async (id) => {
  const recipe = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((res) => res.drinks[0]);
  return formatRecipe(recipe);
};

const getRecipeById = async (isFoodRecipes, filter) => {
  if (isFoodRecipes) return getFoodRecipeById(filter);
  if (isFoodRecipes !== undefined) return getDrinkRecipeById(filter);
};

export default getRecipeById;
