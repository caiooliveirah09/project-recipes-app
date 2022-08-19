import React, { useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContext } from './context/AppContext';

function App() {
  const { categories } = useContext(AppContext);

  return (
    <div>
      {categories.map((category, key) => (
        <p key={ key }>{category.strCategory}</p>
      ))}
    </div>
  );
}

export default App;
