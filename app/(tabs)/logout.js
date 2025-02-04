import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

//context import
import { useContext } from 'react'
import { AuthContext } from '../firebase/authContext'

//firebaseAuth import
import { firebaseAuth } from '../firebaseConfig'
import { signOut } from '@firebase/auth'

//router import
import { useRouter } from 'expo-router'

const logout = () => {

    //consume auth context
    const { setAuthUser } = useContext(AuthContext)

    //instantiate router object
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            signOut(firebaseAuth).then(() => {
                setAuthUser(null)
                router.push('/')
            }).catch((error) => {
                console.log(error)
            })
        }, 1000)
    }, [])

  return (
    <View style={styles.container}>    
        <Text style={{color: '#09CAC7', fontSize: 16}}>Logging out...</Text>
        <ActivityIndicator style={{marginLeft: '5%'}} color={'#09CAC7'}/>
    </View>
  )
}

export default logout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#01354B',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#09CAC7'
    }
})