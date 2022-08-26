import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

describe('test Header component', () => {
  test('1 - checks if it has the basic structure using the /foods route', () => {
    const { history } = renderWithRouterAndContext(<Header />, '/foods');
    expect(history.location.pathname).toBe('/foods');
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Foods');
    const button0 = screen.getAllByRole('button')[0];
    expect(button0).toBeInTheDocument();
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
    const button1 = screen.getAllByRole('button')[1];
    expect(button1).toBeInTheDocument();
    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
  });
  test('2 - test if the button leads to /profile', () => {
    const { history } = renderWithRouterAndContext(<Header />);
    expect(history.location.pathname).toBe('/');
    const button0 = screen.getAllByRole('button')[0];
    expect(button0).toBeInTheDocument();
    userEvent.click(button0);
    expect(history.location.pathname).toBe('/profile');
  });
  test('3 - tests if the button activates the search input', () => {
    const { history } = renderWithRouterAndContext(<Header />);
    expect(history.location.pathname).toBe('/');
    const button1 = screen.getAllByRole('button')[1];
    expect(button1).toBeInTheDocument();
    userEvent.click(button1);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
