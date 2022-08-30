import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/Login';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

const email = 'email-input';
const password = 'password-input';
const login = 'login-submit-btn';

describe('test Login page', () => {
  test('1- test if the basic structure of the page appears', () => {
    render(<Login />);
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginSubmitBtn = screen.getByTestId(login);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();
  });
  test('2 - tests if the login button is disabled if you dont fill in the fields', () => {
    render(<Login />);
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');
    expect(loginSubmitBtn).toHaveProperty('disabled', true);
  });
  test('3 - tests if the login button activates if you fill in the fields', () => {
    render(<Login />);
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginSubmitBtn = screen.getByTestId(login);
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginSubmitBtn).toHaveProperty('disabled', false);
  });
  test('5 - tests if when logging in it goes to the /foods route', () => {
    const { history } = renderWithRouterAndContext(<Login />);
    expect(history.location.pathname).toBe('/');
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginSubmitBtn = screen.getByTestId(login);
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginSubmitBtn);
    expect(history.location.pathname).toBe('/foods');
  });
});
