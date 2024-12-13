import { Client, Account } from 'appwrite';

/*const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1') 
      .setProject('675a849c002df03af2d5');*/

const client = new Client();
client.setProject('675bc7ba0009962686c7');
client.setEndpoint('https://cloud.appwrite.io/v1')


const account = new Account(client);

export { client, account }; 