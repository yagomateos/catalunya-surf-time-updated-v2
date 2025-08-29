// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB7B8_5fa-Csiw_zBhQX5kyKXjXCoeofk",
  authDomain: "catalunyasurftime.firebaseapp.com",
  projectId: "catalunyasurftime",
  storageBucket: "catalunyasurftime.firebasestorage.app",
  messagingSenderId: "648308004952",
  appId: "1:648308004952:web:8e5fbbe6a42e6ee6b0522d",
  measurementId: "G-7M7SL1WD53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export auth instance
// const analytics = getAnalytics(app); // Analytics is not needed for auth, can be added later if required
