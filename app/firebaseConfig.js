import { initializeApp } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app'
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, CustomProvider, getToken } from 'firebase/app-check';
import { Platform } from 'react-native';

//configure firebase
const firebaseConfig = {
    apiKey: "AIzaSyCjBjNmMQHRe1d3KYJZNJEWNbOe0exfypY",
    authDomain: "areregsoft.firebaseapp.com",
    projectId: "areregsoft",
    storageBucket: "areregsoft.appspot.com",
    messagingSenderId: "793492515603",
    appId: Platform.OS = 'android' ? '1:793492515603:android:f62d3080aa6d59b5fb88e6' : '1:793492515603:android:f62d3080aa6d59b5fb88e6',
    measurementId: "G-TMZ8L24SND"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Generate your custom token
const generateCustomToken = async () => {
  const response = await fetch('https://www.tuarolife.com/api/tm-dblink', {
    method: 'POST',
    body: JSON.stringify({ appId: Platform.OS = 'android' ? '1:793492515603:android:f62d3080aa6d59b5fb88e6' : '1:793492515603:android:f62d3080aa6d59b5fb88e6' }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  if (data.appCheckToken) {
    return data.appCheckToken.token;
  } else {
    throw new Error("Token not received from backend");
  }
};

// Initialize App Check with the custom provider
const appCheck = initializeAppCheck(app, {
  provider: new CustomProvider({
    getToken: async () => {
      const token = await generateCustomToken();
      return {
        token,
        expireTimeMillis: Date.now() + 60 * 60 * 1000, // 1 hour expiration
      };
    },
  }),
  isTokenAutoRefreshEnabled: true, // Enable auto-refresh of tokens
});

export const db = getFirestore(app)

export { firebase, appCheck }