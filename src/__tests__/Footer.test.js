import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Footer from '../components/Footer';

describe('Teste do "Footer"', () => {
  it('Se os elementos estão sendo renderizados', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Se ao clicar no botão foods redireciona para as rotas ', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkButton);
    expect(history.location.pathname).toEqual('/drinks');

    const foodButton = screen.getByTestId('food-bottom-btn');
    userEvent.click(foodButton);
    expect(history.location.pathname).toEqual('/foods');
  });
});
