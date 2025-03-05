import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'

//picker component import
import {Picker} from '@react-native-picker/picker';
import { useFocusEffect } from 'expo-router';

//SelectedCrew component import
import SelectedCrew from './SelectedCrew';

const ManageCrews = ({racerCrews}) => {

    const [selectedCrew, setSelectedCrew] = useState()

    useFocusEffect(
        useCallback(() => {
            if (racerCrews) setSelectedCrew(racerCrews[0])
        }, [racerCrews])
    )


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeading}>Manage your crews</Text>
      <View style={styles.addCrewButtonContainer}>
        <Text style={styles.subHeading}>Add a new crew:</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add crew</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.selectCrewWidgetContainer}>
            <Text style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 22,
                fontWeight: '500',
                color: 'white'
            }}>Viewing<Text style={styles.subHeading}> crew:</Text></Text>
            {selectedCrew &&
                <Picker
                    mode='dropdown'
                    style={styles.singleLineTextInputs}
                    selectedValue={selectedCrew.id}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCrew(racerCrews.filter(crew => crew.id === itemValue)[0])
                    }
                >
                    {
                        racerCrews.map((crew) => {
                            return (
                                <Picker.Item key={crew.id} label={crew.crewName} value={crew.id} />
                            )
                        })
                    }
                </Picker>
            }
            <View style={{width: '70%', height: 2, borderRadius: 100, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', marginTop: 25}}></View>
      </View>
      { selectedCrew &&
        <SelectedCrew selectedCrew={selectedCrew}/>
      }
    </View>
  )
}

export default ManageCrews

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'rgba(0, 0, 0, .75)',
        width: '100%',
        marginTop: 50,
        paddingTop: 30,
        paddingBottom: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    mainHeading: {
        width: '100%',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '600',
        color: '#09CAC7'
    },
    subHeading: {
        width: '100%',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '500',
        color: '#09CAC7'
    },
    addCrewButtonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20
    },
    selectCrewWidgetContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20
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
    singleLineTextInputs: {
        backgroundColor: 'white',
        color: '#808080',
        width: '80%',
        fontSize: 18,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 15
    },
})