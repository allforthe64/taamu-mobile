import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

//component imports
import GenCrewData from './crewCardComponents/GenCrewData'
import CrewMemberData from './crewCardComponents/CrewMemberData'

const SelectedCrew = ({selectedCrew}) => {

    console.log('selected crew: ', selectedCrew)
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.crewName}>Crew name: <Text style={[styles.crewName, {color: '#09CAC7'}]}>{selectedCrew.crewName}</Text></Text>
      <GenCrewData craftType={selectedCrew.craftType} ageCategory={selectedCrew.ageCategory} gender={selectedCrew.gender} maxCrewMembers={selectedCrew.maxCrewMembers}/>
      <Text style={styles.crewMembers}>Crew members:</Text>
      <View style={styles.crewMemberContainer}>
        {selectedCrew.crewMembers.length > 0 ?
            <>
                {selectedCrew.crewMembers.map((crewMember, i) => {
                    return (
                        <CrewMemberData key={i} crewMember={crewMember}/>
                    )
                })}   
            </>
        :
            <Text style={{marginTop: 20, color: 'white', fontSize: 22, width: '100%', textAlign: 'center'}}>Crew is empty...</Text>
        }
      </View>
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
    },
    crewMembers: {
        marginTop: 20,
        color: '#09CAC7',
        fontSize: 22,
        fontWeight: '500'
    },
    crewMemberContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})