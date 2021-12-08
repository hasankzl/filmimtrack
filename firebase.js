// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRqxA2wg7CmNK4pdiHt8bGxoaZJNkoZfs",
  authDomain: "filmtrack-a0b3e.firebaseapp.com",
  projectId: "filmtrack-a0b3e",
  storageBucket: "filmtrack-a0b3e.appspot.com",
  messagingSenderId: "33411331950",
  appId: "1:33411331950:web:5f5016aabcd5d6edc8b37f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
export { auth };
