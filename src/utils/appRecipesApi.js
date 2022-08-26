const appRecipesApi = async () => {
  const categoriesData = await
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((res) => res.json())
    .then((res) => res.meals);
  const nationalitiesData = await
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((res) => res.json())
    .then((res) => res.meals);
  const ingredientsData = await
  fetch('https://filter.php?i/list.php?i=list')
    .then((res) => res.json())
    .then((res) => res.meals);

  return ({
    categoriesData,
    nationalitiesData,
    ingredientsData,
  });
};

export default appRecipesApi;
