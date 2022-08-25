import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext';
import getRecipeById from '../utils/getRecipeById';
import fetchRecommendedRecipes from '../utils/recommendedRecipes';

function RecipeDetail() {
  const { id } = useParams();
  const { isFoodRecipes } = useContext(RecipesContext);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  console.log(1, isFoodRecipes);

  // useEffect(() => {
  //   (
  //     async () => {
  //       const LENGTH = 4;
  //       const recommendationsData = await fetchRecommendedRecipes(!isFoodRecipes, LENGTH);
  //       setRecommendations(recommendationsData);
  //     }
  //   )();
  // }, []);

  useEffect(() => {
    if (isFoodRecipes !== undefined) {
      (
        async () => {
          const recipeData = await getRecipeById(isFoodRecipes, id);
          setRecipeDetails(recipeData);
          const LENGTH = 4;
          const recommendedData = await fetchRecommendedRecipes(!isFoodRecipes, LENGTH);
          setRecommendations(recommendedData);
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
      {isFoodRecipes && (
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
      <div data-testid="recomendation-card">
        {recommendations.map((recommendation, index) => (
          <div key={ index } data-testid={ `${index}-recomendation-card` }>
            <img
              src={ recommendation.thumb }
              style={ { width: '100px' } }
              alt={ `${recommendation.name}` }
            />
            <p
              style={ { width: '100px' } }
            >
              {`${recommendation.name}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeDetail;
