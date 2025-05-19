import React, { createContext, useContext, useEffect, useState } from 'react';
import { tokenIsValid } from '../utils/JwtUtility';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthenticated(tokenIsValid());
      setIsAuthInitialized(true);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAuthInitialized, setIsAuthenticated, setIsAuthInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);