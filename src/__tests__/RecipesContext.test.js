import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';
import Drinks from '../pages/Drinks';
import Foods from '../pages/Foods';

describe('test the Recipes Context', () => {
  test('1 - test if the fetch data appears on the food screen', async () => {
    const { history } = renderWithRouterAndContext(<Foods />, '/foods');
    expect(history.location.pathname).toBe('/foods');
    const All = await screen.findByTestId('All-category-filter');
    expect(All).toBeInTheDocument();
    const Beef = await screen.findByTestId('Beef-category-filter');
    expect(Beef).toBeInTheDocument();
    const Breakfast = await screen.findByTestId('Breakfast-category-filter');
    expect(Breakfast).toBeInTheDocument();
    const Chicken = await screen.findByTestId('Chicken-category-filter');
    expect(Chicken).toBeInTheDocument();
    const Dessert = await screen.findByTestId('Dessert-category-filter');
    expect(Dessert).toBeInTheDocument();
    const Goat = await screen.findByTestId('Goat-category-filter');
    expect(Goat).toBeInTheDocument();
    const All0 = await screen.findByText('Corba');
    expect(All0).toBeInTheDocument();
    userEvent.click(Beef);
    const Beef0 = await screen.findByText('Beef and Mustard Pie');
    expect(Beef0).toBeInTheDocument();
    userEvent.click(All);
    const All1 = await screen.findByText('Burek');
    expect(All1).toBeInTheDocument();
  });
  test('2 - test if the fetch data appears on the drinks screen', async () => {
    const { history } = renderWithRouterAndContext(<Drinks />, '/drinks');
    expect(history.location.pathname).toBe('/drinks');
    const All = await screen.findByTestId('All-category-filter');
    expect(All).toBeInTheDocument();
    const ordinaryDrink = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(ordinaryDrink).toBeInTheDocument();
    const cocktail = await screen.findByTestId('Cocktail-category-filter');
    expect(cocktail).toBeInTheDocument();
    const shake = await screen.findByTestId('Shake-category-filter');
    expect(shake).toBeInTheDocument();
    const otherUnknown = await screen.findByTestId('Other/Unknown-category-filter');
    expect(otherUnknown).toBeInTheDocument();
    const cocoa = await screen.findByTestId('Cocoa-category-filter');
    expect(cocoa).toBeInTheDocument();
  });
});
