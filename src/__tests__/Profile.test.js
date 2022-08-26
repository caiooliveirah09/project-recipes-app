import React from 'react';
import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

describe('test the Profile page', () => {
  test('1 - IN CONSTRUCTION', () => {
    const { history } = renderWithRouterAndContext(<Profile />, '/profile');
    expect(history.location.pathname).toBe('/profile');
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });
});
