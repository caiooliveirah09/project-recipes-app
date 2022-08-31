import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function SearchBar() {
  const {
    updateResearchFilter, getApiMeals, getApiDrinks,
  } = useContext(Context);

  const { location: { pathname } } = useHistory();
  const requestApi = pathname === '/foods' ? getApiMeals : getApiDrinks;

  return (
    <div>
      <form>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            value="ingredient"
            type="radio"
            name="searchFilter"
            data-testid="ingredient-search-radio"
            onChange={ ({ target: { value } }) => updateResearchFilter(value) }
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            id="name"
            value="name"
            type="radio"
            name="searchFilter"
            data-testid="name-search-radio"
            onChange={ ({ target: { value } }) => updateResearchFilter(value) }
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            id="first-letter"
            value="first-letter"
            type="radio"
            name="searchFilter"
            data-testid="first-letter-search-radio"
            onChange={ ({ target: { value } }) => updateResearchFilter(value) }
          />
          First letter
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ requestApi }
        >
          Search
        </button>
      </form>
    </div>
  );
}
