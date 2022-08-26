import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext';
import getRecipeById from '../utils/getRecipeById';
import fetchRecommendedRecipes from '../utils/recommendedRecipes';

// Os trechos comentados são a implementação de um carrossel.
// Porém, não passa nos tests, implementar apenas depois de finalizar tudo
function RecipeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { isFoodRecipes } = useContext(RecipesContext);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  // const [recommendationsFiltered, setRecommendationsFiltered] = useState([]);
  // const [recommendationPage, setRecommendationPage] = useState(0);

  // const nextRecommendations = () => {
  //   console.log('nextRecommendations');
  //   console.log('recommendationPage:', recommendationPage);
  //   const LAST_PAGE = 3;
  //   if (recommendationPage < LAST_PAGE) {
  //     const page = recommendationPage + 2;
  //     console.log('page:', page);
  //     setRecommendationsFiltered([recommendations[page], recommendations[page + 1]]);
  //     setRecommendationPage(page);
  //   }
  // };

  // const previousRecommendations = () => {
  //   console.log('previousRecommendations');
  //   console.log('recommendationPage:', recommendationPage);
  //   if (recommendationPage > 1) {
  //     const page = recommendationPage - 2;
  //     console.log('page:', page);
  //     setRecommendationsFiltered([recommendations[page], recommendations[page + 1]]);
  //     setRecommendationPage(page);
  //   }
  // };
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

  useEffect(() => {
    if (isFoodRecipes !== undefined) {
      // const oi = {
      //   cocktails: {
      //     52804: [1, 2],
      //   },
      //   meals: {
      //     15288: [2, 1],
      //   },
      // };
      // localStorage.setItem('inProgressRecipes', JSON.stringify(oi));
      (
        async () => {
          const recipeData = await getRecipeById(isFoodRecipes, id);
          setRecipeDetails(recipeData);
          const LENGTH = 6;
          const recommendedData = await fetchRecommendedRecipes(!isFoodRecipes, LENGTH);
          setRecommendations(recommendedData);
          // setRecommendationsFiltered([recommendedData[0], recommendedData[1]]);
        }
      )();
    }
  }, [isFoodRecipes]);

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
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
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
        {/* <input type="button" value="<" onClick={ previousRecommendations } /> */}
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
        {/* <input type="button" value=">" onClick={ nextRecommendations } /> */}
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
