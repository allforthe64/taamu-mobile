import { View, Text } from 'react-native'

//react/react related imports
import React, { useState, useCallback, useEffect } from 'react'
import { useFocusEffect } from 'expo-router'

//getKey data
import { getKey } from '../../firebase/firestore'

//component imports
import RaceList from './RaceList'

//date-fns format import
import { format, isBefore, isAfter, parse } from 'date-fns'

const RacesMain = ({races}) => {

    //initialize state
    const [decryptedRaces, setDecryptedRaces] = useState([])
    const [filteredRaces, setFilteredRaces] = useState([])
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

    //create currentDate
    const currentDate = format(new Date(), 'MM/dd/yyyy')

    useEffect(() => {
        if (decryptedRaces.length > 0) {
            let newRaceArray = decryptedRaces.filter(race => !race.draft)

            //initially filter for races with a matching org name or race title
            if (query !== '') {
                newRaceArray = newRaceArray.filter(race => {
                    if (race.orgName.toLowerCase().includes(query.toLowerCase()) || race.title.toLowerCase().includes(query.toLowerCase())) {
                        return race
                    }
                })
            }

            //filter for races matching the race type
            if (raceTypeFilter !== 'All Race Types') {
                newRaceArray = newRaceArray.filter(race => race.raceType === raceTypeFilter)
            } 

            //filter for races that include the selected boat type
            if (craftTypeFilter !== 'All Boats' && craftTypeFilter !== '') {
                newRaceArray = newRaceArray.filter(race => race.craftCategories.includes(craftTypeFilter))
            }

            //filter for races that include the selected distance
            if (distanceFilter.index !== '0') {
                
                newRaceArray = newRaceArray.filter(race => {
                    let passed = false

                    //single distance
                    if (distanceFilter.value.value) {
                        race.raceEvents.forEach(event => {
                            if (Number(event.distance) === distanceFilter.value.value && event.distanceMetric === distanceFilter.value.metric) {
                                passed = true
                            }
                        })
                    } 
                    //distance range
                    else {
                        race.raceEvents.forEach(event => {
                            if (Number(event.distance) >= distanceFilter.value.lower && Number(event.distance) <= distanceFilter.value.upper && event.distanceMetric === distanceFilter.value.metric) {
                                passed = true
                            }
                        })
                    }
                    if (passed) return race
                })
            }

            //if theres a start and end date filter for races that fall within those dates
            if (startDate && endDate) {
                newRaceArray = newRaceArray.filter(race => {
                    if (new Date(race.startDate) >= new Date(startDate) && new Date(race.endDate) <= new Date(endDate))
                    return race   
                })
            } 
            //if theres only a startDate filter for races that occur after the selected startDate
            else if (startDate) {
                newRaceArray = newRaceArray.filter(race => new Date(race.startDate) >= new Date(startDate))
            } 
            //if theres only a endDate filter for races that occur before the selected startDate
            else if (endDate) {
                newRaceArray = newRaceArray.filter(race => new Date(race.endDate) <= new Date(endDate))
            }

            //results vs ongoing results vs registration
            if (timeFilter === 'upcoming') {
                newRaceArray = newRaceArray.filter(race => {
                    const isUpcomingRace = isAfter(
                        parse(race.startDate, format, new Date()), // Convert startDate to Date object
                        new Date() // Current date
                    );
                    if (isUpcomingRace) return race
                })
            }
            else if (timeFilter === 'ongoing') {
                newRaceArray = newRaceArray.filter(race => {
                    const isRaceActive = isWithinInterval(new Date(currentDate), {
                        start: parse(race.startDate, format, new Date()),
                        end: parse(race.endDate, format, new Date()),
                    });
                    if (isRaceActive) return race
                })
            }
            else if (timeFilter === 'results') {
                newRaceArray = newRaceArray.filter(race => {
                    const isPastRace = isBefore(
                        parse(race.endDate, format, new Date()), // Convert endDate to Date object
                        new Date() // Current date
                    );
                    if (isPastRace) return race
                })
            }
            
            console.log('newRaceArray: ', newRaceArray)

            setFilteredRaces(newRaceArray)
        }
    }, [decryptedRaces, raceTypeFilter, craftTypeFilter, distanceFilter, startDate, endDate, timeFilter, query])

  return (
    <View>
      <RaceList races={filteredRaces}/>
    </View>
  )
}

export default RacesMain