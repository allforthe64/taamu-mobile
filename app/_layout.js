import { Stack } from "expo-router";

import firebase from '@react-native-firebase/app';
import appCheck from '@react-native-firebase/app-check';
import { Platform } from 'react-native';
import { useEffect } from 'react';

//import and initialize react-native-exception-handler(s) and Sentry packages
import { setNativeExceptionHandler, setJSExceptionHandler } from 'react-native-exception-handler';
import * as Sentry from '@sentry/react-native';


Sentry.init({
  dsn: 'https://78cc57d36d498aebafe0ee5f0448b6e8@o4507346968772608.ingest.us.sentry.io/4508355887759360',
});


//set a handler to take care of all native errors
setNativeExceptionHandler((errorString) => {
  Sentry.captureException(new Error(errorString))
});


//set a handler to take care of all JS errors
setJSExceptionHandler((error, isFatal) => {
  const sentryId = Sentry.captureException(new Error(error.name));
})

export default function Layout() {

   try {
    firebase.initializeApp({
        apiKey: "AIzaSyCjBjNmMQHRe1d3KYJZNJEWNbOe0exfypY",
        authDomain: "areregsoft.firebaseapp.com",
        projectId: "areregsoft",
        storageBucket: "areregsoft.appspot.com",
        messagingSenderId: "793492515603",
        appId: "1:793492515603:web:c48d44811cc4b603fb88e6",
        measurementId: "G-TMZ8L24SND"
      });
      
        // Activate Firebase App Check
        if (Platform.OS === 'android') {
            try {
                alert('initialize app check')
                appCheck().activate(
                null, // Play Integrity doesn't require a key
                true  // Auto-refresh is enabled
                );
            } catch (err) {
                alert('error in app check initialization: ', err)
            }
        } else if (Platform.OS === 'ios') {
            appCheck().activate(
            null, // DeviceCheck doesn't require a key
            true  // Auto-refresh is enabled
            );
        }

        const verifyAppCheckToken = async () => {
            alert('running app check verification')
          try {
            // Request the App Check token
            const tokenResult = await appCheck().getToken();
            const token = tokenResult?.token;
      
            if (token) {
              console.log('App Check Token:', token); // Logs the token to the console
              alert('App Check Token', token); // Displays the token in an alert for testing
            } else {
              console.warn('No App Check Token received.');
              alert('Error', 'No App Check Token received.');
            }
          } catch (error) {
            alert('Error', error.message || 'Failed to get App Check token.');
          }
        };
        verifyAppCheckToken()
    } catch (err) {
        alert(err)
    }

    return (

        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
    )
}