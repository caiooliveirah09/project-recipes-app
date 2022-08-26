import React from 'react';
import { screen } from '@testing-library/react';
import DrinkDetail from '../pages/DrinkDetail';
// import App from '../App';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

describe('test the DrinkDetail page', () => {
  test('1 - IN CONSTRUCTION', () => {
    const { history } = renderWithRouterAndContext(<DrinkDetail />, '/drinks/15997');
    expect(history.location.pathname).toBe('/drinks/15997');
    console.log(history.location.pathname);
    const initialText = screen.getByText('Drink Detail');
    expect(initialText).toBeInTheDocument();
    // const error = screen.getByText('error');
  });
});
