import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

describe('test the Footer component', () => {
  test('1 - IN CONSTRUCTION', () => {
    renderWithRouterAndContext(<Footer />);
    const initialText = screen.getByText('Footer');
    expect(initialText).toBeInTheDocument();
    // const error = screen.getByText('error');
  });
});
