import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CrewMemberData = ({crewMember}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.dataRow}>First name: <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.fName}</Text></Text>
      <Text style={styles.dataRow}>Last name: <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.lName}</Text></Text>
      <Text style={styles.dataRow}>Age category: <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.ageCategory}</Text></Text>
      <Text style={styles.dataRow}>Gender: <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.gender}</Text></Text>
      <Text style={styles.dataRow}>Email: </Text>
      <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.email}</Text>
      <Text style={styles.dataRow}>Phone: <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.phone}</Text></Text>
    </View>
  )
}

export default CrewMemberData

const styles = StyleSheet.create({
    mainContainer: {
        width: '90%',
        marginTop: 20
    },
    dataRow: {
        fontSize: 18,
        fontWeight: '600',
        color: '#09CAC7'
    }
})