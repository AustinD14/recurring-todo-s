
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAmwfWwkO255tN55ZTWT0YjmFs9z33YKXw",
  authDomain: "recurring-todo-s.firebaseapp.com",
  projectId: "recurring-todo-s",
  storageBucket: "recurring-todo-s.appspot.com",
  messagingSenderId: "1036767049687",
  appId: "1:1036767049687:web:f79fe4fac0b2e07362fd92",
  measurementId: "G-QNFQHR6S9F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()
 