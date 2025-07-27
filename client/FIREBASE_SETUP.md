# Firebase Setup Guide for thaalo

## Step 1: Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `thaalo-416ba`
3. Click on "Firestore Database" in the left sidebar
4. Click "Create Database"
5. Choose "Start in test mode" (we'll secure it later)
6. Select a location (choose closest to your users)
7. Click "Done"

## Step 2: Set Up Security Rules

1. In Firestore Database, click on "Rules" tab
2. Replace the default rules with the content from `firestore.rules`
3. Click "Publish"

## Step 3: Enable Authentication

1. Go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Enable "Google" provider
6. In "Settings" tab, add your domain to "Authorized domains":
   - For development: `localhost`
   - For production: your actual domain

## Step 4: Test the Setup

1. Start your development server: `npm run dev`
2. Visit: `http://localhost:3000/firebase-test`
3. Click "Run Firebase Tests" to verify everything works

## Step 5: Production Deployment

### For Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

### For other platforms:
1. Build the app: `npm run build`
2. Deploy the `.next` folder

## Common Issues & Solutions:

### "Firestore not initialized" error:
- Make sure Firestore Database is created in Firebase Console
- Check if security rules are published

### "Authentication failed" error:
- Verify Email/Password and Google providers are enabled
- Check if your domain is in authorized domains

### "Permission denied" error:
- Make sure security rules allow read/write for authenticated users
- Check if user is properly authenticated

### Network errors:
- Check your internet connection
- Verify Firebase project is in the correct region
- Ensure no firewall is blocking Firebase requests 