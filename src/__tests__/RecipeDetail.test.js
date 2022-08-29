import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetail from '../components/RecipeDetail';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

describe('test the Recipe Detail component', () => {
  test('1 - ', async () => {
    renderWithRouterAndContext(<RecipeDetail />, '/foods/52878');
    const BeefAndOysterPie = await screen.findByText('Beef');
    // const error = screen.getByTestId('error');
  });
});
