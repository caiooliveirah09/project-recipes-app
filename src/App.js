import React, { useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContext } from './context/AppContext';
import Login from './components/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div>
      {/* <Login /> */}
      oi
      <Recipes isFoodRecipes={ true } />
      oi
    </div>
  );
}

export default App;
