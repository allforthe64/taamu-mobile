import { View, Text } from 'react-native'

//react/react related imports
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'

//getKey data
import { getKey } from '../../firebase/firestore'

const RacesMain = ({races}) => {

    //initialize state
    const [decryptedRaces, setDecryptedRaces] = useState([])
    const [raceTypeFilter, setRaceTypeFilter] = useState('All Race Types')
    const [craftTypeFilter, setCraftTypeFilter] = useState('')
    const [distanceFilter, setDistanceFilter] = useState({value: {}, index: '0'})
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [timeFilter, setTimeFilter] = useState('upcoming')
    const [dataCopy, setDataCopy] = useState()
    const [query, setQuery] = useState('')
    const [keyData, setKeyData] = useState()

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
                console.log(keyData)
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
                                setDecryptedRaces(data)
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
    <View>
      <Text>RacesMain</Text>
    </View>
  )
}

export default RacesMain