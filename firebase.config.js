// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfiELNgCsUhC9mOeFG3peQhBbp5HFvQH8",
  authDomain: "rootine-373e0.firebaseapp.com",
  projectId: "rootine-373e0",
  storageBucket: "rootine-373e0.firebasestorage.app",
  messagingSenderId: "808976052173",
  appId: "1:808976052173:web:70e98f872d3d0f04f55e84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
