// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTu0hZIDXq9g9iEaDBJiUrZWkKhxhezoo",
  authDomain: "pakendra-c4665.firebaseapp.com",
  projectId: "pakendra-c4665",
  storageBucket: "pakendra-c4665.appspot.com",
  messagingSenderId: "715304842635",
  appId: "1:715304842635:web:8e05d962b5abea03472b8e",
  measurementId: "G-9T8FEMS4EB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth()
export const db= getFirestore(app)
export const imagedb= getStorage(app)

export {auth,analytics}