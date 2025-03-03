import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native'

//react/react related imports
import React, { useState, useCallback, useEffect } from 'react'
import { useFocusEffect } from 'expo-router'

//getKey data
import { getKey, getUser } from '../../firebase/firestore'

//component imports
import RaceList from './RaceList'
import Filters from './Filters'

//date-fns format import
import { parse, isBefore, isAfter, isWithinInterval, isEqual } from 'date-fns'

//import firebaseAuth object
import { firebaseAuth } from '../../firebaseConfig'

//fontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import RacesHero from './RacesHero'

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
    const [currentUser, setCurrentUser] = useState()
    const [filtersOpen, setFiltersOpen] = useState(false)

    useFocusEffect(
        useCallback(() => {
            if (firebaseAuth) {
                if (firebaseAuth.currentUser) {
                    const getCurrentUser = async () => {
                        const userData = await getUser(firebaseAuth.currentUser)
                        setCurrentUser(userData)
                    }
                    getCurrentUser()
                } else {
                    setCurrentUser(null)
                }
            }
        }, [firebaseAuth])
    )

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
    const parseDate = (dateStr) => parse(dateStr, "MM/dd/yyyy", new Date());
    const today = new Date();

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
                newRaceArray = newRaceArray.filter(race => 
                    isWithinInterval(parse(race.startDate, "MM/dd/yyyy", new Date()), { 
                        start: parse(startDate, "MM/dd/yyyy", new Date()), 
                        end: parse(endDate, "MM/dd/yyyy", new Date()) 
                    }) &&
                    isWithinInterval(parse(race.endDate, "MM/dd/yyyy", new Date()), { 
                        start: parse(startDate, "MM/dd/yyyy", new Date()), 
                        end: parse(endDate, "MM/dd/yyyy", new Date()) 
                    })
                )
            } 
            //if theres only a startDate filter for races that occur after the selected startDate
            else if (startDate) {
                newRaceArray = newRaceArray.filter(race => {

                    const raceDate = parse(race.startDate, "MM/dd/yyyy", new Date())
                    const filterDate = parse(startDate, "MM/dd/yyyy", new Date())

                    return isAfter(raceDate, filterDate) || isEqual(raceDate, filterDate)
                })
            } 
            //if theres only a endDate filter for races that occur before the selected startDate
            else if (endDate) {
                newRaceArray = newRaceArray.filter(race => {
                    const raceEndDate = parse(race.endDate, "MM/dd/yyyy", new Date())
                    const filterEndDate = parse(endDate, "MM/dd/yyyy", new Date())
                
                    return isBefore(raceEndDate, filterEndDate) || isEqual(raceEndDate, filterEndDate)
                })
            }

            //results vs ongoing results vs registration
            if (timeFilter === "upcoming") {
                newRaceArray = newRaceArray.filter(race => 
                    isAfter(parseDate(race.startDate), today) &&
                    isAfter(parseDate(race.endDate), today)
                );
            } 
            else if (timeFilter === "ongoing") {
                newRaceArray = newRaceArray.filter(race => 
                    isWithinInterval(today, { start: parseDate(race.startDate), end: parseDate(race.endDate) })
                );
            } 
            else if (timeFilter === "results") {
                newRaceArray = newRaceArray.filter(race => 
                    isBefore(parseDate(race.startDate), today) &&
                    isBefore(parseDate(race.endDate), today)
                );
            }

            setFilteredRaces(newRaceArray)
        }
    }, [decryptedRaces, raceTypeFilter, craftTypeFilter, distanceFilter, startDate, endDate, timeFilter, query])
    
    //get device height to be used in setting container dimension
    const ScreenHeight = Dimensions.get("window").height
    const ScreenWidth = Dimensions.get("window").width
    const styles = StyleSheet.create({
        mainContainer: {
            width: ScreenWidth,
            height: ScreenHeight,
            paddingBottom: 70
        },
        scrollView: {
            width: '100%'
        },
        contentContainerStyle: {
            alignItems: 'center'
        },
        filterButtonCon: {
            paddingLeft: '5%',
            paddingTop: 10,
            paddingBottom: 30,
            width: '100%'
        },
        button: {
            backgroundColor: '#09CAC7',
            width: '30%',
            paddingTop: 7,
            paddingLeft: 15,
            paddingBottom: 7,
            paddingRight: 15,
            borderRadius: 100,
            marginTop: 15
        },
        buttonText: {
            color: 'white',
            fontSize: 18,
            width: '100%',
            textAlign: 'center',
            fontWeight: '600'
        },
    })

  return (
    <>
        {filtersOpen &&
            <Modal animationType='slide' presentationStyle='pageSheet'>
                <Filters setFiltersOpen={setFiltersOpen} craftTypeFilter={craftTypeFilter} setCraftTypeFilter={setCraftTypeFilter} raceTypeFilter={raceTypeFilter} setRaceTypeFilter={setRaceTypeFilter} distanceFilter={distanceFilter} setDistanceFilter={setDistanceFilter} timeFilter={timeFilter} setTimeFilter={setTimeFilter} setQuery={setQuery} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate}/>
            </Modal>
        }
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainerStyle}>
                <RacesHero query={query} setQuery={setQuery}/>
                <View style={styles.filterButtonCon}>
                    <TouchableOpacity style={[styles.button, {display: 'flex', flexDirection: 'row', alignItems: 'center'}]} onPress={() => setFiltersOpen(true)}>
                        <Text style={styles.buttonText}>Filters <FontAwesomeIcon style={{marginLeft: 10}} color='white' icon={faBars}/></Text>
                    </TouchableOpacity>
                </View>
                <RaceList races={filteredRaces} currentUser={currentUser} racePageFilter={timeFilter}/>
            </ScrollView>
        </View>
    </>
  )
}

export default RacesMain