import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDownloadableURL } from '../../firebase/storage'
import { Link } from 'expo-router'

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

  return (
    <View style={styles.raceCardContainer}>
      <View style={styles.raceCardImageContainer}>
        <Image style={styles.raceCardImage} source={{ uri: cardImage }}/>
      </View>
      {raceData &&
        <>
          <Text style={styles.raceTitle}>{raceData.title}</Text>
          <Link style={styles.orgName} href={`/organizer/${raceData.creator}`}>{raceData.orgName}</Link>
        </>
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
    alignItems: 'center'
  },
  raceCardImageContainer: {
    width: '100%',
    height: 250
  },
  raceCardImage: {
    flex: 1
  },
  raceTitle: {
    color: '#09CAC7',
    fontSize: 40,
    fontWeight: '600',
    marginTop: 10
  },
  orgName: {
    fontSize: 30,
    color: 'white',
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    marginTop: 6
  }
})