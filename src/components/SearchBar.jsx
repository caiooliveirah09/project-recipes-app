import React from 'react';

export default function SearchBar() {
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
          />
          First letter
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </form>
    </div>
  );
}
