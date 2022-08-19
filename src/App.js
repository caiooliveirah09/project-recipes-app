import React, { useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContext } from './context/AppContext';

function App() {
  const { categories } = useContext(AppContext);
  console.log(categories);
  return (
    // <AppProvider>
    <div>
      {categories && categories.map((category, key) => (
        <p key={ key }>{category}</p>
      ))}
    </div>
    // </AppProvider>
  );
}

export default App;
