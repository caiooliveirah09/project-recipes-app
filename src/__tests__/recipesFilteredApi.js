import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

const email = 'email-input';
const password = 'password-input';
const login = 'login-submit-btn';

describe('test the Recipes Filtered Api', () => {
  test('1 - test the filter by category of drinks', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    expect(history.location.pathname).toBe('/');
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginSubmitBtn = screen.getByTestId(login);
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginSubmitBtn);
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
    const drinks = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(drinks);
    const GG = await screen.findByText('GG');
    expect(GG).toBeInTheDocument();
    const ordinaryDrink = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(ordinaryDrink).toBeInTheDocument();
    userEvent.click(ordinaryDrink);
    const recipe1 = await screen.findByText('3-Mile Long Island Iced Tea');
    expect(recipe1).toBeInTheDocument();
  });
});
