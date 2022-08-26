import React from 'react';
import { screen } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

describe('test the Favorite Recipes page', () => {
  test('1 - IN CONSTRUCTION', () => {
    renderWithRouterAndContext(<FavoriteRecipes />);
    const initialText = screen.getByText('Favorite Recipes');
    expect(initialText).toBeInTheDocument();
    // const error = screen.getByText('error');
  });
});
