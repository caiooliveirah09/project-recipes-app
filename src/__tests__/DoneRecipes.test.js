import React from 'react';
import { screen } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

describe('test the DoneRecipes page', () => {
  test('1 - IN CONSTRUCTION', () => {
    renderWithRouterAndContext(<DoneRecipes />);
    const initialText = screen.getByText('Done Recipes');
    expect(initialText).toBeInTheDocument();
    // const error = screen.getByText('error');
  });
});
