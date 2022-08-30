import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

const email = 'test@test';

describe('test the Profile page', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email }));
  });

  afterEach(() => {
    localStorage.clear();
  });
  test('1 - tests if it has the initial structures', () => {
    const { history } = renderWithRouterAndContext(<Profile />, '/profile');
    expect(history.location.pathname).toBe('/profile');

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent('{"email":"test@test"}');

    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(profileLogoutBtn);
    expect(localStorage.user).toBeUndefined();
  });
  test('2 - test if the user email appears', () => {
    renderWithRouterAndContext(<Profile />, '/profile');

    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent('{"email":"test@test"}');
  });
  test('3 - test if logging out clears localStorage', () => {
    renderWithRouterAndContext(<Profile />, '/profile');

    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(profileLogoutBtn);
    expect(localStorage.user).toBeUndefined();
  });
});
