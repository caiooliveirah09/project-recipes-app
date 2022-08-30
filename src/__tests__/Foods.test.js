import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

const BEEF_CATEGORY_FILTER = 'Beef-category-filter';

describe('test the Food page', () => {
  test('1 - test if recipes and categories appear', async () => {
    renderWithRouterAndContext(<Foods />);
    const BeefCategoryFilter = await screen.findByTestId(BEEF_CATEGORY_FILTER);
    expect(BeefCategoryFilter).toBeInTheDocument();
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
  });
  test('2 - tests if filters by categories and removes filters', async () => {
    renderWithRouterAndContext(<Foods />);
    const BeefCategoryFilter = await screen.findByTestId(BEEF_CATEGORY_FILTER);
    expect(BeefCategoryFilter).toBeInTheDocument();
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
    userEvent.click(BeefCategoryFilter);
    const beefAndMustardPie = await screen.findByText('Beef and Mustard Pie');
    expect(beefAndMustardPie).toBeInTheDocument();
    userEvent.click(BeefCategoryFilter);
    expect(corba).toBeInTheDocument();
  });
});
