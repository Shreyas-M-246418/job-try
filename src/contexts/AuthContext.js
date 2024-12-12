import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../config/appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      await account.createOAuth2Session(
        'github',
        'https://shreyas-m-246418.github.io/job-try/#/jobs',
        'https://shreyas-m-246418.github.io/job-try/#/login'
      );
    } catch (error) {
      console.error("OAuth Login Error:", error);
      throw error;
    }
  };

  const checkUserStatus = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      if (error.response.status === 401) {
        // Handle expired session
        console.error("Session expired. Logging out...");
        await logout();
      } else {
        console.error("Error checking user status:", error);
      }
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      return true;
    } catch (error) {
      console.error("Logout Error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkUserStatus }}>
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


