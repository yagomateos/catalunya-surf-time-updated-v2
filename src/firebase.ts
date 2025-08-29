import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);