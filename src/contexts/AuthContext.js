import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../config/appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const login = async () => {
    try {
      // Create the OAuth2 session
      const session = await account.createOAuth2Session('github', 'https://shreyas-m-246418.github.io/job-try/#/jobs', 'https://shreyas-m-246418.github.io/job-try/#/login');
      setAccessToken(session.$id);
      await checkUserStatus();
    } catch (error) {
      console.error("OAuth Login Error:", error);
      throw error;
    }
  };

  const checkUserStatus = async () => {
    try {
      // Refresh the access token before getting the user account
      await account.updateSession(accessToken);
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
      setAccessToken(null);
      return null;
    }
  };

  useEffect(() => {
    if (accessToken) {
      checkUserStatus();
    }
  }, [accessToken]);

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      setAccessToken(null);
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