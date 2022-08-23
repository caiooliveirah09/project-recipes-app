import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

function renderWithRouter(
  component,
  {
    homeP = '/',
    history = createMemoryHistory([homeP]),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export default renderWithRouter;
