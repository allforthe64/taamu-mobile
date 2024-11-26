import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AuthComponent = () => {
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.bgImage} source={require('../../../../assets/wave_breaking.jpg')}/>
      <View style={styles.innerContainer}>
        <View style={styles.mainWindow}>

        </View>
      </View>
    </View>
  )
}

export default AuthComponent

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    bgImage: {
        objectFit: 'contain',
        width: '100%',
        height: '100%'
    },
    innerContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%'
    },
    mainWindow: {
        backgroundColor: '#01354B',
        width: '90%',
        height: '90%',
        borderRadius: 10,
        
    }
})