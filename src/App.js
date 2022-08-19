import React, { useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContext } from './context/AppContext';
import Login from './components/Login';

function App() {
  const { categories } = useContext(AppContext);

  return (
    <div>
      <Login />
      {categories && categories.map((category, key) => (
        <p key={ key }>{category}</p>

      ))}
    </div>
  );
}

export default App;
