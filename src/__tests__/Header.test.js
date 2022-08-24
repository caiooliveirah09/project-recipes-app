import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouter from '../utils/renderWithRouter';

describe('Teste do "Header"', () => {
  it('Se os elementos estão sendo renderizados', () => {
    renderWithRouter(<Header />);

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('Se os elementos estão sendo renderizados', () => {
    renderWithRouter(<Header />);

    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('search-top-btn'));
    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
  });

  it('Se btn redireciona para profile', () => {
    const { history } = renderWithRouter(<Header />);

    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toEqual('/profile');
  });
});
