import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useRef } from 'react'

//emailJS imports
import { send, EmailJSResponseStatus } from '@emailjs/react-native';
import Constants from 'expo-constants';

const Contact = () => {

    //initialize state
    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [orgName, setOrgName] = useState('')
    const [message, setMessage] = useState('')
    const [focused, setFocused] = useState('')

    console.log(Constants.expoConfig.extra.PUBLIC_EMAIL_JS_API_KEY)

    const sendMessage = async () => {
        try {
          await send(
            Constants.expoConfig.extra.EXPO_PUBLIC_EMAIL_JS_SERVICE_ID,
            Constants.expoConfig.extra.EXPO_PUBLIC_EMAIL_JS_TEMPLATE_ID,
            {
              fromName: fName + ' ' + lName,
              from_address: email,
              from_org: orgName !== '' ? orgName : '(Sender did not affiliate themselves with an organization)',
              message: message
            },
            {
              publicKey: Constants.expoConfig.extra.PUBLIC_EMAIL_JS_API_KEY,
            },
          );
    
          console.log('SUCCESS!');
          setEmail('')
          setFName('')
          setLName('')
          setOrgName('')
          setMessage('')
        } catch (err) {
          if (err instanceof EmailJSResponseStatus) {
            console.log('EmailJS Request Failed...', err);
          }
    
          console.log('ERROR', err);
        }
      };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.mainContainer}>
        <View style={styles.headingsContainer}>
            <Text style={styles.heading}>Contact</Text>
            <Text style={styles.tagLine}>Fill out the contact form and we'll get back to you right away</Text>
        </View>
        <View style={styles.contactForm}>
            <TextInput
                inputMode="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={focused === 'email' ? [styles.focusedSingleLineTextInputs, {marginBottom: 20}] : [styles.singleLineTextInputs, {marginBottom: 20}]}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
            />
            <TextInput
                inputMode="text"
                placeholder="First name"
                value={fName}
                onChangeText={setFName}
                style={focused === 'fName' ? [styles.focusedSingleLineTextInputs, {marginBottom: 20}] : [styles.singleLineTextInputs, {marginBottom: 20}]}
                onFocus={() => setFocused('fName')}
                onBlur={() => setFocused('')}
            />
            <TextInput
                inputMode="text"
                placeholder="Last name"
                value={lName}
                onChangeText={setLName}
                style={focused === 'lName' ? [styles.focusedSingleLineTextInputs, {marginBottom: 20}] : [styles.singleLineTextInputs, {marginBottom: 20}]}
                onFocus={() => setFocused('lName')}
                onBlur={() => setFocused('')}
            />
            <TextInput
                inputMode="text"
                placeholder="Organization name (optional)"
                value={orgName}
                onChangeText={setOrgName}
                style={focused === 'orgName' ? [styles.focusedSingleLineTextInputs, {marginBottom: 20}] : [styles.singleLineTextInputs, {marginBottom: 20}]}
                onFocus={() => setFocused('orgName')}
                onBlur={() => setFocused('')}
            />
            <TextInput
                inputMode="text"
                placeholder="Message (optional)"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={2}
                style={focused === 'message' ? [styles.focusedSingleLineTextInputs, {marginBottom: 20, height: 200, textAlignVertical: 'top'}] : [styles.singleLineTextInputs, {marginBottom: 20, height: 200, textAlignVertical: 'top'}]}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
            />
            <TouchableOpacity style={[styles.contactButton, {marginBottom: 20}]} onPress={() => sendMessage()}>
                <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default Contact

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingBottom: '10%'
    },
    headingsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '10%'
    },
    heading: {
        textShadowColor: '#09CAC7',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
        color: 'white',
        fontWeight: '600',
        fontSize: 35,
        marginBottom: 10
    },
    tagLine: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 500
    },
    contactForm: {
        width: '100%',
        display: 'flex',
        flexDirection: 'coloumn',
        alignItems: 'center'
    },
    singleLineTextInputs: {
        backgroundColor: 'white',
        color: '#808080',
        width: '90%',
        fontSize: 18,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10
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
    contactButton: {
        backgroundColor: '#09CAC7',
        paddingTop: 7,
        paddingLeft: 15,
        paddingBottom: 7,
        paddingRight: 15,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 22,
        color: 'white'
    }
})