export default async (value = '', filter = 'name', type = 'meals') => {
  let urlApi = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/'
    : 'https://www.thecocktaildb.com/api/json/v1/1/';

  switch (filter) {
  case 'ingredient': urlApi += `filter.php?i=${value}`; break;
  case 'first-letter': urlApi += `search.php?f=${value}`; break;
  default: urlApi += `search.php?s=${value}`; break;
  }

  try {
    const response = await fetch(urlApi); return response.json();
  } catch { return {}; }
};
