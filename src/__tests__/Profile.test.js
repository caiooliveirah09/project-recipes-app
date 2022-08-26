import React from 'react';
import { screen } from '@testing-library/react';
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
  test('1 - tests if it has the initial structures and gets the email', () => {
    const { history } = renderWithRouterAndContext(<Profile />, '/profile');
    expect(history.location.pathname).toBe('/profile');
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent('{"email":"test@test"}');
    // const error = screen.getByText('error');
  });
});
