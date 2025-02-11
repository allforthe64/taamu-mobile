import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

//react/react related hooks
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'

//firebase hook imports
import { getAllRaces } from '../firebase/firestore'

//component imports
import RacesMain from '../components/racesPage/RacesMain'

const races = () => {

  //initialize state
  const [races, setRaces] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //get race data
  useFocusEffect(useCallback(() => {
    setIsLoading(true)

    const getRacesData = async () => {
      const allRacesData = await getAllRaces()
      setRaces(allRacesData)
    }
    getRacesData() 
    setIsLoading(false)
  }, []))

  return (
    <>
      {isLoading ?
        <View style={styles.loadingContainer}>
          <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator color={'#09CAC7'}/>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      :
        <View style={styles.mainContainer}>
          <RacesMain races={races}/>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({

  //isLoading styles
  loadingContainer: {
      width: '100%',
      backgroundColor: 'white',
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
  },
  loadingIndicatorContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loadingText: {
    color: '#09CAC7',
    fontSize: 20,
    marginLeft: '5%'
  },

  //main races page styles
  mainContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#01354B'
  }
})

export default races