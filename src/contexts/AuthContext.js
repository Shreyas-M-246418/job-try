import React, { createContext, useContext, useState } from 'react';
import { account } from '../config/appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const response = await account.createOAuth2Session('https://shreyas-m-246418.github.io/job-try/#/jobs');
      setUser(response);
      window.location.href = '/jobs';
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 