import { View, Text } from 'react-native'
import React from 'react'

//import useLocalSearchParams hook
import { useLocalSearchParams } from 'expo-router'

const RacePage = () => {

    const { raceId } = useLocalSearchParams()

  return (
    <View>
      <Text>{raceId}</Text>
    </View>
  )
}

export default RacePage