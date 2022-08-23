import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
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
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profile Icone" />
      {!conditionalArray.includes(pathname) && <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="searcg Icone"
      />}
    </header>
  );
}
export default Header;
