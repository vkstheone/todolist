// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ0YE6WbSPmKAyBQhT5x1mG0fBNZsw068",
  authDomain: "react-5b908.firebaseapp.com",
  projectId: "react-5b908",
  storageBucket: "react-5b908.firebasestorage.app",
  messagingSenderId: "950033304608",
  appId: "1:950033304608:web:6cdaf9241695b86508c045",
  measurementId: "G-N4QLK10S91"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const db = getFirestore(fireBaseApp)
const auth = getAuth(fireBaseApp)
//  const analytics = getAnalytics(app);

export{db, auth}