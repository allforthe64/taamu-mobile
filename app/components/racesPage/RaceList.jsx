import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RaceCard from './RaceCard'

const RaceList = ({races}) => {

  return (
    <View style={styles.mainContainer}>
      {races.map((race, i) => {
        return <RaceCard key={i} raceData={race}/>
      })}
    </View>
  )
}

export default RaceList

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})