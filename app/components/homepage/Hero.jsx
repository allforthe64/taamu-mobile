import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, {useEffect} from 'react'

export default function Hero() {

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