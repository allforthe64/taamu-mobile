import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import firebase from '@react-native-firebase/app';
import appCheck from '@react-native-firebase/app-check';
import { Platform } from 'react-native';
import { useEffect } from 'react';

export default function App() {

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
            Alert.alert('App Check Token', token); // Displays the token in an alert for testing
          } else {
            console.warn('No App Check Token received.');
            Alert.alert('Error', 'No App Check Token received.');
          }
        } catch (error) {
          console.error('Error retrieving App Check token:', error);
          Alert.alert('Error', error.message || 'Failed to get App Check token.');
        }
      };
      verifyAppCheckToken()
    }, [])
  } catch (err) {
    console.log('error with firebase: ', err)
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
