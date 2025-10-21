import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const RegistrationComponentRaceInfo = ({ keyData, organizerData, raceData }) => {

    //state to hold deciphered orgName
    const [decipheredOrgName, setDecipheredOrgName] = useState()

    //decipher org information
    useFocusEffect(useCallback(() => {
        if (organizerData && keyData) {
            //decipher orgName
            try {
                const url = 'https://tuarolife.com/api/cU5hF0mLrS7wyiRIIJ58'
                const payload = [organizerData.orgName]
                const key = keyData.key
                const iv = keyData.iv

                const operationCodeNo1 = async () => {
                    try {
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({payload: payload, key: key, iv: iv})
                        })

                        //check if the response was successful
                        if (response.ok) {
                            const data = await response.json()

                            //set state
                            setDecipheredOrgName(data.data[0])
                        } else {
                            console.error('Failed to send data:', response.status);
                        }
                    } catch (error) {
                        console.error('Error sending POST request:', error)
                    }
                }
                operationCodeNo1()
            } catch (error) {
                console.log('err within decipher function: ', error)
            }
        }
    }, [organizerData, keyData]))

  return (
    <View style={styles.mainContainer}>
        <Text style={styles.titleText}>{raceData.title}</Text>
        <Text style={styles.raceDataText}>{decipheredOrgName}</Text>
        <Text style={styles.label}>Dates: <Text style={styles.raceDataTextNoMargin}>{raceData.startDate} - {raceData.endDate}</Text></Text>
        <Text style={styles.label}>Location: <Text style={styles.raceDataTextNoMargin}>{raceData.location}</Text></Text>
        <Text style={styles.label}>Race type: <Text style={styles.raceDataTextNoMargin}>{raceData.raceType}</Text></Text>
        <Text style={styles.label}>Distances:</Text>
        <View style={styles.categoriesAndDistancesContainer}>
            {raceData.raceEvents.map((ev, i) => {
                //map over events to display distances (if element is last in list, don't display comma)
                return (
                    <Text style={styles.categoryText} key={i}>{ev.distance}{ev.distanceMetric}{raceData.raceEvents.indexOf(ev) !== raceData.raceEvents.length - 1 ? ',' : ''}</Text>
                )
            })}
        </View>
        <Text style={styles.label}>Craft categories:</Text>
        <View style={styles.categoriesAndDistancesContainer}>
            {raceData.craftCategories.map((cat, i) => {
                //map over craft categories and display (if element is last in list don't show comma)
                return (
                    <Text style={styles.categoryText} key={i}>{cat}{raceData.craftCategories.indexOf(cat) !== raceData.craftCategories.length - 1 ? ',' : ''}</Text>
                )
            })}
        </View>
        <Text style={styles.label}>Participants: <Text style={styles.raceDataTextNoMargin}>{raceData.participants.length} <FontAwesomeIcon color='white' icon={faPerson} /></Text></Text>
    </View>
  )
}

export default RegistrationComponentRaceInfo

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    titleText: {
        color: '#09CAC7',
        fontSize: 20,
        fontWeight: '600'
    },
    label: {
        color: '#09CAC7',
        fontWeight: '600',
        fontSize: 20,
        marginTop: 15
    },
    raceDataText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginTop: 15
    },
    raceDataTextNoMargin: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18
    },
    categoriesAndDistancesContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    categoryText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    },
})