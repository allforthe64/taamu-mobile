import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useFocusEffect, useRouter } from 'expo-router'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'

const ThumbnailAndInfo = ({ thumbnailURL, raceData, organizerData, setRegistrationWindowOpen, currentUser, raceId, setViewParticipants, keyData }) => {

    //initialize state
    const [decipheredOrgName, setDecipheredOrgName] = useState('')

    //instantiate router object
    const router = useRouter()

    //create a current date object
    const currentDate = format(new Date(), 'MM/dd/yyyy')

    
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
    
    //get device height to be used in setting container dimension
    const ScreenHeight = Dimensions.get("window").height

    const styles = StyleSheet.create({
        mainContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        thumbnailContainer: {
            width: '90%',
            height: ScreenHeight / 2.4,
            marginTop: '10%',
            borderRadius: 25
        },
        thumbnail: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 25
        },
        raceDataContainer: {
            width: '100%',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '5%'
        },
        raceTitle: {
            color: '#09CAC7',
            fontWeight: '600',
            fontSize: 20
        },
        button: {
            backgroundColor: '#09CAC7',
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
        buttonTextLarge: {
            color: 'white',
            fontSize: 22,
            width: '100%',
            textAlign: 'center',
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
        categoryText: {
            color: 'white',
            fontWeight: '600',
            fontSize: 16
        },
        organizerLink: {
            color: 'white',
            fontWeight: '600',
            fontSize: 18,
            marginTop: 15,
            textDecorationLine: 'underline'
        },
        categoriesAndDistancesContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8
        },
        buttonContainer1: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15
        },
        buttonContainer2: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20
        },
        externalLinkText: {
            color: 'white',
            fontWeight: '600',
            fontSize: 14
        },
        externalLinkContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row'
        }
    })

    //handle a link press
    const handlePress = async (url) => {
        //test if a link can be opened
        const supported = await Linking.canOpenURL(url)
    
        if (supported) {
            await Linking.openURL(url)
        } else {
            alert(`Unable to open external link: ${url}`)
        }
    }

  return (
    <>
        {raceData &&
            <View style={styles.mainContainer}>
        
                <View style={styles.thumbnailContainer}>
                    <Image style={styles.thumbnail} source={{ uri: thumbnailURL }}/>
                </View>

                <View style={styles.raceDataContainer}>
                    <Text style={styles.raceTitle}>{raceData?.title}</Text>
                    <Link href={`/organizer/${raceData?.creator}`} style={styles.organizerLink}>{decipheredOrgName}</Link>
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
                    <View style={styles.buttonContainer1}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>View participants</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Links to external rescources:</Text>
                    <View style={styles.categoriesAndDistancesContainer}>
                        {raceData.externalLinks.length > 0 &&
                            raceData.externalLinks.map((externalLink, i) => {
                                return (
                                    <View style={styles.externalLinkContainer} key={i}>
                                        <Text style={styles.externalLinkText}>{'\u2022'}</Text>
                                        <TouchableOpacity onPress={() => handlePress(externalLink)}>
                                            <Text style={[styles.externalLinkText, {textDecorationLine: 'underline', marginLeft: 5}]}numberOfLines={1} 
                                            ellipsizeMode="tail" >
                                                {externalLink}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>
                    
                    {new Date(currentDate) < new Date(raceData.closeDate) &&
                        <View style={styles.buttonContainer2}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonTextLarge}>Register for this race</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

            </View>
        }
    </>
  )
}

export default ThumbnailAndInfo