import React from 'react';
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
});
