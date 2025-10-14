import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'

//date-fns import
import { format } from 'date-fns'

//getDownloadableURL import from firebase storage function
import { useFocusEffect } from 'expo-router'
import { getDownloadableURL } from '../../../firebase/storage'

const DetailsAndRegistrationButton = ({desc, startTimes, endTimes, raceData}) => {
    //initialize state to hold start and end times
    const [adjStartTimes, setAdjStartTimes] = useState([])
    const [adjEndTimes, setAdjEndTimes] = useState([])
    const [waiverLinks, setWaiverLinks] = useState([])

    console.log('adjStartTimes: ', adjStartTimes)
    console.log('adjEndTimes: ', adjEndTimes)
    console.log('raceData: ', raceData)
    console.log('desc: ', desc)

    //convert time to 12 hour format
    const convertTo12Hour = (time) => {
        if (!time) return null

        let [hours, minutes] = time.split(":")
        hours = Number(hours);
        minutes = minutes.padStart(2, "0")

        let dayPart = hours >= 12 ? " PM" : " AM"
        let adjHour = hours % 12 || 12

        return { text: `${adjHour}:${minutes}`, dayPart }
    };

    //map over times and convert from military time to standard time
    useFocusEffect(
        useCallback(() => {

            if (startTimes) {
                setAdjStartTimes(startTimes.map(t => convertTo12Hour(t)))
            }

            if (endTimes) {
                setAdjEndTimes(endTimes.map(t => convertTo12Hour(t)))
            }

        }, [startTimes, endTimes])
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
        return false
    }

    return (
        <>
            {raceData && desc &&
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
                                                <Text style={styles.waiverText}>{waiver?.name}</Text>
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
                                        <Text style={styles.timeText}>Day {i + 1} Start time: {time?.text}{time?.dayPart}</Text>
                                        <Text style={styles.timeText}>Day {i + 1} end time: {adjEndTimes[i]?.text}{adjEndTimes[i]?.dayPart}</Text>
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

export default DetailsAndRegistrationButton

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingLeft: '4.25%',
        paddingTop: 75,
        paddingBottom: 75,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    headings: {
        color: "#09CAC7",
        fontWeight: '600',
        fontSize: 25,
        width: '100%',
        textAlign: 'left'
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
        fontSize: 18,
        color: 'white'
    }
})