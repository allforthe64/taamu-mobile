import { Image, StyleSheet, Text, View, TextInput, Platform, TouchableOpacity, Pressable, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../../firebaseConfig'

//import useRouter hook
import { useRouter } from 'expo-router'

//email regex
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

//getUser Function
import { getUser } from '../../../firebase/firestore'

//context import 
import { useContext } from 'react'
import { AuthContext } from '../../../firebase/authContext'

const AuthComponent = () => {

    //initialize state
    const [focused, setFocused] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    //consume auth context
    const {setAuthUser} = useContext(AuthContext)

    //instantiate firebase auth object
    const auth = firebaseAuth

    //set focused to null when the keyboard is closed
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

    //verify email is valid
    useEffect(() => {
        setValidEmail(() => EMAIL_REGEX.test(email))
    }, [email])

    //instantiate router object
    const router = useRouter()

    const signInUser = async () => {

        //log in the user
        let response
        let userUID
        try {
            response = await signInWithEmailAndPassword(auth, email, password)
            userUID = response.user.uid
            const userData = await getUser({uid: userUID})
            setAuthUser({...userData})
            router.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    console.log(password)
    console.log(validEmail)

  return (
    <View style={styles.mainContainer}>
      <Image style={styles.bgImage} source={require('../../../../assets/wave_breaking.jpg')}/>
      <View style={styles.innerContainer}>
        <View style={styles.mainWindow}>
            <Text style={styles.authHeading}>Please login to <Text style={{color: '#09CAC7'}}>Tuaro Life</Text> to continue</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel} aria-label="Label for email" nativeID="labelEmail">Email:</Text>
                <TextInput onFocus={() => setFocused('email')} style={focused === 'email' ? [styles.inputFocused, Platform.OS === 'web' && ({ outlineStyle: 'none' }) ] : [styles.input, Platform.OS === 'web' && ({ outlineStyle: 'none' }) ]} aria-label="email" aria-labelledby="labelEmail" value={email} onChangeText={(e) => setEmail(e)} inputMode='email' placeholder='Email'/>
            </View>
            <View style={[styles.inputContainer, {marginTop: '10%'}]}>
                <Text style={styles.inputLabel} aria-label="Label for password" nativeID="labelPassword">Password:</Text>
                <TextInput onFocus={() => setFocused('password')} style={focused === 'password' ? [styles.inputFocused, Platform.OS === 'web' && ({ outlineStyle: 'none' }) ] : [styles.input, Platform.OS === 'web' && ({ outlineStyle: 'none' }) ]} aria-label="password" aria-labelledby="labelPassword" value={password} onChangeText={(e) => setPassword(e)} secureTextEntry placeholder='Password'/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={password.length === 0 || password === '' || !validEmail ? styles.loginButtonDim : styles.loginButton} disabled={password.length === 0 || password === '' || !validEmail} onPress={() => signInUser()}>
                    <Text style={styles.loginText}>Log in</Text>
                </TouchableOpacity>
            </View>
            <Text style={{color: 'white', marginTop: '10%', fontSize: 14}}>Forgot your password? Click to <Pressable><Text style={styles.underlinedTextButtons}>RESET</Text></Pressable></Text>
            <Text style={{color: 'white', marginTop: '10%', fontSize: 14, paddingLeft: '5%', paddingRight: '5%', textAlign: 'center'}}>Don't have an account? Click <Pressable onPress={() => router.push('/register')}><Text style={styles.underlinedTextButtons}>HERE</Text></Pressable> to register.</Text>
        </View>
      </View>
    </View>
  )
}

export default AuthComponent

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    bgImage: {
        objectFit: 'cover',
        width: '100%',
        height: '100%'
    },
    innerContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%'
    },
    mainWindow: {
        backgroundColor: '#01354B',
        width: '90%',
        height: 'auto',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'coloumn',
        alignItems: 'center',
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    authHeading: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: '10%'
    },
    inputContainer: {
        width: '90%'
    },
    inputLabel: {
        color: '#09CAC7',
        marginBottom: '4%',
        fontSize: 18
    },
    input: {
        backgroundColor: 'white',
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 6,
        paddingRight: 6,
        color: '#808080',
        borderRadius: 6,
    },
    inputFocused: {
        backgroundColor: 'white',
        fontSize: 16,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 6,
        paddingRight: 6,
        color: '#808080',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#09CAC7'
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '15%'
    },
    loginButton: {
        backgroundColor: '#09CAC7',
        paddingTop: 5,
        paddingLeft: 12,
        paddingBottom: 5,
        paddingRight: 12,
        borderRadius: 100
    },
    loginButtonDim: {
        opacity: .5,
        backgroundColor: '#09CAC7',
        paddingTop: 5,
        paddingLeft: 12,
        paddingBottom: 5,
        paddingRight: 12,
        borderRadius: 100
    },
    loginText: {
        fontSize: 16,
        color: 'white'
    },
    underlinedTextButtons: {
        color: '#09CAC7', 
        textDecorationStyle: 'solid', 
        textDecorationLine: 'underline'
    }
})