// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1yH5HxZEU0_VjptKqczblVp4SPOTiqFQ", // replace with your actual config values
  authDomain: "project-25c99.firebaseapp.com",
  projectId: "project-25c99",
  storageBucket: "project-25c99.firebasestorage.app",
  messagingSenderId: "730517330494",
  appId: "1:730517330494:web:109e901329946bbe63cf6f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, RecaptchaVerifier, signInWithPhoneNumber };
