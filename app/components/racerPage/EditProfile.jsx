import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

//fontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

import {Picker} from '@react-native-picker/picker';

const EditProfile = ({setOpenEditProfile, decipheredFName, decipheredLName, decipheredEmail, decipheredPhone, phoneAreaCode, incomingBio, externalLinks, craftCategories}) => {

    //functionality state
    const [focused, setFocused] = useState('')

    //racerData state
    const [racerFName, setRacerFName] = useState('')
    const [racerLName, setRacerLName] = useState('')
    const [racerEmail, setRacerEmail] = useState('')
    const [racerPhone, setRacerPhone] = useState('')
    const [racerBio, setRacerBio] = useState('')
    const [racerExternalLinks, setRacerExternalLinks] = useState([])
    const [newLink, setNewLink] = useState('')
    const [racerCraftCategories, setRacerCraftCategories] = useState([])
    const [selectedCraftCategory, setSelectedSelectedCraftCategory] = useState()

    const craftCategoriesArr = [
        'V1',
        'OC1',
        'SUP',
        'Surfski Single',
        'OC2',
        'V6',
        'V3',
        'V12',
        'Surfski Double'
    ]

    useEffect(() => {
        if (decipheredFName && decipheredLName) {
            setRacerFName(decipheredFName)
            setRacerLName(decipheredLName)
            setRacerEmail(decipheredEmail)
            setRacerPhone(decipheredPhone)
            setRacerBio(incomingBio)
            setRacerExternalLinks([...externalLinks])
            setRacerCraftCategories([...craftCategories])
        }
    }, [])

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
                <TextInput style={focused === 'bio' ? [styles.focusedSingleLineTextInputs, {height: 300, textAlignVertical: 'top'}] : [styles.singleLineTextInputs, {height: 300, textAlignVertical: 'top'}]} onFocus={() => setFocused('bio')} value={racerBio} inputMode="text" placeholder="Bio (optional)" onChangeText={(e) => setRacerBio(e)} multiline numberOfLines={14}/>
            </View>

            <View style={styles.inputContainer}>
                <Text style={{color: 'white', fontSize: 25, width: '90%', fontWeight: '500', marginBottom: 10}}>Edit <Text style={{color: '#09CAC7'}}>Links/Contacts (optional):</Text></Text>
                {racerExternalLinks.length > 0 &&
                    <View style={styles.linkCraftsContainer}>
                        {racerExternalLinks.map((link, i) => {
                            return (
                                <View style={styles.externalLink} key={i}>
                                    <Text style={styles.linkText} numberOfLines={1}>{link}</Text>
                                    <TouchableOpacity>
                                        <FontAwesomeIcon icon={faTrash} color='white' size={18}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                }
                <View style={{width: '90%', borderWidth: 2, borderRadius: 100, borderColor: '#09CAC7', marginTop: 10}}></View>
                <TextInput style={focused === 'links' ? [styles.focusedSingleLineTextInputs, {marginTop: '10%'}] : [styles.singleLineTextInputs, {marginTop: '10%'}]} onFocus={() => setFocused('links')} value={newLink} inputMode="text" placeholder="Paste/Type new link" onChangeText={(e) => setNewLink(e)}/>
                <View style={{width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={[styles.button, {width: '35%'}]}>
                        <Text style={styles.buttonText}>Add Link</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.inputContainer, {marginTop: '10%'}]}>
                <Text style={{color: 'white', fontSize: 25, width: '90%', fontWeight: '500', marginBottom: 10}}>Edit <Text style={{color: '#09CAC7'}}>Favorite Craft Categories (optional):</Text></Text>
                {racerCraftCategories.length > 0 &&
                    <View style={styles.linkCraftsContainer}>
                        {racerCraftCategories.map((link, i) => {
                            return (
                                <View style={styles.externalLink} key={i}>
                                    <Text style={styles.linkText} numberOfLines={1}>{link}</Text>
                                    <TouchableOpacity>
                                        <FontAwesomeIcon icon={faTrash} color='white' size={18}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                }
                <View style={{width: '90%', borderWidth: 2, borderRadius: 100, borderColor: '#09CAC7', marginTop: 10}}></View>
                <Picker
                    mode='dropdown'
                    style={focused === 'craftCategory' ? [styles.focusedSingleLineTextInputs, {marginTop: '10%'}] : [styles.singleLineTextInputs, {marginTop: '10%'}]}
                    selectedValue={selectedCraftCategory}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedSelectedCraftCategory(itemValue)
                    }
                    onFocus={() => setFocused('craftCategory')}
                    >
                    {
                        craftCategoriesArr.map((category) => {
                            if (!racerCraftCategories.includes(category)) return <Picker.Item key={category} label={category} value={category} />
                        })
                    }
                </Picker>
                <View style={{width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={[styles.button, {width: '75%'}]}>
                        <Text style={styles.buttonText}>Add Craft Category</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10%'}}>
                <TouchableOpacity style={[styles.button, {width: '60%'}]}>
                    <Text style={styles.buttonTextL}>Save Changes</Text>
                </TouchableOpacity>
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
        paddingBottom: '10%'
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
        fontWeight: '600',
        width: '95%'
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
    linkCraftsContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        height: 200,
        overflow: 'scroll'
    },  
    externalLink: {
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        marginBottom: 15
    },
    linkText: {
        width: '85%',
        fontSize: 18,
        color: 'white',
        fontWeight: '400'
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
    buttonTextL: {
        color: 'white',
        fontSize: 30,
        width: '100%',
        textAlign: 'center',
        fontWeight: '600'
    },
})