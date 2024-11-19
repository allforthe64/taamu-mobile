import { View, Text } from 'react-native'
import React from 'react'
import {useLocalSearchParams} from 'expo-router'

const RacerPage = () => {

    const {id} = useLocalSearchParams()

  return (
    <View>
      <Text>RacerPage {id}</Text>
    </View>
  )
}

export default RacerPage