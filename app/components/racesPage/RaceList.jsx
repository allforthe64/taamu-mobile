import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import RaceCard from './RaceCard'

const RaceList = ({races, currentUser, racePageFilter}) => {

  return (
    <>
      {races.map((race, i) => {
        return <RaceCard key={i} raceData={race} filter={null} currentUser={currentUser} racePageFilter={racePageFilter}/>
      })}
    </>
  )
}

export default RaceList