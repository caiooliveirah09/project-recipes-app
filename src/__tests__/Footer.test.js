import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

describe('test the Footer component', () => {
  test('1 - test if it has the basic structure', () => {
    const { history } = renderWithRouterAndContext(<Footer />);
    expect(history.location.pathname).toBe('/');
    const drinksBottomBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinksBottomBtn).toBeInTheDocument();
    const foodBottomBtn = screen.getByTestId('food-bottom-btn');
    expect(foodBottomBtn).toBeInTheDocument();
  });
  test('2 - tests if clicking on the drink redirects to /drinks', () => {
    const { history } = renderWithRouterAndContext(<Footer />);
    expect(history.location.pathname).toBe('/');
    const drinksBottomBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBottomBtn);
    expect(history.location.pathname).toBe('/drinks');
  });
  test('3 - tests if clicking on the snack redirects to /foods', () => {
    const { history } = renderWithRouterAndContext(<Footer />);
    expect(history.location.pathname).toBe('/');
    const foodBottomBtn = screen.getByTestId('food-bottom-btn');
    userEvent.click(foodBottomBtn);
    expect(history.location.pathname).toBe('/foods');
  });
});
