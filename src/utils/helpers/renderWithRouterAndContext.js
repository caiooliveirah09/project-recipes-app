import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { RecipesProvider } from '../../context/RecipesContext';
import Provider from '../../context/Provider';

const renderWithRouterAndContext = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return ({
    ...render(
      <Router history={ history }>
        <Provider>
          <RecipesProvider>
            {component}
          </RecipesProvider>
        </Provider>
      </Router>,
    ),
    history,
  });
};
export default renderWithRouterAndContext;
