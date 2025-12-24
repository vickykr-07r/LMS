// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 
  authDomain: "learning-management-syst-7d2fc.firebaseapp.com",
  projectId: "learning-management-syst-7d2fc",
  storageBucket: "learning-management-syst-7d2fc.firebasestorage.app",
  messagingSenderId: "335085467508",
  appId: "1:335085467508:web:db33460124bacec04e9e21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider= new GoogleAuthProvider()