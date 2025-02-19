import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import RaceCard from './RaceCard'

const RaceList = ({races, currentUser, racePageFilter}) => {

  //get device height to be used in setting container dimension
  const ScreenHeight = Dimensions.get("window").height
  const ScreenWidth = Dimensions.get("window").width
  const styles = StyleSheet.create({
    mainContainer: {
      width: ScreenWidth,
      height: ScreenHeight,
    },
    scrollView: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  })

  return (
    <View style={styles.mainContainer}>
      {/* <ScrollView style={styles.scrollView}> */}
        {races.map((race, i) => {
          return <RaceCard key={i} raceData={race} filter={null} currentUser={currentUser} racePageFilter={racePageFilter}/>
        })}
      {/* </ScrollView> */}
    </View>
  )
}

export default RaceList