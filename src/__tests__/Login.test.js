import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';

import Login from '../components/Login';

describe('se as informações de login estão na tela', () => {
  const email = 'email-input';
  const password = 'password-input';
  const submitButton = 'login-submit-btn';

  it('puxa informações por test-id', () => {
    render(<Login />);
    expect(screen.getByTestId(email)).toBeInTheDocument();
    expect(screen.getByTestId(password)).toBeInTheDocument();
    expect(screen.getByTestId(submitButton)).toBeInTheDocument();
  });

  it('se o botão funciona', () => {
    render(<Login />);
    const emailCheck = screen.getByTestId(email);
    const passwordCheck = screen.getByTestId(password);
    const button = screen.getByTestId(submitButton);

    userEvent.type(emailCheck, 'ajsidaoidj');
    userEvent.type(passwordCheck, 'aaa');
    expect(button).toHaveProperty('disabled', true);

    userEvent.type(emailCheck, 'aaaa@aaaa.aa');
    userEvent.type(passwordCheck, 'aaaaaa');
    expect(button).toHaveProperty('disabled', false);
  });

  it('se vai pra rota correta', () => {
    const { history } = renderWithRouter(<Login />);
    const emailCheck = screen.getByTestId(email);
    const passwordCheck = screen.getByTestId(password);
    const button = screen.getByTestId(submitButton);

    userEvent.type(emailCheck, 'aaaa@aaaa.aa');
    userEvent.type(passwordCheck, 'aaaaaaa');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
