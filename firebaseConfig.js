// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjBjNmMQHRe1d3KYJZNJEWNbOe0exfypY",
  authDomain: "areregsoft.firebaseapp.com",
  projectId: "areregsoft",
  storageBucket: "areregsoft.appspot.com",
  messagingSenderId: "793492515603",
  appId: "1:793492515603:web:c48d44811cc4b603fb88e6",
  measurementId: "G-TMZ8L24SND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const db = getFirestore(app)
export const storage = getStorage(app)