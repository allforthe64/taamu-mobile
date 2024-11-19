import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const RacerPage = () => {

    const {racer} = useLocalSearchParams()

  return (
    <View>
      <Text>RacerPage {racer}</Text>
    </View>
  )
}

export default RacerPage