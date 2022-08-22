import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { AppContext } from './context/AppContext';
import Login from './components/Login';

function App() {
  // const { categories } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Route path="/" component={ Login } />
    </BrowserRouter>
  );
}

export default App;
