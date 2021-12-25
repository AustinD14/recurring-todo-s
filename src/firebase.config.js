// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmwfWwkO255tN55ZTWT0YjmFs9z33YKXw",
  authDomain: "recurring-todo-s.firebaseapp.com",
  projectId: "recurring-todo-s",
  storageBucket: "recurring-todo-s.appspot.com",
  messagingSenderId: "1036767049687",
  appId: "1:1036767049687:web:f79fe4fac0b2e07362fd92",
  measurementId: "G-QNFQHR6S9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();