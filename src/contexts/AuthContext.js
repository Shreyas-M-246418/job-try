/*
import React, { createContext, useContext, useState } from 'react';
import { account } from '../config/appwriteConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user'); // Clear invalid data
      return null;
    }
  });

 /* const login = async () => {
    try {
      console.log("Attempting to log in...");
      const response = await account.createOAuth2Session('github', 'https://shreyas-m-246418.github.io/job-try/#/jobs', 'https://shreyas-m-246418.github.io/job-try/#/login');
      console.log("Login response:", response);
      
      if (!response) {
        throw new Error("Login response is undefined");
      }

      const userData = {
        email: response.email,
        displayName: response.name,
        photoURL: response.avatar,
        uid: response.$id
      };
      console.log("User data:", userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };*/
/*
  const login = async () => {
    try {
      console.log("Attempting to log in...");
      await account.createOAuth2Session('github','https://shreyas-m-246418.github.io/job-try/#/jobs','https://shreyas-m-246418.github.io/job-try/#/login');
      // After redirection, check the session
      const userSession = await account.get();
      console.log("User session:", userSession);
  
      const userData = {
        email: userSession.email,
        displayName: userSession.name,
        photoURL: userSession.avatar,
        uid: userSession.$id
      };
      console.log("User data:", userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
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
      localStorage.removeItem('user');
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
*/


import React, { createContext, useContext, useState } from 'react';
import { account } from '../config/appwriteConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user'); // Clear invalid data
      return null;
    }
  });

  const login = async () => {
    try {
      console.log("Attempting to log in...");
      await account.createOAuth2Session(
        'github',
        'https://shreyas-m-246418.github.io/job-try/#/jobs',
        'https://shreyas-m-246418.github.io/job-try/#/login'
      );
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const checkUserSession = async () => {
    try {
      const userSession = await account.get(); 
      const userData = {
        email: userSession.email,
        displayName: userSession.name,
        photoURL: userSession.avatar,
        uid: userSession.$id
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user session:", error);
      setUser(null); // Clear user state if not authenticated
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkUserSession }}>
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