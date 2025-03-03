import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const GenCrewData = ({craftType, ageCategory, gender, maxCrewMembers}) => {
  return (
    <View style={{width: '100%', marginTop: 15}}>
      <Text style={styles.dataRow}>Craft type: <Text style={[styles.dataRow, {color: '#09CAC7'}]}>{craftType}</Text></Text>
      <Text style={styles.dataRow}>Age category: <Text style={[styles.dataRow, {color: '#09CAC7'}]}>{ageCategory}</Text></Text>
      <Text style={styles.dataRow}>Crew gender: <Text style={[styles.dataRow, {color: '#09CAC7'}]}>{gender}</Text></Text>
      <Text style={styles.dataRow}>Max crew members: <Text style={[styles.dataRow, {color: '#09CAC7'}]}>{maxCrewMembers}</Text></Text>
    </View>
  )
}

export default GenCrewData

const styles = StyleSheet.create({
    dataRow: {
        marginTop: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: '500'
    }
})