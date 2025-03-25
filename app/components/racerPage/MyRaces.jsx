import { View, Text, StyleSheet } from 'react-native'

import React, {useState, useCallback, useEffect} from 'react'

import { useFocusEffect } from 'expo-router'

import { getKey } from '../../firebase/firestore'

//component imports
import RacerRaceButtons from './RacerRaceButtons'
import RacerRaceCard from './RacerRaceCard'

//date-fns imports
import { isBefore, isAfter, parse, format } from 'date-fns'

const MyRaces = ({races}) => {

    //initialize state
    const [decryptedRaces, setDecryptedRaces] = useState([])
    const [racesToShow, setRacesToShow] = useState([])
    const [keyData, setKeyData] = useState()
    const [mode, setMode] = useState('upcoming')

    useEffect(() => {
        const getKeyData = async () => {
            const keyDataObj = await getKey('2L5AoMJxKYqiPuSERhul7wFBO')
            setKeyData(keyDataObj)
        }
        getKeyData()
    }, [])

    useEffect(() => {
        if (races && races?.length > 0 && keyData) {
            try {
                const operationFish = async () => {
                    const url = 'https://tuarolife.com/api/X8pQ3Lz7B1vW9KYa5MdN';
                    const key = keyData.key
                    const iv = keyData.iv

                    try {
                        const response = await fetch(url, {
                            method: 'POST', // Specifies the request method
                            headers: {
                                'Content-Type': 'application/json', // Sets the request body as JSON
                            },
                            body: JSON.stringify({payload: races, key: key, iv: iv}), // Converts the payload to JSON string
                        });

                        const responseText = await response.text(); // Log the raw response
                        console.log("Raw Response:", responseText);
    
                        // Check if the response was successful
                        if (response.ok) {
                            const data = await response.json();
                            setDecryptedRaces(data.data)
                        } else {
                            console.error('Failed to send data:', response);
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

    //filter races
    useEffect(() => {
        if (decryptedRaces) {

            const currentDate = format(new Date(), 'MM/dd/yyyy')

            //filter for upcoming races
            if (mode === 'upcoming') {
                setRacesToShow(decryptedRaces.filter(race => isAfter(parse(race.startDate, "MM/dd/yyyy", new Date()), parse(currentDate, "MM/dd/yyyy", new Date()))
                ))
            }

            //filter for ongoing races
            if (mode === 'ongoing') {
                setRacesToShow(decryptedRaces.filter(race => 
                    isBefore(parse(race.startDate, "MM/dd/yyyy", new Date()), parse(currentDate, "MM/dd/yyyy", new Date())) &&
                    isAfter(parse(race.endDate, "MM/dd/yyyy", new Date()), parse(currentDate, "MM/dd/yyyy", new Date()))
                ))
            }

            if (mode === 'results') {
                setRacesToShow(decryptedRaces.filter(race => isBefore(parse(race.endDate, "MM/dd/yyyy", new Date()), parse(currentDate, "MM/dd/yyyy", new Date()))
                ))
            }
        }
    }, [decryptedRaces, mode])

  return (
    <View style={styles.mainContainer}>
        <View style={styles.modeButtonContainer}>
            <RacerRaceButtons mode={mode} setMode={setMode}/>
        </View>
        <View style={[styles.modeButtonContainer, {marginTop: 30}]}>
            {racesToShow.length > 0 ?
                <>
                    {racesToShow.map(race => {
                        return <RacerRaceCard raceData={race} filter={mode}/>
                    })}
                </>
            :
                <View style={styles.noRacesContainer}>
                    <Text style={{color: '#09CAC7', fontSize: 22, fontWeight: '600'}}>No races match your selection, try adjusting your filters :(</Text>
                </View>
            }
        </View>
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
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    modeButtonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    noRacesContainer: {
        width: '100%',
        height: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})