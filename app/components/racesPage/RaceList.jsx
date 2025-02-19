import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import RaceCard from './RaceCard'

const RaceList = ({races, currentUser, racePageFilter}) => {

  //get device height to be used in setting container dimension
  const ScreenHeight = Dimensions.get("window").height
  const styles = StyleSheet.create({
    mainContainer: {
      width: '100%',
      height: ScreenHeight,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  })

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={{flex: 1}}>
        {races.map((race, i) => {
          return <RaceCard key={i} raceData={race} filter={null} currentUser={currentUser} racePageFilter={racePageFilter}/>
        })}
      </ScrollView>
    </View>
  )
}

export default RaceList