import { account } from '../config/appwrite';

const authService = {
  async loginWithGitHub() {
    try {
      await account.createOAuth2Session(
        'github',
        `${window.location.origin}/jobs`,
        `${window.location.origin}/login`
      );
    } catch (error) {
      console.error('GitHub Login Error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout Error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
};

export default authService;