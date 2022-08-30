import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';

const FILTERBYDRINKBTN = 'filter-by-drink-btn';
const HORIZONTALNAME1 = '1-horizontal-name';
const HORIZONTALNAME0 = '0-horizontal-name';

const favoriteRecipes = [
  {
    id: '52977',
    type: 'food',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
];

const originalClipboard = { ...global.navigator.clipboard };

describe('test the Favorite Recipes page', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
    global.navigator.clipboard = originalClipboard;
  });
  test('1 - checks if it has the basic structure and filled in', () => {
    renderWithRouterAndContext(<FavoriteRecipes />);

    const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
    expect(filterByAllBtn).toBeInTheDocument();

    const filterByFoodBtn = screen.getByTestId('filter-by-food-btn');
    expect(filterByFoodBtn).toBeInTheDocument();

    const filterByDrinkBtn = screen.getByTestId(FILTERBYDRINKBTN);
    expect(filterByDrinkBtn).toBeInTheDocument();

    const horizontalImage0 = screen.getByTestId('0-horizontal-image');
    expect(horizontalImage0).toBeInTheDocument();
    expect(horizontalImage0).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');

    const horizontalTopText0 = screen.getByTestId('0-horizontal-top-text');
    expect(horizontalTopText0).toBeInTheDocument();

    const horizontalName0 = screen.getByTestId(HORIZONTALNAME0);
    expect(horizontalName0).toBeInTheDocument();
    expect(horizontalName0).toHaveTextContent('Corba');

    const horizontalShareBtn0 = screen.getByTestId('0-horizontal-share-btn');
    expect(horizontalShareBtn0).toBeInTheDocument();

    const horizontalFavoriteBtn0 = screen.getByTestId('0-horizontal-favorite-btn');
    expect(horizontalFavoriteBtn0).toBeInTheDocument();

    const horizontalImage1 = screen.getByTestId('1-horizontal-image');
    expect(horizontalImage1).toBeInTheDocument();
    expect(horizontalImage1).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');

    const horizontalTopText1 = screen.getByTestId('1-horizontal-top-text');
    expect(horizontalTopText1).toBeInTheDocument();

    const horizontalName1 = screen.getByTestId(HORIZONTALNAME1);
    expect(horizontalName1).toBeInTheDocument();
    expect(horizontalName1).toHaveTextContent('GG');

    const horizontalShareBtn1 = screen.getByTestId('1-horizontal-share-btn');
    expect(horizontalShareBtn1).toBeInTheDocument();

    const horizontalFavoriteBtn1 = screen.getByTestId('1-horizontal-favorite-btn');
    expect(horizontalFavoriteBtn1).toBeInTheDocument();
  });
  test('2 - check the all, food and drinks filters', () => {
    renderWithRouterAndContext(<FavoriteRecipes />);

    const horizontalName0 = screen.getByTestId(HORIZONTALNAME0);
    expect(horizontalName0).toBeInTheDocument();
    expect(horizontalName0).toHaveTextContent('Corba');

    const horizontalName1 = screen.getByTestId(HORIZONTALNAME1);
    expect(horizontalName1).toBeInTheDocument();
    expect(horizontalName1).toHaveTextContent('GG');

    const filterByFoodBtn = screen.getByTestId('filter-by-food-btn');
    userEvent.click(filterByFoodBtn);
    expect(horizontalName0).toBeInTheDocument();
    expect(horizontalName0).toHaveTextContent('Corba');

    expect(horizontalName1).not.toBeInTheDocument();

    const filterByDrinkBtn = screen.getByTestId(FILTERBYDRINKBTN);
    userEvent.click(filterByDrinkBtn);
    expect(horizontalName0).toBeInTheDocument();
    expect(horizontalName0).toHaveTextContent('GG');
    expect(horizontalName1).not.toBeInTheDocument();

    const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterByAllBtn);

    expect(horizontalName0).toBeInTheDocument();
    expect(horizontalName0).toHaveTextContent('Corba');
    expect(horizontalName1).toHaveTextContent('GG');
  });
  test('3 - test if copy the link to share', async () => {
    renderWithRouterAndContext(<FavoriteRecipes />);

    const horizontalShareBtn0 = screen.getByTestId('0-horizontal-share-btn');
    expect(horizontalShareBtn0).toBeInTheDocument();

    userEvent.click(horizontalShareBtn0);
    const shared = screen.getByText('Link copied!');
    expect(shared).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
  });
  test('4 - test if you unfavorite any recipe', () => {
    renderWithRouterAndContext(<FavoriteRecipes />);

    const horizontalName1 = screen.getByTestId(HORIZONTALNAME1);
    expect(horizontalName1).toBeInTheDocument();
    expect(horizontalName1).toHaveTextContent('GG');

    const horizontalFavoriteBtn1 = screen.getByTestId('1-horizontal-favorite-btn');
    expect(horizontalFavoriteBtn1).toBeInTheDocument();

    userEvent.click(horizontalFavoriteBtn1);
    expect(horizontalName1).not.toBeInTheDocument();
  });
  test('5 - tests if a recipe is unfavorable by filtering only drinks', () => {
    renderWithRouterAndContext(<FavoriteRecipes />);

    const filterByDrinkBtn = screen.getByTestId(FILTERBYDRINKBTN);
    expect(filterByDrinkBtn).toBeInTheDocument();

    userEvent.click(filterByDrinkBtn);

    const horizontalName0 = screen.getByTestId(HORIZONTALNAME0);
    expect(horizontalName0).toBeInTheDocument();
    expect(horizontalName0).toHaveTextContent('GG');

    const horizontalFavoriteBtn0 = screen.getByTestId('0-horizontal-favorite-btn');
    expect(horizontalFavoriteBtn0).toBeInTheDocument();

    userEvent.click(horizontalFavoriteBtn0);
    expect(horizontalName0).not.toBeInTheDocument();
  });
});
