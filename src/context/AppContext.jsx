import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export function AppProvider({ children }) {
  return (
    <AppContext.Provider>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
