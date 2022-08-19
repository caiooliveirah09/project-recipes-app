import { useState, useEffect } from 'react';

const AppRecipesApi = async () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [nationalitiesData, setNationalitiesData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json())
      .then((res) => setCategoriesData(res.meals));
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((res) => res.json())
      .then((res) => setNationalitiesData(res.meals));
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((res) => res.json())
      .then((res) => setIngredientsData(res.meals));
  }, []);

  return ({
    categoriesData,
    nationalitiesData,
    ingredientsData,
  });
};

export default AppRecipesApi;
