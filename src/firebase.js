// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth}  from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT6W69XVG2MBNH9in6SeZFgc-BkjhbaEE",
  authDomain: "your-olympus.firebaseapp.com",
  projectId: "your-olympus",
  storageBucket: "your-olympus.appspot.com",
  messagingSenderId: "592718533929",
  appId: "1:592718533929:web:de02272d2b78ab71ac5338",
  measurementId: "G-WF91MY0E1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);