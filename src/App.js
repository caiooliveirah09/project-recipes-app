import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { AppContext } from './context/AppContext';
import Login from './components/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  // const { categories } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/foods" exact component={ Foods } />
        <Route path="/drinks" exact component={ Drinks } />
        <Route path="/profile" exact component={ Profile } />
        <Route path="/done-recipes" exact component={ DoneRecipes } />
        <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
