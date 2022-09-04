// FoodInProgress
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getFoodRecipeById } from '../utils/getRecipeById';
import managerIngredients from '../utils/managerLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FoodInProgress({ match }) {
  const [food, setFood] = useState({
    ingredients: [],
  });
  const [wasCopied, setWasCopied] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [favoriteB, setFavoriteB] = useState(false);
  const history = useHistory();
  const pageId = match.params.id;

  console.log(food);

  useEffect(() => {
    async function recipe() {
      const x = await getFoodRecipeById(pageId);

      setFood(x);

      // Requisition
      const requisition = async () => {
        const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || '';
        const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || '';

        const request = (data) => {
          const w = JSON.parse(localStorage.getItem('inProgressRecipes')) || 'NDA';
          if (w !== 'NDA') {
            const keys = Object.keys(w);

            const search = keys.some((p) => p === pageId);

            if (search === true) {
              return {
                cocktails,
                meals: {
                  ...meals,
                },
              };
            }
          }
          return data;
        };

        localStorage.setItem('inProgressRecipes', JSON.stringify(request({
          cocktails,
          meals: {
            ...meals,
            [pageId]: [...x.ingredients],
          },
        })));
      };
      requisition();
    }
    recipe();

    setIngredients(managerIngredients.verifyLocalStorage(pageId).checkeds(pageId));

    const hop = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    setFavoriteB(hop);
  }, []);

  const favorite = () => {
    const all = favoriteB.some((it) => it.id === pageId);

    console.log(all);

    if (all) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(favoriteB.filter((recipe) => recipe.id !== pageId)));
      setFavoriteB(favoriteB.filter((recipe) => recipe.id !== pageId));
    } else {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([
          ...favoriteB, {
            id: food.id,
            type: food.type,
            nationality: food.nationality,
            category: food.category,
            alcoholicOrNot: food.alcoholic,
            name: food.name,
            image: food.thumb,
          }]));
      setFavoriteB([
        ...favoriteB, {
          id: food.id,
          type: food.type,
          nationality: food.nationality,
          category: food.category,
          alcoholicOrNot: food.alcoholic,
          name: food.name,
          image: food.thumb,
        }]);
    }
  };

  const checkF = () => {
    const a = favoriteB || [];
    const p = a.some((it) => it.id === pageId);

    return p;
  };

  const favoriteIcon = checkF() ? blackHeartIcon : whiteHeartIcon;

  const copyLink = () => {
    clipboardCopy(`http://localhost:3000/foods/${pageId}`);
    setWasCopied(true);
  };

  return (
    <div>
      <div>
        <img src={ food.thumb } data-testid="recipe-photo" alt="" />
        <h1 data-testid="recipe-title">{ food.name }</h1>
        <p data-testid="recipe-category">{ food.category }</p>
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
            { food.ingredients.map((ingredient, i) => (
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
          <p data-testid="instructions">{ food.instructions }</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={
              (food.ingredients).length
              !== managerIngredients.verifyLocalStorage(pageId).checkeds(pageId).length
            }
            onClick={ () => {
              const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
              const date = Date.now();
              const today = new Date(date);
              const u = today.toDateString(); // "Sun Jan 30 2022"
              localStorage.setItem('doneRecipes', JSON.stringify([
                ...done,
                {
                  ...food,
                  date: u,
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

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
