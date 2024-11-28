import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, {useEffect} from 'react'

import { getAppCheck } from "firebase/app-check";

export default function Hero() {

  useEffect(() => {
    const getAppCheckToken = async () => {
      try {
        // Get the App Check instance
        const appCheck = getAppCheck();
    
        // Retrieve the current App Check token
        const tokenResult = await appCheck.getToken();
    
        // Log or use the token
        console.log("App Check Token:", tokenResult.token);
        return tokenResult.token;
      } catch (error) {
        console.error("Failed to get App Check token:", error);
        return null;
      }
    };
    
    // Example usage
    getAppCheckToken().then((token) => {
      if (token) {
        console.log("App Check token retrieved successfully:", token);
      } else {
        console.log("Failed to retrieve App Check token.");
      }
    });
  }, [])

    //get device height to be used in setting container dimension
    const ScreenHeight = Dimensions.get("window").height

    //initialize styleSheet
    const styles = StyleSheet.create({
        mainContainer: {
            width: '100%',
            height: ScreenHeight,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        mainHeading: {
            textShadowColor: '#09CAC7',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 10,
            color: 'white',
            fontWeight: '600',
            fontSize: 50
        },
        taglineContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 10
        },
        taglineWhiteText: {
            color: 'white',
            fontSize: 25
        },
        taglineTealText: {
            color: '#09CAC7',
            fontSize: 25
        }
    })

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeading}>Tuaro Life</Text>
      <View style={styles.taglineContainer}>
        <Text style={styles.taglineWhiteText}>Create. Register.</Text>
        <Text style={styles.taglineTealText}> Race</Text>
      </View>
    </View>
  )
}