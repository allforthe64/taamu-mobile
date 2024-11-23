import { Stack } from "expo-router";

import firebase from '@react-native-firebase/app';
import appCheck from '@react-native-firebase/app-check';
import { Platform } from 'react-native';
import { useEffect } from 'react';

export default function Layout() {

    /*   try { */
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
            alert('initialize app check')
            appCheck().activate(
            null, // Play Integrity doesn't require a key
            true  // Auto-refresh is enabled
            );
        } else if (Platform.OS === 'ios') {
            appCheck().activate(
            null, // DeviceCheck doesn't require a key
            true  // Auto-refresh is enabled
            );
        }

      useEffect(() => {
        const verifyAppCheckToken = async () => {
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
      }, [])

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
    )
}