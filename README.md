# Job Hub- Job Listing Application

This project is a job listing application built with React and Firebase. It allows users to create, view, and filter job listings.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installing Dependencies](#installing-dependencies)
- [Setting Up Firebase](#setting-up-firebase)
- [Setting Up GitHub OAuth](#setting-up-github-oauth)
- [Environment Variables](#environment-variables)
- [Deploying to GitHub Pages](#deploying-to-github-pages)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (comes with Node.js)
- A Firebase account
- A GitHub account

## Installing Dependencies

Navigate to the project directory and Install the necessary dependencies:
    
    npm install


## Setting Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Add project" and follow the prompts to create a new Firebase project.
3. Once your project is created, navigate to the "Firestore Database" section and click "Create Database". Choose "Start in Test Mode" for development purposes.
4. In the "Project settings" (gear icon), go to the "General" tab and find your Firebase configuration. You will need the following details:
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID
5. Create a new collection named `jobs` in Firestore.

## Setting Up GitHub OAuth

1. Go to the [GitHub Developer Settings](https://github.com/settings/developers).
2. Click on "OAuth Apps" and then "New OAuth App".
3. Fill in the required fields:
   - **Application name**: Your app's name
   - **Homepage URL**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`
   - **Authorization callback URL**: `http://localhost:3000/auth/callback` *You will need to update the callback url after enabling Auth in Firebase*
4. After creating the app, you will receive a Client ID and Client Secret. You will need these for your Firebase authentication setup.
5. In the Firebase Console, navigate to "Authentication" and then "Sign-in method". Enable "GitHub" as a sign-in provider and enter the Client ID and Client Secret from your GitHub OAuth app.
6. Copy the authorisation callback URL provided there and update it in the Github OAuth app's callback field.

## Environment Variables

Create a `.env` file in the root of your project and add the following variables:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id


Replace the placeholders with the actual values from your Firebase project settings.

## Deploying to GitHub Pages

1. In your project directory, open the `package.json` file and add the following line to specify the homepage:

   ```
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME",
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

2. Create a GitHub repository if you haven't already.

3. Add the remote repository to your local project:

   ```
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

4. Commit your changes:

   ```
   git add .
   git commit -m "Set up GitHub Pages deployment"
   ```

5. Push your changes to the main branch:

   ```
   git push origin main
   ```

6. Create a GitHub Actions workflow for deployment. Create a file named `.github/workflows/deploy.yml` and add the following content:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         
         - name: Setup Node
           uses: actions/setup-node@v2
           with:
             node-version: '16'
             
         - name: Install Dependencies
           run: npm install
           
         - name: Build
           env:
             REACT_APP_FIREBASE_API_KEY: ${{ secrets.REACT_APP_FIREBASE_API_KEY }}
             REACT_APP_FIREBASE_AUTH_DOMAIN: ${{ secrets.REACT_APP_FIREBASE_AUTH_DOMAIN }}
             REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.REACT_APP_FIREBASE_PROJECT_ID }}
             REACT_APP_FIREBASE_STORAGE_BUCKET: ${{ secrets.REACT_APP_FIREBASE_STORAGE_BUCKET }}
             REACT_APP_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.REACT_APP_FIREBASE_MESSAGING_SENDER_ID }}
             REACT_APP_FIREBASE_APP_ID: ${{ secrets.REACT_APP_FIREBASE_APP_ID }}
           run: npm run build
           
         - name: Deploy
           uses: JamesIves/github-pages-deploy-action@4.1.5
           with:
             branch: gh-pages
             folder: build
   ```

7. Create GitHub Secrets for your Firebase configuration:
   - Go to your GitHub repository.
   - Click on "Settings" > "Secrets and variables" > "Actions".
   - Click on "New repository secret" and add the following secrets:
     - `REACT_APP_FIREBASE_API_KEY`
     - `REACT_APP_FIREBASE_AUTH_DOMAIN`
     - `REACT_APP_FIREBASE_PROJECT_ID`
     - `REACT_APP_FIREBASE_STORAGE_BUCKET`
     - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
     - `REACT_APP_FIREBASE_APP_ID`

8. Commit and push the `.github` folder to your repository:

   ```
   git add .github
   git commit -m "Add GitHub Actions workflow for deployment"
   git push origin main
   ```
9. To deploy the app run the command:
    npm run deploy

After the workflow runs successfully, your app will be deployed to GitHub Pages at the URL specified in the `homepage` field of your `package.json`.
