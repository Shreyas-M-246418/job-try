import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('675a849c002df03af2d5'); // Your project ID

const account = new Account(client);

export { client, account };