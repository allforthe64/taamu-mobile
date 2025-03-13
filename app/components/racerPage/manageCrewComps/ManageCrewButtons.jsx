import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ManageCrewButtons = ({ setOpenDeleteCrew, setOpenEditCrew, setOpenAddCrewMember }) => {
  return (
    <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setOpenAddCrewMember(true)}>
            <Text style={styles.buttonText}>Add a crew member</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {marginTop: 15}]} onPress={() => setOpenEditCrew(true)}>
            <Text style={styles.buttonText}>Edit this crew</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {marginTop: 15}]} onPress={() => setOpenDeleteCrew(true)}>
            <Text style={styles.buttonText}>Delete this crew</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ManageCrewButtons

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25
    },
    button: {
        backgroundColor: '#09CAC7',
        paddingTop: 7,
        paddingLeft: 15,
        paddingBottom: 7,
        paddingRight: 15,
        borderRadius: 100,
        marginTop: 15
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        fontWeight: '600'
    },
})