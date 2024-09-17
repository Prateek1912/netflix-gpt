// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy3ZaAeD7QhFU44JVFM_OUwRldJu9sLP0",
  authDomain: "netflixgpt-59df2.firebaseapp.com",
  projectId: "netflixgpt-59df2",
  storageBucket: "netflixgpt-59df2.appspot.com",
  messagingSenderId: "851956873771",
  appId: "1:851956873771:web:c687fa95916137e961886e",
  measurementId: "G-8D37WLJ5E7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();