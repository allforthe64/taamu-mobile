import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

//fontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const EditProfile = ({setOpenEditProfile, decipheredFName, decipheredLName, decipheredEmail, decipheredPhone, phoneAreaCode, incomingBio}) => {

    //functionality state
    const [focused, setFocused] = useState('')

    //racerData state
    const [racerFName, setRacerFName] = useState('')
    const [racerLName, setRacerLName] = useState('')
    const [racerEmail, setRacerEmail] = useState('')
    const [racerPhone, setRacerPhone] = useState('')
    const [racerBio, setRacerBio] = useState('')

    useEffect(() => {
        if (decipheredFName && decipheredLName) {
            setRacerFName(decipheredFName)
            setRacerLName(decipheredLName)
            setRacerEmail(decipheredEmail)
            setRacerPhone(decipheredPhone)
            setRacerBio(incomingBio)
        }
    }, [decipheredFName, decipheredLName])

    //set focused to '' when the keyboard is closed
    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setFocused(''); // or some other action
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
        };
      }, []);

  return (
    <View style={styles.mainContainer}>
        <ScrollView>
            <View style={styles.xMarkContainer}>
                <TouchableOpacity onPress={() => setOpenEditProfile(false)}>
                    <FontAwesomeIcon icon={faXmark} color='white' size={40}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.heading}>Edit <Text style={{color: '#09CAC7'}}>Profile</Text></Text>
            <View style={styles.inputContainer}>
                <Text style={{color: 'white', fontSize: 25, width: '90%', fontWeight: '500', marginBottom: 10}}>Edit <Text style={{color: '#09CAC7'}}>first name (required):</Text></Text>
                <TextInput style={focused === 'fName' ? styles.focusedSingleLineTextInputs : styles.singleLineTextInputs} onFocus={() => setFocused('fName')} placeholder='First name (required)' inputMode='text' value={racerFName} onChangeText={(e) => setRacerFName(e)}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color: 'white', fontSize: 25, width: '90%', fontWeight: '500', marginBottom: 10}}>Edit <Text style={{color: '#09CAC7'}}>last name (required):</Text></Text>
                <TextInput style={focused === 'lName' ? styles.focusedSingleLineTextInputs : styles.singleLineTextInputs} onFocus={() => setFocused('lName')} value={racerLName} inputMode='text' placeholder='Last name (required)' onChangeText={(e) => setRacerLName(e)}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color: 'white', fontSize: 25, width: '90%', fontWeight: '500', marginBottom: 10}}>Edit <Text style={{color: '#09CAC7'}}>email (required):</Text></Text>
                <TextInput style={focused === 'email' ? styles.focusedSingleLineTextInputs : styles.singleLineTextInputs} onFocus={() => setFocused('email')} value={racerEmail} inputMode='text' placeholder='Edit email (required)' onChangeText={(e) => setRacerEmail(e)}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color: 'white', fontSize: 25, width: '90%', fontWeight: '500', marginBottom: 10}}>Edit <Text style={{color: '#09CAC7'}}>phone (required):</Text></Text>
                <TextInput style={focused === 'phone' ? styles.focusedSingleLineTextInputs : styles.singleLineTextInputs} onFocus={() => setFocused('phone')} value={racerPhone} inputMode='text' placeholder='Edit phone (required)' onChangeText={(e) => setRacerPhone(e)}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color: 'white', fontSize: 25, width: '90%', fontWeight: '500', marginBottom: 10}}>Edit <Text style={{color: '#09CAC7'}}>phone (required):</Text></Text>
                <TextInput style={focused === 'bio' ? [styles.focusedSingleLineTextInputs, {height: 300, textAlignVertical: 'top'}] : [styles.singleLineTextInputs, {height: 300, textAlignVertical: 'top'}]} onFocus={() => setFocused('bio')} value={racerBio} inputMode="text" placeholder="Message (optional)" onChangeText={(e) => setRacerBio(e)} multiline numberOfLines={14}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color: 'white', fontSize: 25, width: '90%', fontWeight: '500', marginBottom: 10}}>Edit <Text style={{color: '#09CAC7'}}>Links/Contacts (optional):</Text></Text>
                {/* <TextInput style={focused === 'bio' ? [styles.focusedSingleLineTextInputs, {height: 300, textAlignVertical: 'top'}] : [styles.singleLineTextInputs, {height: 300, textAlignVertical: 'top'}]} onFocus={() => setFocused('bio')} value={racerBio} inputMode="text" placeholder="Message (optional)" onChangeText={(e) => setRacerBio(e)} multiline numberOfLines={14}/> */}
            </View>
            
        </ScrollView>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#01354B',
    },
    xMarkContainer: {
        width: 'full',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: '5%',
        paddingRight: '5%'
    },
    heading: {
        paddingTop: '4%',
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '600'
    },
    inputContainer: {
        paddingTop: '10%',
        paddingLeft: '5%'
    },
    singleLineTextInputs: {
        backgroundColor: 'white',
        color: '#808080',
        width: '90%',
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
})