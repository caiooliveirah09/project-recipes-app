import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const [visibleSearchEntry, setVisibleSearchEntry] = useState(false);
  const { research, updateSearch } = useContext(Context);

  const history = useHistory();
  const { location: { pathname } } = history;

  const showSearchBtnEnabled = ['/foods', '/drinks'];
  const routesTitle = {
    '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
    '/profile': 'Profile',
  };

  return (
    <header>
      <h1 data-testid="page-title">{routesTitle[pathname]}</h1>

      <button type="button" onClick={ () => history.push('/profile') }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" />
      </button>

      { showSearchBtnEnabled.includes(pathname)
        && (
          <button
            onClick={ () => setVisibleSearchEntry(!visibleSearchEntry) }
            type="button"
          >
            <img
              alt="search icon"
              data-testid="search-top-btn"
              src={ searchIcon }
            />
          </button>
        ) }

      { visibleSearchEntry && (
        <input
          data-testid="search-input"
          onChange={ ({ target: { value } }) => updateSearch(value) }
          placeholder="Search recipe"
          value={ research }
        />
      ) }

      <SearchBar />
    </header>
  );
}
