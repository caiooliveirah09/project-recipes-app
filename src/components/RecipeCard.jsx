import React from 'react';
import Proptypes from 'prop-types';

function RecipeCard({ index, thumb, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ thumb }
        style={ { width: '100px' } }
        alt={ `${name}` }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{`${name}`}</p>
    </div>
  );
}

RecipeCard.propTypes = {
  index: Proptypes.number.isRequired,
  thumb: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
};

export default RecipeCard;
