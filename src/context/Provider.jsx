import React, { useState } from 'react';
import { node } from 'prop-types';
import Context from './Context';
import getMealsOrDrinksApi from '../utils/getMealsOrDrinksApi';

export default function Provider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [research, setResearch] = useState('');
  const [researchFilter, setResearchFilter] = useState('');

  const emptyAnswerAlert = 'Sorry, we haven\'t found any '
    + 'recipes for these filters.';

  const getApi = (type) => {
    if (research.length > 1 && researchFilter === 'first-letter') {
      return global.alert('Your search must have only 1 (one) character');
    }

    const updateState = type === 'meals' ? setMeals : setDrinks;

    getMealsOrDrinksApi(research, researchFilter, type)
      .then((data) => {
        if (data[type]?.length === 0 || data[type] === null) {
          return global.alert(emptyAnswerAlert);
        }
        return updateState(data[type] || []);
      });
  };

  const getApiMeals = () => getApi('meals');
  const getApiDrinks = () => getApi('drinks');
  const updateSearch = (value) => setResearch(value);
  const updateResearchFilter = (value) => setResearchFilter(value);

  const value = {
    drinks,
    meals,
    research,
    updateSearch,
    updateResearchFilter,
    getApiMeals,
    getApiDrinks,
  };

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;
