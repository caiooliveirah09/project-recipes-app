import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [searchArea, setSearchArea] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;
  const conditionalArray = ['/profile', '/done-recipes', '/favorite-recipes'];
  const routeObject = { '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
    '/profile': 'Profile',
  };
  return (
    <header>
      <h1 data-testid="page-title">{routeObject[pathname]}</h1>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile Icone" />
      </button>
      {!conditionalArray.includes(pathname)
      && (
        <button type="button" onClick={ () => setSearchArea(!searchArea) }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searcg Icone"
          />
        </button>
      )}
      {searchArea && <input placeholder="Pesquisar" data-testid="search-input" />}
    </header>
  );
}
export default Header;
