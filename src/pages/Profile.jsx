import React from 'react';
import Footer from '../components/Footer';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
// import DoneRecipes from './DoneRecipes';

export default function Profile() {
  const email = localStorage.getItem('user');
  // const history = useHistory();

  function clearHandler() {
    localStorage.clear();
  }
  // function handler(a) {
  //   return history.push(`/${a}`);
  // }

  return (
    <div>
      <Header />
      <Footer />
      <fieldset>
        <p
          type="email"
          data-testid="profile-email"
        >
          {email}
        </p>
        <a href="/done-recipes">
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            Done Recipes
          </button>
        </a>
        <a href="/favorite-recipes">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes

          </button>
        </a>
        <a href="/">
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ clearHandler }
          >
            Logout

          </button>
        </a>
      </fieldset>
    </div>
  );
}
