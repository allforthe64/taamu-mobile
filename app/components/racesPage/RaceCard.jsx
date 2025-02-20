import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

//import getDownloadableURL function
import { getDownloadableURL } from '../../firebase/storage'

//import Link component from expo-router
import { Link } from 'expo-router'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const RaceCard = ({ raceData, filter, currentUser, racePageFilter}) => {

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

//create racer buttons based on incoming filter value 
const racerButtonsArr = {
    'upcoming' : (
        <View style={styles.buttonContainer}>
          <Link href={`/races/${raceData.id}`} asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View this race</Text>
            </TouchableOpacity>
          </Link>
            {/* {window.location.pathname.split('/')[1] === 'racer' && window.location.pathname.split('/')[2] === currentUser?.uid &&
                <button onClick={() => setCancelRegistration(true)} className='text-white bg-red-600 border-2 border-transparent text-base max-sm:text-sm dosis-heavy px-4 rounded-full hover:scale-110 transition duration-200 ease-in-out ml-[3%]'>
                    <FontAwesomeIcon icon={faXmark} />
                    <span className='ml-2'>{cardTranslations.cancelRegistration[language]}</span>
                </button>
            } */}
        </View>
    ),
    'results' : (
        <Link href={`/races/${raceData.id}`} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Race Results</Text>
          </TouchableOpacity>
        </Link>
    )
    
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
          <Text style={styles.label}>Craft categories:</Text>
          <View style={styles.distanceAndCategoryContainer}>
            {raceData.craftCategories.map((cat, i) => {
              return (
                <Text key={i} style={styles.distanceAndCategoryText}>{cat}{isLastElement(raceData.craftCategories, cat) || raceData.craftCategories.length === 1 ? '' : ','}</Text>
              )
            })}
          </View>
        </View>
      }
      <View style={styles.buttonContainer}>
        {
          racerButtonsArr[filter === null ? racePageFilter : filter]
        }
      </View>
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
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 5,
    marginBottom: 40
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
    fontSize: 30,
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
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
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
})