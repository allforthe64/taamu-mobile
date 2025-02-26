import { View, Text, StyleSheet } from 'react-native'

import React, {useState, useCallback} from 'react'

import { useFocusEffect } from 'expo-router'

import { getKey } from '../../firebase/firestore'
import RacerRaceButtons from './RacerRaceButtons'

const MyRaces = ({races}) => {

    //initialize state
    const [decryptedRaces, setDecryptedRaces] = useState([])
    const [keyData, setKeyData] = useState()
    const [mode, setMode] = useState('upcoming')

    useFocusEffect(
        useCallback(() => {
            const getKeyData = async () => {
                const keyDataObj = await getKey('2L5AoMJxKYqiPuSERhul7wFBO')
                setKeyData(keyDataObj)
            }
            getKeyData()
        }, [])
    )

    useFocusEffect(
        useCallback(() => {
            if (races && keyData) {
                try {
                    const operationFish = async () => {
                        const url = 'https://tuarolife.com/api/X8pQ3Lz7B1vW9KYa5MdN';
                        const payload = [...races]
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
                                setDecryptedRaces(data.data)
                            } else {
                                console.error('Failed to send data:', response.status);
                            }
                        } catch (error) {
                            console.error('Error sending POST request:', error);
                        }
                    }
                    operationFish()
                } catch (err) {
                    console.log(err)
                }
            }
        }, [races, keyData])
    )
    console.log(decryptedRaces)

  return (
    <View style={styles.mainContainer}>
        <View style={modeButtonContainer}>
            <RacerRaceButtons mode={mode} setMode={setMode}/>
        </View>
        <Text>MyRaces</Text>
    </View>
  )
}

export default MyRaces

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 50,
        marginBottom: 50,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .75)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    modeButtonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})