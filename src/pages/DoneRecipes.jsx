import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const itens = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const [filtered, setFiltered] = useState(itens);
  const [wasCopied, setWasCopied] = useState(false);

  console.log(itens);

  const copyLink = (f, index) => {
    clipboardCopy(`http://localhost:3000/${f}/${index}`);
    setWasCopied(true);
  };

  // Função de filtro
  const filter = (response) => {
    switch (response) {
    case 'Food':
      setFiltered(itens.filter((r) => r.type === 'food'));
      break;
    case 'Drink':
      setFiltered(itens.filter((r) => r.type === 'drink'));
      break;
    default:
      setFiltered(itens);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <button
          name="Food"
          onClick={ () => { filter('Food'); } }
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>

        <button
          name="Drink"
          data-testid="filter-by-drink-btn"
          onClick={ () => { filter('Drink'); } }
          type="button"
        >
          Drink
        </button>

        <button
          data-testid="filter-by-all-btn"
          name="All"
          onClick={ () => { filter(); } }
          type="button"
        >
          All
        </button>
      </div>
      <div>
        { filtered.map((r, i) => (
          r.type === 'food' ? (
            <>
              <div>
                <Link
                  to={ `foods/${r.id}` }
                >
                  <img
                    style={ { width: '350px' } }
                    data-testid={ `${i}-horizontal-image` }
                    src={ r.image }
                    alt={ r.name }
                  />
                </Link>
                <Link
                  to={ `foods/${r.id}` }
                >
                  <h1 data-testid={ `${i}-horizontal-name` }>{r.name}</h1>
                </Link>
                <p data-testid={ `${i}-horizontal-top-text` }>
                  {`${r.nationality} - ${r.category}`}
                </p>
                <date data-testid={ `${i}-horizontal-done-date` }>{r.doneDate}</date>
                <p data-testid={ `${i}-Pasta-horizontal-tag` }>{r.tags}</p>
                <p data-testid={ `${i}-Curry-horizontal-tag` }>{r.tags}</p>
              </div>
              <div>
                <button
                  type="button"
                  data-testid={ `${i}-horizontal-share-btn` }
                  onClick={ () => { copyLink('foods', r.id); } }
                  src={ shareIcon }
                >
                  <img src={ shareIcon } alt="" />
                </button>
                {wasCopied && (<p>Link copied!</p>)}
              </div>
            </>
          )
            : (
              <>
                <div>
                  <Link
                    to={ `drinks/${r.id}` }
                  >
                    <img
                      style={ { width: '350px' } }
                      data-testid={ `${i}-horizontal-image` }
                      src={ r.image }
                      alt={ r.name }
                    />
                  </Link>
                  <Link
                    to={ `drinks/${r.id}` }
                  >
                    <h1 data-testid={ `${i}-horizontal-name` }>{r.name}</h1>
                  </Link>
                  <p data-testid={ `${i}-horizontal-top-text` }>{r.alcoholicOrNot}</p>
                  <date data-testid={ `${i}-horizontal-done-date` }>{r.doneDate}</date>
                </div>
                <div>
                  <button
                    type="button"
                    src={ shareIcon }
                    data-testid={ `${i}-horizontal-share-btn` }
                    onClick={ () => { copyLink('drinks', r.id); } }
                  >
                    <img src={ shareIcon } alt="" />
                  </button>
                  {wasCopied && (<p>Link copied!</p>)}
                </div>
              </>
            )
        )) }
      </div>
    </div>
  );
}
