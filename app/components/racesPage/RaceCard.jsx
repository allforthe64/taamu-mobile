import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

//import getDownloadableURL function
import { getDownloadableURL } from '../../firebase/storage'

//import Link component from expo-router
import { Link } from 'expo-router'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const RaceCard = ({ raceData }) => {

  //initialize state
  const [cardImage, setCardImage] = useState('')

  useEffect(() => {
    if (raceData) {
      const getRaceCardImage = async () => {
        const cardLink = await getDownloadableURL(raceData.thumbNail)
        setCardImage(cardLink)
      }
      getRaceCardImage()
    }
  }, [raceData])

  //define isLastElement function to determine whether or not to add a comma to a craft cat/distance tag
  const isLastElement = (array, element) => {
    // Check if the array is empty to handle edge cases
    if (array.length === 0) {
      return false; // No elements in the array
    }
  
    // Compare the last element with the provided element
    return array[array.length - 1] === element;
  } 

  return (
    <View style={styles.raceCardContainer}>
      <View style={styles.raceCardImageContainer}>
        <Image style={styles.raceCardImage} source={{ uri: cardImage }}/>
      </View>
      {raceData &&
        <View style={styles.raceDataContainer}>
          <Text style={styles.raceTitle}>{raceData.title}</Text>
          <Link style={styles.orgName} href={`/organizer/${raceData.creator}`}>{raceData.orgName}</Link>
          <Text style={styles.label}>Date: <Text style={styles.raceDataText}>{raceData.startDate} - {raceData.endDate}</Text></Text>
          <Text style={styles.label}>Location: <FontAwesomeIcon icon={faLocationDot} color='white'/> <Text style={styles.raceDataText}>{raceData.location}</Text></Text>
          <Text style={styles.label}>Race Type: <Text style={styles.raceDataText}>{raceData.raceType}</Text></Text>
          <Text style={styles.label}>Distance(s):</Text>
          <View style={styles.distanceAndCategoryContainer}>
            {raceData.raceEvents.map((raceEvent, i) => {
              return (
                <Text key={i} style={styles.distanceAndCategoryText}>{raceEvent.distance} {raceEvent.distanceMetric}{isLastElement(raceData.raceEvents, raceEvent) || raceData.raceEvents.length === 1 ? '' : ','}</Text>
              )
            })}
          </View>
          <Text style={styles.label}></Text>
          <View style={styles.distanceAndCategoryContainer}>
            {raceData.craftCategories.map((cat, i) => {
              return (
                <Text key={i} style={styles.distanceAndCategoryText}>{cat}{isLastElement(raceData.craftCategories, cat) || raceData.craftCategories.length === 1 ? '' : ','}</Text>
              )
            })}
          </View>
        </View>
      }
    </View>
  )
}

export default RaceCard

const styles = StyleSheet.create({
  raceCardContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40
  },
  raceCardImageContainer: {
    width: '100%',
    height: 250
  },
  raceCardImage: {
    flex: 1
  },
  raceDataContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  raceTitle: {
    color: '#09CAC7',
    fontSize: 40,
    fontWeight: '600',
    marginTop: 10,
    width: '100%',
    textAlign: 'left'
  },
  orgName: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    marginTop: 6,
    width: '100%',
    textAlign: 'left'
  },
  label: {
    fontSize: 16,
    color:'#09CAC7',
    width: '100%',
  },
  raceDataText: {
    fontSize: 16,
    color: 'white'
  },
  distanceAndCategoryContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    columnGap: 6,
    flexWrap: 'wrap',
    paddingLeft: 10
  },
  distanceAndCategoryText: {
    color: 'white',
    fontSize: 14
  }
})