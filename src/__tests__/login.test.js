import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/Login';

describe('Login Page', () => {
  it('se aparece na tela o input de login', () => {
    render(<Login />);
    const input = screen.getByTestId('email-input');
    expect(input).toBeInTheDocument();
  });
  it('se aparece na tela o input de senha', () => {
    render(<Login />);
    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
  });
  it('se aparece na tela o botão de submit', () => {
    render(<Login />);
    const login = screen.getByTestId('login-submit-btn');
    expect(login).toBeInTheDocument();
  });
});
