import React from 'react';
import { screen } from '@testing-library/react';
import FoodDetail from '../pages/FoodDetail';
// import App from '../App';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

describe('test the FoodDetail page', () => {
  test('1 - IN CONSTRUCTION', () => {
    const { history } = renderWithRouterAndContext(<FoodDetail />, '/foods/52977');
    expect(history.location.pathname).toBe('/foods/52977');
    console.log(history.location.pathname);
    const initialText = screen.getByText('Food Detail');
    expect(initialText).toBeInTheDocument();
    // const error = screen.getByText('error');
  });
});
