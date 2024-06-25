import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAESewP0KZCHAJjmSEWL7m9xsXHpJ5xe2Y",
  authDomain: "nestgoods-4bb2c.firebaseapp.com",
  projectId: "nestgoods-4bb2c",
  storageBucket: "nestgoods-4bb2c.appspot.com",
  messagingSenderId: "902450566250",
  appId: "1:902450566250:web:94019da4e4a72438ece613"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
export const db = getFirestore(app)
export const imagedb= getStorage(app)
export {app,auth}