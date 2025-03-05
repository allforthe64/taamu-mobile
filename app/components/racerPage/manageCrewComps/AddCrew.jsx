import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

//fontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

//picker component import
import {Picker} from '@react-native-picker/picker';

const AddCrew = ({setOpenAddCrew}) => {

    //initialize state
    const [focused, setFocused] = useState()
    const [teamName, setTeamName] = useState('')
    const [craftCategory, setCraftCategory] = useState('')
    const [maximumNoCrewMembers, setMaximumNoCrewMembers] = useState(0)
    const [ageCategory, setAgeCategory] = useState('')
    const [gender, setGender] = useState('')

  return (
    <View style={styles.mainContainer}>
        <View style={styles.xMarkContainer}>
            <TouchableOpacity onPress={() => setOpenAddCrew(false)}>
                <FontAwesomeIcon icon={faXmark} color='white' size={40}/>
            </TouchableOpacity>
        </View>
        <Text style={styles.mainHeading}>Add a new crew:</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Enter a <Text style={[styles.inputHeading, { color: '#09CAC7' }]}>team name:</Text></Text>
            <TextInput style={focused === 'teamName' ? styles.focusedSingleLineTextInputs : styles.singleLineTextInputs} onFocus={() => setFocused('teamName')} value={teamName} inputMode='text' placeholder='Enter a team name' onChangeText={(e) => setTeamName(e)}/>
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Select a <Text style={[styles.inputHeading, { color: '#09CAC7' }]}>craft type:</Text></Text>
            <Picker
                mode='dropdown'
                style={focused === 'craftCategory' ? [styles.focusedSingleLineTextInputs, {marginTop: '10%'}] : [styles.singleLineTextInputs, {marginTop: '10%'}]}
                selectedValue={craftCategory}
                onValueChange={(itemValue, itemIndex) => {
                    if (itemValue !== '') {
                        setCraftCategory(itemValue)
                        if (e.target.value === 'OC2 - relay' || e.target.value === 'OC1 - relay' || e.target.value === 'V1 - relay') {
                            setMaximumNoCrewMembers(2)
                        } else {
                            setMaximumNoCrewMembers(0)
                        }
                }
                }}
                onFocus={() => setFocused('craftCategory')}
                >
                    <Picker.Item key={''} label={'Choose one...'} value={''} />
                    <Picker.Item key={'OC2'} label={'OC2 - non relay crew'} value={'OC2'} />
                    <Picker.Item key={'OC2 - relay'} label={'OC2 - relay'} value={'OC2 - relay crew'} />
                    <Picker.Item key={'OC1 - relay'} label={'OC1 - relay'} value={'OC1 - relay crew'} />
                    <Picker.Item key={'V1 - relay'} label={'V1 - relay'} value={'V1 - relay crew'} />
                    <Picker.Item key={'V6'} label={'V6'} value={'V6'} />
                    <Picker.Item key={'V3'} label={'V3'} value={'V3'} />
                    <Picker.Item key={'V12'} label={'V12'} value={'V12'} />
                    <Picker.Item key={'Surfski Double'} label={'Surfski Double - Non relay crew'} value={'Surfski Double'} />
                    <Picker.Item key={'Surfski Double - relay'} label={'Surfski Double - relay crew'} value={'Surfski Double - relay'} />
                    <Picker.Item key={'Surfski Single - relay'} label={'Surfski Single - relay crew'} value={'Surfski Single - relay'} />
                    <Picker.Item key={'War Canoe Double'} label={'War Canoe - Double'} value={'War Canoe Double'} />
                    <Picker.Item key={'War Canoe 6 Man'} label={'War Canoe - 6 man'} value={'War Canoe 6 Man'} />
                    <Picker.Item key={'War Canoe 11 Man'} label={'War Canoe - 11 man'} value={'War Canoe 11 Man'} />
                    <Picker.Item key={'Dragon Boat 20 Man'} label={'Dragon Boat - 20 man'} value={'Dragon Boat 20 Man'} />
                    <Picker.Item key={'Dragon Boat 10 Man'} label={'Dragon Boat - 10 man'} value={'Dragon Boat 10 Man'} />
            </Picker>
        </View>
        {craftType !== '' && (craftType === 'V6' || craftType === 'OC2 - relay' || craftType === 'OC1 - relay' || craftType === 'V1 - relay' || craftType === 'Surfski Double - relay' || craftType === 'Surfski Single - relay') &&
            <View style={styles.inputContainer}>
                <Text style={styles.inputHeading}>Set max <Text style={[styles.inputHeading, { color: '#09CAC7' }]}>crew members:</Text></Text>
                {craftType === 'OC2 - relay' || craftType === 'OC1 - relay' || craftType === 'V1 - relay' || craftType === 'Surfski Double - relay' || craftType === 'Surfski Single - relay' ?
                    <TextInput inputMode="numeric"
                    onChangeText={(e) => setMaximumNoCrewMembers(e)}
                    placeholder="Enter a number" style={focused === 'maxCrewMembers' ? styles.focusedSingleLineTextInputs : styles.singleLineTextInputs} onFocus={() => setFocused('maxCrewMembers')} value={maximumNoCrewMembers} onChange={(e) => setMaximumNoCrewMembers(e.target.value)} type='number' min={2}/>
                :
                    <Picker 
                        mode='dropdown'
                        style={focused === 'maxCrewMembers' ? [styles.focusedSingleLineTextInputs, {marginTop: '10%'}] : [styles.singleLineTextInputs, {marginTop: '10%'}]}
                        selectedValue={maximumNoCrewMembers}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue !== 0) setMaximumNoCrewMembers(itemValue)
                        }}
                        onFocus={() => setFocused('maxCrewMembers')}
                    >
                        <Picker.Item key={0} label={'Choose one...'} value={0} />
                        <Picker.Item key={6} label={'6'} value={6} />
                        <Picker.Item key={9} label={'9'} value={9} />
                        <Picker.Item key={12} label={'12'} value={12} />
                        <Picker.Item key={18} label={'18'} value={18} />
                        <Picker.Item key={24} label={'24'} value={24} />
                    </Picker>
                }
            </View>
        }
        <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Select crew <Text style={[styles.inputHeading, { color: '#09CAC7' }]}>age category:</Text></Text>
            <Picker 
                mode='dropdown'
                style={focused === 'ageCategory' ? [styles.focusedSingleLineTextInputs, {marginTop: '10%'}] : [styles.singleLineTextInputs, {marginTop: '10%'}]}
                selectedValue={ageCategory}
                onValueChange={(itemValue, itemIndex) => {
                    if (itemValue !== '') setAgeCategory(itemValue)
                }}
                onFocus={() => setFocused('ageCategory')}
            >
                <Picker.Item key={''} label={'Choose one...'} value={''} />
                <Picker.Item key={'J16'} label={'J16'} value={'J16'} />
                <Picker.Item key={'J19'} label={'J19'} value={'J19'} />
                <Picker.Item key={'Open'} label={'Open'} value={'Open'} />
                <Picker.Item key={'Masters 40s'} label={'Masters 40s'} value={'Masters 40s'} />
                <Picker.Item key={'Masters 50s'} label={'Masters 50s'} value={'Masters 50s'} />
                <Picker.Item key={'Masters 60s'} label={'Masters 60s'} value={'Masters 60s'} />
                <Picker.Item key={'Masters 70s'} label={'Masters 70s'} value={'Masters 70s'} />
                <Picker.Item key={'Masters 75+'} label={'Masters 75+'} value={'Masters 75+'} />
            </Picker>
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Select crew <Text style={[styles.inputHeading, { color: '#09CAC7' }]}>gender:</Text></Text>
            <Picker 
                mode='dropdown'
                style={focused === 'gender' ? [styles.focusedSingleLineTextInputs, {marginTop: '10%'}] : [styles.singleLineTextInputs, {marginTop: '10%'}]}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => {
                    if (itemValue !== '') setGender(itemValue)
                }}
                onFocus={() => setFocused('gender')}
            >
                <Picker.Item key={''} label={'Choose one...'} value={''} />
                <Picker.Item key={'m'} label={'Male'} value={'m'} />
                <Picker.Item key={'f'} label={'Female'} value={'f'} />
                <Picker.Item key={'mixed'} label={'Mixed'} value={'mixed'} />
            </Picker>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Save crew</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default AddCrew

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#01354B',
        paddingBottom: 25
    },
    xMarkContainer: {
        width: 'full',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: '5%',
        paddingRight: '5%'
    },
    mainHeading: {
        marginTop: 20,
        width: '100%',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '600',
        color: '#09CAC7'
    },
    inputHeading: {
        fontSize: 22,
        color: 'white',
        fontWeight: '500'
    },
    inputContainer: {
        paddingTop: '10%',
        paddingLeft: '5%'
    },
    singleLineTextInputs: {
        backgroundColor: 'white',
        color: '#808080',
        width: '95%',
        fontSize: 18,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'white',
        borderWidth: 2
    },
    focusedSingleLineTextInputs: {
        backgroundColor: 'white',
        color: '#808080',
        width: '90%',
        fontSize: 18,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#09CAC7',
        borderWidth: 2
    },
    buttonContainer: {
        paddingTop: '8%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
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
    buttonDisabled: {
        backgroundColor: '#09CAC7',
        paddingTop: 7,
        paddingLeft: 15,
        paddingBottom: 7,
        paddingRight: 15,
        borderRadius: 100,
        marginTop: 15,
        opacity: .5
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        fontWeight: '600'
    }
})