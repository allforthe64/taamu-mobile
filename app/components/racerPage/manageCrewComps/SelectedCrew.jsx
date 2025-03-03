import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

//component imports
import GenCrewData from './crewCardComponents/GenCrewData'

const SelectedCrew = ({selectedCrew}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.crewName}>Crew name: <Text style={[styles.crewName, {color: '#09CAC7'}]}>{selectedCrew.crewName}</Text></Text>
      <GenCrewData craftType={selectedCrew.craftType} ageCategory={selectedCrew.ageCategory} gender={selectedCrew.gender} maxCrewMembers={selectedCrew.maxCrewMembers}/>
    </View>
  )
}

export default SelectedCrew

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: 25
    },
    crewName: {
        fontSize: 28,
        color: 'white',
        fontWeight: '600'
    }
})