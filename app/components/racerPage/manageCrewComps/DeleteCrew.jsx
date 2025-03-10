import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

//fontAwesomeImports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

//function imports
import { deleteCrew, updateUser } from '../../../firebase/firestore'

const DeleteCrew = ({ setOpenDeleteCrew, selectedCrew, racerData }) => {

    //delete the crew data object, update the racerData object
    const handleDelete = async () => {

        //create new racer data object, filter for crews that don't match the selectedCrew.id
        const newCrews = racerData.crews.filter(crew => crew !== selectedCrew.id)
        const newRacerData = {
            ...racerData,
            crews: newCrews
        }
        
        //delete the crewData object
        await deleteCrew(selectedCrew.id)

        //update racer data object
        await updateUser(newRacerData)

        setOpenDeleteCrew(false)
    }

  return (
    <View style={styles.mainContainer}>
        <View style={styles.xMarkContainer}>
            <TouchableOpacity onPress={() => setOpenDeleteCrew(false)}>
                <FontAwesomeIcon icon={faXmark} color='white' size={40}/>
            </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
            <Text style={styles.mainHeading}>Are you sure you want to delete the crew:</Text>
            <Text style={styles.subHeading}>{ selectedCrew?.crewName }</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete crew</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setOpenDeleteCrew(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default DeleteCrew

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#01354B',
        paddingBottom: 25,
        width: '100%',
    },
    xMarkContainer: {
        width: 'full',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: '5%',
        paddingRight: '5%'
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    mainHeading: {
        width: '100%',
        textAlign: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
        color: 'white',
        fontWeight: '600',
        fontSize: 30
    },
    subHeading: {
        width: '100%',
        textAlign: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
        color: '#09CAC7',
        fontWeight: '500',
        fontSize: 26
    },
    buttonContainer: {
        paddingTop: '8%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    button: {
        backgroundColor: '#09CAC7',
        paddingTop: 7,
        paddingLeft: 15,
        paddingBottom: 7,
        paddingRight: 15,
        borderRadius: 100,
        marginTop: 15,
        width: '60%'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        fontWeight: '600'
    }
})