import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

const Contact = () => {

    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [orgName, setOrgName] = useState('')
    const [message, setMessage] = useState('')

  return (
    <View style={styles.mainContainer}>
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
                style={[styles.singleLineTextInputs, {marginBottom: 20}]}
            />
            <TextInput
                inputMode="text"
                placeholder="First name"
                value={fName}
                onChangeText={setFName}
                style={[styles.singleLineTextInputs, {marginBottom: 20}]}
            />
            <TextInput
                inputMode="text"
                placeholder="Last name"
                value={lName}
                onChangeText={setLName}
                style={[styles.singleLineTextInputs, {marginBottom: 20}]}
            />
            <TextInput
                inputMode="text"
                placeholder="Organization name (optional)"
                value={orgName}
                onChangeText={setOrgName}
                style={[styles.singleLineTextInputs, {marginBottom: 20}]}
            />
            <TextInput
                inputMode="text"
                placeholder="Organization name (optional)"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={2}
                style={[styles.singleLineTextInputs, {marginBottom: 20, height: 200, textAlignVertical: 'top'}]}
            />
            <TouchableOpacity style={[styles.contactButton, {marginBottom: 20}]} onPress={() => router.push('/register')}>
                <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
        </View>
    </View>
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