import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          const userData = {
            email: currentUser.email,
            displayName: currentUser.name,
            uid: currentUser.$id
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          setUser(null);
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        setUser(null);
        localStorage.removeItem('user');
      }
    };

    checkUser();
  }, []);

  const login = async () => {
    try {
      await authService.loginWithGitHub();
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        const userData = {
          email: currentUser.email,
          displayName: currentUser.name,
          uid: currentUser.$id
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      return true;
    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error("Logout Error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout: handleLogout }}>
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