import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

//fontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

//picker component import
import {Picker} from '@react-native-picker/picker';

//hook imports
import { addCategory, addLink, removeCategory, removeLink, encrypt } from './hooks'

const EditProfile = ({setOpenEditProfile, decipheredFName, decipheredLName, decipheredEmail, decipheredPhone, phoneAreaCode, incomingBio, externalLinks, craftCategories, racerData, keyData}) => {

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
    const [selectedCraftCategory, setSelectedCraftCategory] = useState()

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
        if (decipheredFName) {
            setRacerFName(decipheredFName)
            setRacerLName(decipheredLName)
            setRacerEmail(decipheredEmail)
            setRacerPhone(decipheredPhone)
            setRacerBio(incomingBio)
            setRacerExternalLinks([...externalLinks])
            setRacerCraftCategories([...craftCategories])
        }
    }, [decipheredFName])

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

    const saveChanges = async () => {

        let newRacerData

       /*  if (racerData.captain) {

            if (fName === '') {
                setMessage(language === "fr" ? "Prénom manquant" : 'Missing first name')
                return
            } else if (lName === '') {
                setMessage(language === "fr" ? "Nom de famille manquant" : 'Missing last name')
                return
            } else if (email === '') {
                setMessage(language === "fr" ? "E-mail manquant" : 'Missing email')
                return
            } else if (phone === '') {
                setMessage(language === "fr" ? "Numéro de téléphone manquant" : 'Missing phone number')
                return
            } else if (teamName === '') {
                setMessage(language === "fr" ? "Nom de l'équipe manquant" : 'Missing team name')
                return
            } else {
                //encrypt information
                //encrypt team name
                const teamNameCipher = createCipheriv('aes256', keyData.key, keyData.iv)
                const encryptedTeamName = teamNameCipher.update(teamName, 'utf-8', 'hex') + teamNameCipher.final('hex')

                //encrypt fName
                const fNameCipher = createCipheriv('aes256', keyData.key, keyData.iv)
                const encryptedFName = fNameCipher.update(fName, 'utf-8', 'hex') + fNameCipher.final('hex')

                //encrypt lName
                const lNameCipher = createCipheriv('aes256', keyData.key, keyData.iv)
                const encryptedLName = lNameCipher.update(lName, 'utf-8', 'hex') + lNameCipher.final('hex')

                //encrypt email
                const emailCipher = createCipheriv('aes256', keyData.key, keyData.iv)
                const encryptedEmail = emailCipher.update(email, 'utf-8', 'hex') + emailCipher.final('hex')

                //encrypt phone
                const phoneCipher = createCipheriv('aes256', keyData.key, keyData.iv)
                const encryptedPhone = phoneCipher.update(phone, 'utf-8', 'hex') + phoneCipher.final('hex')

                newRacerData = {
                    ...racerData,
                    fName: encryptedFName,
                    lName: encryptedLName,
                    email: encryptedEmail,
                    phone: racerData.phone.split(' ')[0] + ' ' + encryptedPhone,
                    bio: bio,
                    contactLinks: links,
                    craftCategories: craftCategories,
                    uid: racerId,
                    teamName: encryptedTeamName
                }
            }
        } else { */

            if (racerFName === '') {
                /* setMessage(language === "fr" ? "Prénom manquant" : 'Missing first name') */
                alert('missing fName')
                return
            } else if (racerLName === '') {
                /* setMessage(language === "fr" ? "Nom de famille manquant" : 'Missing last name') */
                alert('missingLName')
                return
            } else if (racerEmail === '') {
                /* setMessage(language === "fr" ? "E-mail manquant" : 'Missing email') */
                alert('missing email')
                return
            } else if (racerPhone === '') {
                /* setMessage(language === "fr" ? "Numéro de téléphone manquant" : 'Missing phone number') */
                alert('missing phone')
                return
            } else {
                
                const data = await encrypt([racerFName, racerLName, racerEmail, racerPhone], keyData)
                newRacerData = {
                    ...racerData,
                    fName: data.data[0],
                    lName: data.data[1],
                    email: data.data[2],
                    phone: racerData.phone.split(' ')[0] + ' ' + data.data[3],
                    bio: bio,
                    contactLinks: links,
                    craftCategories: craftCategories,
                    uid: racerId
                }
            }

            await updateUser(newRacerData)
            setOpenEditProfile(false)
        /* } */
    }

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
                                    <TouchableOpacity onPress={() => removeLink(link, setRacerExternalLinks)}>
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
                    <TouchableOpacity style={[styles.button, {width: '35%'}]} onPress={() => {
                        if (newLink !== '') addLink(newLink, setRacerExternalLinks, setNewLink)
                    }}>
                        <Text style={styles.buttonText}>Add Link</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.inputContainer, {marginTop: '10%'}]}>
                <Text style={{color: 'white', fontSize: 25, width: '90%', fontWeight: '500', marginBottom: 10}}>Edit <Text style={{color: '#09CAC7'}}>Favorite Craft Categories (optional):</Text></Text>
                {racerCraftCategories.length > 0 &&
                    <View style={styles.linkCraftsContainer}>
                        {racerCraftCategories.map((category, i) => {
                            return (
                                <View style={styles.externalLink} key={i}>
                                    <Text style={styles.linkText} numberOfLines={1}>{category}</Text>
                                    <TouchableOpacity onPress={() => removeCategory(category, setRacerCraftCategories)}>
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
                        setSelectedCraftCategory(itemValue)
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
                    <TouchableOpacity style={[styles.button, {width: '75%'}]} onPress={() => addCategory(selectedCraftCategory, setRacerCraftCategories, setSelectedCraftCategory)}>
                        <Text style={styles.buttonText}>Add Craft Category</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10%'}}>
                <TouchableOpacity style={[styles.button, {width: '60%'}]} onPress={() => saveChanges()}>
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
        width: '95%',
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