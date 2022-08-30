import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import RecipeDetail from '../components/RecipeDetail';
import renderWithRouterAndContext from '../utils/helpers/renderWithRouterAndContext';
// import Foods from '../pages/Foods';
import App from '../App';

const email = 'email-input';
const password = 'password-input';
const login = 'login-submit-btn';

const originalClipboard = { ...global.navigator.clipboard };

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

describe('test the Drinks In Pogress component', () => {
  beforeEach(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(favoriteRecipes));
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
    jest.clearAllMocks();
    global.navigator.clipboard = originalClipboard;
  });
  test('1 - tests the entire recipe detail page', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    expect(history.location.pathname).toBe('/');
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginSubmitBtn = screen.getByTestId(login);
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginSubmitBtn);
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
    const drinks = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(drinks);
    const GG = await screen.findByText('GG');
    userEvent.click(GG);
    const heading = await screen.findByRole('heading', { name: /optional alcohol/i });
    expect(heading).toBeInTheDocument();
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();
    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    const shared = await screen.findByText('Link copied!');
    expect(shared).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/drinks/15997');
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    const ingredient0 = screen.getAllByRole('listitem')[0];
    expect(ingredient0).toBeInTheDocument();
    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    const Corbaimg = await screen.findByRole('img', { name: /corba/i });
    expect(Corbaimg).toBeInTheDocument();
    const Corba = await screen.findByText('Corba');
    expect(Corba).toBeInTheDocument();
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
  });
});
