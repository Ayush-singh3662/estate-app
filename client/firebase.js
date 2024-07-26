// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-a6252.firebaseapp.com",
  projectId: "estate-a6252",
  storageBucket: "estate-a6252.appspot.com",
  messagingSenderId: "989197407251",
  appId: "1:989197407251:web:def3619a155bf944155be6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);