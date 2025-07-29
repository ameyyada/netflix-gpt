// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4qA5vX6nV2yXQwl3pT_SqSYXXSy7ERBI",
  authDomain: "netflixgpt-8f749.firebaseapp.com",
  projectId: "netflixgpt-8f749",
  storageBucket: "netflixgpt-8f749.firebasestorage.app",
  messagingSenderId: "1001356588619",
  appId: "1:1001356588619:web:be179020929836975c3fce",
  measurementId: "G-0YM2K3V2PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


   export const auth = getAuth();