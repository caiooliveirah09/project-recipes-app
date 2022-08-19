import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div>
        App de Receitas
      </div>
    </AppProvider>
  );
}

export default App;
