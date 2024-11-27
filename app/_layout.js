import { Stack } from "expo-router";

import { Platform } from 'react-native';
import { useEffect } from 'react';

import { initializeApp } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAppCheck } from 'firebase/app-check';

//configure firebase
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
const firebaseAuth = initializeAuth(app, {
persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Generate your custom token
const generateCustomToken = async () => {
const response = await fetch('http://localhost:3000/tm-dblink', {
  method: 'POST',
  body: JSON.stringify({ appId: 'areregsoft' }),
  headers: { 'Content-Type': 'application/json' },
});
const data = await response.json();
return data.appCheckToken;
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

console.log(appCheck)


export default function Layout() {

   /*  useEffect(() => {
        const testFetch = async () => {
          console.log('running')
          try {
            await fetch('http://localhost:3000/api/tm-dblink', {
              body: JSON.stringify({ target: "races" }),
              method: "POST"
            }).then((response) => 
              {
                console.log(response)
                return response.json()
              }).then((data) => console.log('data: ', data))
          } catch (err) {
            console.log(err)
          }
          
        }
        testFetch()
      }, []) */

    return (

        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
    )
}

export {app, firebaseAuth}