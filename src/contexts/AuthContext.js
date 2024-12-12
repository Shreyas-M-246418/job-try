import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../config/appwrite';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      await account.createOAuth2Session(
        'github', 
        'https://shreyas-m-246418.github.io/job-try/#/jobs',  // Success URL
        'https://shreyas-m-246418.github.io/job-try/#/login'  // Failure URL
      );
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const checkUserStatus = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
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
      console.error("Error during logout:", error);
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