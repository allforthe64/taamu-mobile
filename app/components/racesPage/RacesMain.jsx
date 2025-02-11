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
                try {
                    const operationFish = async () => {
                        const url = 'https://tuarolife.com/api/X8pQ3Lz7B1vW9KYa5MdN';
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }, [races, keyData])
    )

  return (
    <View>
      <Text>RacesMain</Text>
    </View>
  )
}

export default RacesMain