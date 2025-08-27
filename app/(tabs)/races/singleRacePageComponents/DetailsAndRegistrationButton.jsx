import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component, useCallback } from 'react'

//date-fns import
import { format } from 'date-fns'

//getDownloadableURL import from firebase storage function
import { getDownloadableURL } from '../../../firebase/storage'
import { useFocusEffect } from 'expo-router'

export const DetailsAndRegistrationButton = ({desc, startTimes, endTimes, raceData}) => {
    //initialize state to hold start and end times
    const [adjStartTimes, setAdjStartTimes] = useState([])
    const [adjEndTimes, setAdjEndTimes] = useState([])
    const [waiverLinks, setWaiverLinks] = useState([])

    //map over times and convert from military time to standard time
    useFocusEffect(
        useCallback(() => {

            let adjTime = []
            let adjEndTime = []

            if (startTimes) {
                startTimes.forEach(startTime => {
                    if (Number(startTime.split(':')[0]) === 24) {
                        adjTime.push({text: '12:' + + startTime.split(':')[1], dayPart: ' AM'})
                    } else if (Number(startTime.split(':')[0]) === 12) {
                        adjTime.push({text: '12:' + + startTime.split(':')[1], dayPart: ' PM'})
                    } else if (Number(startTime.split('.')[0]) % 12 > 12) {
                        adjTime.push({text: `${Number(startTime.split(':')[0]) % 12}:` + startTime.split(':')[1], dayPart: 'PM'})
                    } else {
                        adjTime.push({text: `${Number(startTime.split(':')[0]) % 12}:` + startTime.split(':')[1], dayPart: ' AM'})
                    }
                })
            }

            if (endTimes) {
                endTimes.forEach(endTime => {
                    if (Number(endTime.split(':')[0]) === 24) {
                    adjEndTime.push({text: '12:' + endTime.split(':')[1], dayPart: ' AM'})
                    } else if (Number(endTime.split(':')[0]) === 12) {
                    adjEndTime.push({text: '12:' + endTime.split(':')[1], dayPart: ' PM'})
                    } else if (Number(endTime.split(':')[0]) > 12) {
                    adjEndTime.push({text: `${Number(endTime.split(':')[0]) % 12}:` + endTime.split(':')[1], dayPart: ' PM'})
                    } else {
                    adjEndTime.push({text: `${Number(endTime.split(':')[0]) % 12}:` + endTime.split(':')[1], dayPart: ' AM'})
                    }
                })
            }

            setAdjStartTimes(adjTime)
            setAdjEndTimes(adjEndTime)

        }, [])
    )

    //map over waivers and get the download urls
    useFocusEffect(
        useCallback(() => {
            if (raceData && raceData !== 'does not exist') {
            const getWaiverLinks = async () => {
                const waivers = await Promise.all(raceData.waiversToDisplayOnRacePage.map(async waiver => {
                const waiverLink = await getDownloadableURL(waiver.link)
                return {name: waiver.fileName, link: waiverLink}
                }))
                setWaiverLinks(waivers)
            }
            getWaiverLinks()
            }
        }, [raceData])
    )

    //create date object to hold the current date
    const currentDate = format(new Date(), 'MM/dd/yyyy')

    //download the waiver
    const downloadWaiver = (waiver) => {

    }

    return (
        <>
            {raceData &&
                <>
                    <View style={styles.mainContainer}>
                        <Text style={styles.headings}>Race details:</Text>
                        <Text style={styles.description}>{desc}</Text>
                        {waiverLinks.length > 0 && raceData.waiversHandledOnSoftware &&
                            <>
                                <Text style={[styles.headings, {marginTop: 20}]}>Download waivers:</Text>
                                <View style={styles.waiverContainer}>
                                    {waiverLinks.map((waiver, i) => {
                                        return (
                                            <TouchableOpacity key={i} onPress={() => downloadWaiver(waiver)}>
                                                <Text style={styles.waiverText}>{waiver.text}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>   
                            </>
                        }
                        <Text style={[styles.headings, {marginTop: 20}]}>Start and end times by day:</Text>
                        <View style={styles.timesContainer}>
                            {adjStartTimes.map((time, i) => {
                                return (
                                    <View key={i}>
                                        <Text style={styles.timeText}>Day {i + 1} Start time: {time.text}{time.dayPart}</Text>
                                        <Text style={styles.timeText}>Day {i + 1} end time: {adjEndTimes[i].text}{adjEndTimes[i].dayPart}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </>   
            }
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingLeft: '4.25%',
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    headings: {
        color: "#09CAC7",
        fontWeight: '600',
        fontSize: 25
    },
    description: {
        color: 'white',
        fontSize: 18
    },
    waiverContainer: {
        width: '90%'
    },
    waiverText: {
        color: 'white',
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    timesContainer: {
        width: '90%'
    },
    timeText: {

    }
})