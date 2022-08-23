import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { AppContext } from './context/AppContext';
import Login from './components/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import { RecipesProvider } from './context/RecipesContext';
import FoodDetail from './pages/FoodDetail';
import DrinkDetail from './pages/DrinkDetail';

function App() {
  // const { categories } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/foods/:id" component={ FoodDetail } />
        <Route path="/drinks/:id" component={ DrinkDetail } />
        <RecipesProvider>
          <Route path="/foods" exact component={ Foods } />
          <Route path="/drinks" exact component={ Drinks } />
        </RecipesProvider>
        <Route path="/profile" exact component={ Profile } />
        <Route path="/done-recipes" exact component={ DoneRecipes } />
        <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
