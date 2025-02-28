import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

//picker component import
import {Picker} from '@react-native-picker/picker';

const ManageCrews = ({crews}) => {
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
            <Picker
                mode='dropdown'
                style={styles.singleLineTextInputs}
                /* selectedValue={selectedCraftCategory}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedCraftCategory(itemValue)
                } */
            >
                {
                    crews.map((crew) => {
                       <Picker.Item key={crew} label={crew} value={crew} />
                    })
                }
            </Picker>
            <View style={{width: '70%', height: 2, borderRadius: 100, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', marginTop: 10}}></View>
      </View>
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