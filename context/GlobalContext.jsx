import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  SecureStore.getItemAsync('access_token').then(data => {
    if (data) setAuthenticated(true);
  });

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        user,
        setAuthenticated,
        setUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
