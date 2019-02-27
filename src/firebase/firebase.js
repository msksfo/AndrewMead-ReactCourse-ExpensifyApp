// this is where i will connect to the firebase database
// then other files in the project can use the connection by importing what i have here

//* step 1. grab everything from firebase
import * as firebase from 'firebase';

//* step 2. get the config object
// this config object is basically, my password
// so i should make .env files in the project root, with this info, and add them to the .gitignore file
const config = {
    /* when i changed these from the actual values to the process.env variables, i had to also tweak a 
    bunch of stuff in package.json and webpack.config to make it work
    */

    // change all of these to match the environment from the webpack plugin
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

//* step 3. use the initializeApp method to initialize firebase to work with the application who's config i provided
firebase.initializeApp(config);

// break it out into a function for readability
const database = firebase.database();

//* when authenticating, we need to provide an instance of a provider (our provider is google, because we are authenticating with google)
// we will pass this provider into a firebase method (signInWithPopup), which lives in actions/auth.js
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// this line is optional
googleAuthProvider.setCustomParameters({
    prompt: 'select_account',
});

// do this when working with redux & firebase
export { firebase, googleAuthProvider, database as default };
