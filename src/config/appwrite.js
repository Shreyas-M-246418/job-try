import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('675a849c002df03af2d5'); // Your project ID

export const account = new Account(client);

export const githubLogin = async () => {
  try {
    // Replace 'localhost' with your actual deployment URL for callback
    await account.createOAuth2Session(
      'github', 
      `https://shreyas-m-246418.github.io/job-try/#/jobs`, 
      `https://shreyas-m-246418.github.io/job-try/#/login`
    );
  } catch (error) {
    console.error('GitHub Login Error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};