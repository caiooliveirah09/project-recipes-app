import clipboardCopy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext';
import getRecipeById from '../utils/getRecipeById';
import fetchRecommendedRecipes from '../utils/recommendedRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { isFoodRecipes } = useContext(RecipesContext);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [wasCopied, setWasCopied] = useState(false);
  const [isRecipeFavorite, setIsRecipeFavorite] = useState();

  const favoriteIcon = isRecipeFavorite ? blackHeartIcon : whiteHeartIcon;

  const wasAlreadyDone = () => {
    if (!recipeDetails.id) return false;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    return !doneRecipes.find((recipe) => recipe.id === recipeDetails.id);
  };

  const wasAlreadyStarted = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) return false;
    const foodRecipesId = Object.keys(inProgressRecipes.meals || {}) || [];
    const drinksRecipesId = Object.keys(inProgressRecipes.cocktails || {}) || [];

    return (
      foodRecipesId.includes(recipeDetails.id)
      || drinksRecipesId.includes(recipeDetails.id)
    );
  };

  const verifyRecipeFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    return !!favoriteRecipes.find((recipe) => recipe.id === recipeDetails.id);
  };

  const removeFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFavoriteRecipes = favoriteRecipes
      .filter((recipe) => recipe.id !== recipeDetails.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setIsRecipeFavorite(false);
  };

  const addFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsRecipeFavorite(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...favoriteRecipes, {
        id: recipeDetails.id,
        type: isFoodRecipes ? 'food' : 'drink',
        nationality: recipeDetails.nationality,
        category: recipeDetails.category,
        alcoholicOrNot: recipeDetails.alcoholic,
        name: recipeDetails.name,
        image: recipeDetails.thumb,
      }],
    ));
  };

  const handlerFavoriteRecipe = () => {
    if (verifyRecipeFavorite()) removeFavorite();
    else addFavorite();
  };

  const copyLink = () => {
    clipboardCopy(window.location.href);
    setWasCopied(true);
  };

  useEffect(() => {
    if (isFoodRecipes !== undefined) {
      (
        async () => {
          const recipeData = await getRecipeById(isFoodRecipes, id);
          setRecipeDetails(recipeData);
          const LENGTH = 6;
          const recommendedData = await fetchRecommendedRecipes(!isFoodRecipes, LENGTH);
          setRecommendations(recommendedData);
        }
      )();
    }
  }, [isFoodRecipes]);

  useEffect(() => {
    if (recipeDetails.id !== undefined) {
      (
        async () => {
          setIsRecipeFavorite(verifyRecipeFavorite());
        }
      )();
    }
  }, [recipeDetails]);

  return (
    <div>
      <img
        style={ { width: '350px' } }
        src={ recipeDetails?.thumb }
        data-testid="recipe-photo"
        alt={ recipeDetails?.name }
      />
      <h2 data-testid="recipe-title">
        { recipeDetails?.name }
      </h2>
      <h3 data-testid="recipe-category">
        { recipeDetails.alcoholic || recipeDetails.category }
      </h3>
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
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handlerFavoriteRecipe }
        src={ favoriteIcon }
      >
        {isRecipeFavorite !== undefined && (<img src={ favoriteIcon } alt="" />)}
      </button>
      <h2>Ingredients</h2>
      <ul>
        { recipeDetails.ingredients
        && recipeDetails.ingredients.map(({ ingredient, measure }, index) => (
          <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient}: ${measure}`}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">
        { recipeDetails?.instructions }
      </p>
      { isFoodRecipes && (
        <iframe
          width="350"
          height="197"
          src={ recipeDetails.video }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="video"
        />
      )}
      <div
        style={ {
          width: '199px',
          display: 'flex',
          justifyContent: 'space-between',
          overflowX: 'scroll',
        } }
        data-testid="recomendations-card"
      >
        { recommendations.map((recommendation, index) => (
          <div key={ index } data-testid={ `${index}-recomendation-card` }>
            <img
              src={ recommendation.thumb }
              style={ { width: '100px' } }
              alt={ `${recommendation.name}` }
              data-testid={ `${index}-recomendation-thumb` }
            />
            <p
              style={ { width: '100px' } }
              data-testid={ `${index}-recomendation-title` }
            >
              {`${recommendation.name}`}
            </p>
          </div>
        ))}
      </div>
      { wasAlreadyDone() && (
        <Link to={ `${location.pathname}/in-progress` }>
          <button
            style={ {
              position: 'fixed',
              bottom: '0',
            } }
            data-testid="start-recipe-btn"
            type="button"
          >
            { wasAlreadyStarted() ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        </Link>
      )}
    </div>
  );
}

export default RecipeDetail;
