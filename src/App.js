import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div>
      {/* <Login /> */}
      <Recipes isFoodRecipes />
    </div>
  );
}

export default App;
