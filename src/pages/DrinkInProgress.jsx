// drinkInProgress
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDrinkRecipeById } from '../utils/getRecipeById';
import managerIngredients from '../utils/managerLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DrinkInProgress({ match }) {
  const [drink, setDrink] = useState({
    ingredients: [],
  });
  const [wasCopied, setWasCopied] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [favoriteB, setFavoriteB] = useState(false);
  const history = useHistory();
  const pageId = match.params.id;

  console.log(drink);

  const dataActual = new Date();
  const dia = String(dataActual.getDate()).padStart(2, '0');
  const mes = String(dataActual.getMonth() + 1).padStart(2, '0');
  const ano = dataActual.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;
  console.log(dataAtual);

  useEffect(() => {
    async function recipe() {
      const currentDrink = await getDrinkRecipeById(pageId);

      setDrink(currentDrink);

      const requisition = async () => {
        const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || '';
        const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || '';

        const request = (data) => {
          const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
          || 'NDA';
          if (inProgress !== 'NDA') {
            const keys = Object.keys(inProgress);

            const search = keys.some((p) => p === pageId);

            if (search === true) {
              return {
                meals,
                cocktails: {
                  ...cocktails,
                },
              };
            }
          }
          return data;
        };

        localStorage.setItem('inProgressRecipes', JSON.stringify(request({
          meals,
          cocktails: {
            ...cocktails,
            [pageId]: [...currentDrink.ingredients],
          },
        })));
      };
      requisition();
    }
    recipe();

    setIngredients(managerIngredients.verifyLocalStorage(pageId).checkeds(pageId));

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    setFavoriteB(favorites);
  }, []);

  const favorite = () => {
    const all = favoriteB.some((it) => it.id === pageId);

    if (all) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(favoriteB.filter((recipe) => recipe.id !== pageId)));
      setFavoriteB(favoriteB.filter((recipe) => recipe.id !== pageId));
    } else {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([
          ...favoriteB, {
            id: drink.id,
            type: drink.type,
            nationality: drink.nationality,
            category: drink.category,
            alcoholicOrNot: drink.alcoholic,
            name: drink.name,
            image: drink.thumb,
          }]));
      setFavoriteB([
        ...favoriteB, {
          id: drink.id,
          type: drink.type,
          nationality: drink.nationality,
          category: drink.category,
          alcoholicOrNot: drink.alcoholic,
          name: drink.name,
          image: drink.thumb,
        }]);
    }
  };

  const checkF = () => {
    const favs = favoriteB || [];
    const verify = favs.some((it) => it.id === pageId);

    return verify;
  };

  const favoriteIcon = checkF() ? blackHeartIcon : whiteHeartIcon;

  const copyLink = () => {
    clipboardCopy(`http://localhost:3000/drinks/${pageId}`);
    setWasCopied(true);
  };

  return (
    <div>
      <div>
        <img src={ drink.thumb } data-testid="recipe-photo" alt="" />
        <h1 data-testid="recipe-title">{ drink.name }</h1>
        <p data-testid="recipe-category">{ drink.category }</p>
        <p>{ drink.alcoholic }</p>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ copyLink }
          >
            Share
          </button>
          { wasCopied && (<p>Link copied!</p>)}
        </div>
        <div>
          Favorite
          <button
            data-testid="favorite-btn"
            type="button"
            name="favourite"
            src={ favoriteIcon }
            onClick={ () => {
              favorite();
            } }
          >
            <img src={ favoriteIcon } alt="" />
          </button>
          <div>
            Ingredientes
            { drink.ingredients.map((ingredient, i) => (
              <div key={ i } data-testid={ `${i}-ingredient-step` }>
                <p
                  id={ i }
                  style={ { textDecoration: ingredients.includes(ingredient.ingredient)
                    ? 'line-through' : 'none' } }
                >
                  {ingredient.ingredient}
                </p>
                <input
                  type="checkbox"
                  defaultChecked={ managerIngredients.verifyLocalStorage(pageId)
                    .getCheckedIngredients(pageId, ingredient.ingredient) }
                  onClick={ ({ target }) => {
                    if (!target.checked) {
                      managerIngredients.verifyLocalStorage(pageId)
                        .removeIngredients(pageId, ingredient.ingredient);
                      setIngredients(managerIngredients
                        .verifyLocalStorage(pageId).checkeds(pageId));
                    } else {
                      managerIngredients.verifyLocalStorage(pageId)
                        .addIngredient(pageId, ingredient.ingredient);
                      setIngredients(managerIngredients
                        .verifyLocalStorage(pageId).checkeds(pageId));
                    }
                  } }
                />
              </div>
            )) }
          </div>
          <p data-testid="instructions">{ drink.instructions }</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={
              (drink.ingredients).length
              !== managerIngredients.verifyLocalStorage(pageId).checkeds(pageId).length
            }
            onClick={ () => {
              const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
              localStorage.setItem('doneRecipes', JSON.stringify([
                ...done,
                {
                  ...drink,
                  image: drink.thumb,
                  doneDate: dataAtual,
                  alcoholicOrNot: drink.alcoholic,
                },
              ]));
              history.push('/done-recipes');
            } }
          >
            Finalizar Receita
          </button>
        </div>
      </div>
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
