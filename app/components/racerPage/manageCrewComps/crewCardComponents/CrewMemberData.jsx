import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

//import updateCrew function
import { updateCrew } from '../../../../firebase/firestore'

const CrewMemberData = ({crewMembers, crewMember, selectedCrew}) => {

  const removeCrewMember = async (member) => {
    const newMembersData = crewMembers.filter(existingMember => existingMember.email !== member.email)
    const newCrewData = {
        ...selectedCrew,
        crewMembers: newMembersData
    }
    await updateCrew(newCrewData)
}

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.dataRow}>First name: <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.fName}</Text></Text>
      <Text style={[styles.dataRow, { marginTop: 10 }]}>Last name: <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.lName}</Text></Text>
      <Text style={[styles.dataRow, { marginTop: 10 }]}>Age category: <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.ageCategory}</Text></Text>
      <Text style={[styles.dataRow, { marginTop: 10 }]}>Gender: <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.gender}</Text></Text>
      <Text style={[styles.dataRow, { marginTop: 10 }]}>Email: </Text>
      <Text style={[styles.dataRow, {color: 'white', marginTop: 10}]}>{crewMember.email}</Text>
      <Text style={[styles.dataRow, { marginTop: 10 }]}>Phone: <Text style={[styles.dataRow, {color: 'white'}]}>{crewMember.phone}</Text></Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => removeCrewMember(crewMember)}>
          <Text style={styles.buttonText}>Remove crew member</Text>
        </TouchableOpacity>
      </View>
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
    },
    buttonContainer: {
      marginTop: 15
    },
    button: {
      backgroundColor: '#09CAC7',
      paddingTop: 4,
      paddingLeft: 8,
      paddingBottom: 4,
      paddingRight: 8,
      borderRadius: 100,
      marginTop: 15,
      width: '80%'
  },
  buttonText: {
      color: 'white',
      fontSize: 12,
      width: '100%',
      textAlign: 'center',
      fontWeight: '600'
  }
})