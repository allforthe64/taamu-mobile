import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'

//expo-clipboard functions import
import * as Clipboard from 'expo-clipboard'

//useFocusEffect hook import
import { useFocusEffect } from 'expo-router'

//define email testing regex
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

//fontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const AddCrewMember = ({ racerData, setOpenAddCrewMember, selectedCrew, keyData }) => {

    //initialize state
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [focused, setFocused] = useState('')
    const [decipheredFName, setDecipheredFName] = useState('')
    const [decipheredLName, setDecipheredLName] = useState('')
    const [decipheredEmail, setDecipheredEmail] = useState('')
    const [success, setSuccess] = useState(false)

    useFocusEffect(useCallback(() => {
        if (racerData && keyData) {
            const operationCyclone = async () => {
                const url = 'https://tuarolife.com/api/cU5hF0mLrS7wyiRIIJ58'
                const payload = [racerData.fName, racerData.lName, racerData.email]
                const key = keyData.key
                const iv = keyData.iv

                try {
                    const response = await fetch(url, {
                    method: 'POST', // Specifies the request method
                    headers: {
                        'Content-Type': 'application/json', // Sets the request body as JSON
                    },
                    body: JSON.stringify({payload: payload, key: key, iv: iv}), // Converts the payload to JSON string
                    });

                    // Check if the response was successful
                    if (response.ok) {
                        const data = await response.json();

                        setDecipheredFName(data[0])
                        setDecipheredLName(data[1])
                        setDecipheredEmail(data[2])

                    } else {
                    console.error('Failed to send data from useFocuse callback:', response.status);
                    }
                } catch (error) {
                    console.error('Error sending POST request:', error);
                }
            }
            operationCyclone()
        }
    }, [racerData, keyData]))

    //copy link to clipboard
    const copyText = async () => {
        await Clipboard.setStringAsync(`https://tuarolife.com/coach-invite/${selectedCrew.crewId}`)
        alert('Text copied to clipboard!')
    }

    //send the invite link
    const sendEmailInvite = async () => {

        const emailParams = {
            from_name: `${decipheredFName}  ${decipheredLName}`,
            link: `${window.location.origin}/coach-invite/${crewId}`,
            to_email: email,
            decipheredFName: decipheredFName,
            decipheredLName: decipheredLName,
            decipheredTeamName: selectedCrew.crewName,
            message: message,
            decipheredEmail: decipheredEmail,
            language: 'en'
        }

        if (email.length === 0 || !EMAIL_REGEX.test(email)) {
            /* if (language === 'fr') {
                setErrorMessage('Email invalide saisi!')
            } else { */
                alert('Invalid email entered')
            /* } */
            return
        } 
        else if (selectedCrew.crewMembers.length === selectedCrew.maxCrewMembers) {
            /* if (language === 'fr') {
                setErrorMessage("Vous avez déjà le nombre maximum de membres d'équipage!")
            } else { */
                alert('You already have the maximum number of crew members!')
            /* } */
            return
        }
        else {
            try {
                const response = await fetch("/api/coach-invite", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(emailParams)
                });
    
                setEmail('')
                setMessage('')
                setSuccess(true)
            } catch (err) {
                console.log('err from email function: ', err)
            }
        }
    }

  return (
    <View style={styles.mainContainer}>
        {success ?
            <>
                <View style={styles.xMarkContainer}>
                    <TouchableOpacity onPress={() => setOpenAddCrewMember(false)}>
                        <FontAwesomeIcon icon={faXmark} color='white' size={40}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainerSuccess}>
                    <Text style={[styles.inputHeading, {fontSize: 30}]}>Invite sent <Text style={[styles.inputHeading, {fontSize: 30, color: '#09CAC7'}]}>successfully!</Text></Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setSuccess(false)} style={styles.button}>
                            <Text style={styles.buttonText}>Send another invite</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        :
            <View style={{ flex: 1 }}>
                <View style={styles.xMarkContainer}>
                    <TouchableOpacity onPress={() => setOpenAddCrewMember(false)}>
                        <FontAwesomeIcon icon={faXmark} color='white' size={40}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeading}>Invite by <Text style={[styles.inputHeading, { color: '#09CAC7' }]}>email:</Text></Text>
                        <TextInput style={focused === 'email' ? styles.focusedSingleLineTextInputs : styles.singleLineTextInputs} value={email} onChangeText={(e) => setEmail(e)} onFocus={() => setFocused('email')} placeholder='Email'/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeading}>Add <Text style={[styles.inputHeading, { color: '#09CAC7' }]}>{"message (optional)"}</Text></Text>
                        <TextInput onChangeText={(e) => setMessage(e)}
                            value={message}
                            placeholder={'Type here...'}
                            style={focused === 'message' ? [styles.focusedSingleLineTextInputs, {height: '45%', textAlignVertical: 'top'}] : [styles.singleLineTextInputs, {height: '45%', textAlignVertical: 'top'}]}
                            onFocus={() => setFocused('message')}
                            multiline
                            numberOfLines={2}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={sendEmailInvite}>
                            <Text style={styles.buttonText}>Send invite</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.or}>Or</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={copyText}>
                            <Text style={styles.buttonText}>Copy invite link</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        }
    </View>
  )
}

export default AddCrewMember

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#01354B',
        paddingBottom: 25,
        width: '100%',
        paddingBottom: 20,
        paddingTop: 20
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
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        paddingTop: 20
    },
    contentContainerSuccess: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        paddingTop: 20
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
        borderWidth: 2,
        marginTop: 15
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
        borderWidth: 2,
        marginTop: 15
    },
    or: {
        width: '100%',
        marginTop: 15,
        marginBottom: 15,
        fontSize: '500',
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
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
        marginTop: 15,
        width: '75%'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        fontWeight: '600'
    }
})