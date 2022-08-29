import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const style = {
  display: 'flex',
  width: '220px',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

export default function FavoriteRecipes() {
  const [allRecipes, setAllRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));
  const [recipes, setRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));
  const [shared, setShared] = useState();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const myFilter = () => {
      if (filter === 'all') {
        setRecipes(allRecipes);
        return;
      }
      const filtered = allRecipes.filter((r) => r.type === filter);
      setRecipes(filtered);
    };
    myFilter();
  }, [filter]);

  const shareBtn = (type, id) => {
    setShared(id);
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
  };

  const removeFavorite = (id) => {
    console.log(id);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = favoriteRecipes
      .filter((r) => r.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setAllRecipes(newFavoriteRecipes);
    if (filter === 'all') {
      setRecipes(newFavoriteRecipes);
      return;
    }
    const filtered = newFavoriteRecipes.filter((r) => r.type === filter);
    setRecipes(filtered);
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('food') }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      <div style={ style }>
        { recipes && recipes.map((r, index) => (
          <div key={ index }>
            <Link to={ `/${r.type}s/${r.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ r.image }
                alt={ r.name }
                style={ { width: '100px' } }
              />
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
              style={ { width: '100px' } }
            >
              { `${r.nationality} - ${r.category}
                ${r.alcoholicOrNot}` }
            </p>
            <Link to={ `/${r.type}s/${r.id}` }>
              <p
                data-testid={ `${index}-horizontal-name` }
                style={ { width: '100px' } }
              >
                { r.name }
              </p>
            </Link>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              label="favorite"
              onClick={ () => shareBtn(r.type, r.id) }
            >
              <img src={ shareIcon } alt="share icon" />
              { shared === r.id && <p>Link copied!</p>}
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              label="share"
              onClick={ () => removeFavorite(r.id) }
            >
              <img src={ blackHeartIcon } alt="black heart icon" />
            </button>
          </div>))}
      </div>
    </div>
  );
}
