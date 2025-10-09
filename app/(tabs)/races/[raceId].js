import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'

import { useFocusEffect, useRouter } from 'expo-router'

//import useLocalSearchParams hook
import { useLocalSearchParams } from 'expo-router'

import { AuthContext } from '../../firebase/authContext'

import { getUser, resultsTableListener, singleRaceListener, getKey } from '../../firebase/firestore'
import { getDownloadableURL } from '../../firebase/storage'
import ThumbnailAndInfo from './singleRacePageComponents/ThumbnailAndInfo'
import DetailsAndRegistrationButton from './singleRacePageComponents/DetailsAndRegistrationButton'

const RacePage = () => {

  //initialize state
  const [race, setRace] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [photoGalleryURLs, setPhotoGalleryURLs] = useState([])
  const [organizer, setOrganizer] = useState()
  const [registrationWindowOpen, setRegistrationWindowOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const [results, setResults] = useState()
  const [viewParticipants, setViewParticipants] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [keyData, setKeyData] = useState()

  //get raceId
  const { raceId } = useLocalSearchParams()

  //const authUser context
  const { authUser } = useContext(AuthContext)

  //instantiate router object
  const router = useRouter()

  //call docSnap listener to pull data for the race (id passed through url params)
  //call docSnap listener to pull results data for this race
  useFocusEffect(
    useCallback(() => {
      const getRaceData = async () => {
        const unsubscribe = await singleRaceListener(raceId, setRace)
        return () => unsubscribe()
      }
      getRaceData()

      const getResultsData = async () => {
        const unsubscribe = await resultsTableListener(raceId, setResults, true)
        return () => unsubscribe()
      }
      getResultsData()
    }, [])
  )

  //grab downloadable urls for the thumbnail and photo gallery/pull organizer data
  useFocusEffect(
    useCallback(() => {
      if (race) {
        if (race === 'does not exist') {
          setRedirecting(true)
          setTimeout(() => {
            router.push('/races')
          }, 2000)
        } else {
          //get the thumbnail url
          const getThumbnailURL = async () => {
            const thumbnailURL = await getDownloadableURL(race.thumbNail)
            setThumbnail(thumbnailURL)
          }

          //map over photo gallery urls and get the downloadable url from each
          const getPhotoGalleryURLs = async () => {
            const galleryURLs = await Promise.all(race.photos.map(async url => {
              const photoURL = await getDownloadableURL(url)
              return photoURL
            }))
            setPhotoGalleryURLs(galleryURLs)
          }

          //use getUser function to pull race organizer data
          const getOrganizer = async () => {
            const organizerData = await getUser({uid: race.creator})
            setOrganizer(organizerData)
          }

          //call functions
          if (race.thumbNail) {
            getThumbnailURL()
          }
          
          if (race.photos.length > 0) {
            getPhotoGalleryURLs()
          }
          
          getOrganizer()
        }
      }
    }, [race])
  )

  //get the current user from firebase
  useFocusEffect(
    useCallback(() => {
      if (authUser) {

        //call getUser with the authUser object
        const getUserData = async () => {
          const userData = await getUser(authUser)
          setCurrentUser(userData)
        }

        //call function
        getUserData()
      }
    }, [ authUser ])
  )

  //grab keyData
  useFocusEffect(
      useCallback(() => {
          const getKeyData = async () => {
              const keyDataObj = await getKey('2L5AoMJxKYqiPuSERhul7wFBO')
              setKeyData(keyDataObj)
          }
          getKeyData()
      }, [])
  )

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <ThumbnailAndInfo thumbnailURL={thumbnail} raceData={race} organizerData={organizer} setRegistrationWindowOpen={setRegistrationWindowOpen} currentUser={currentUser} raceId={raceId} setViewParticipants={setViewParticipants} keyData={keyData}/>
        {/* <DetailsAndRegistrationButton desc={race?.description} currentUser={currentUser} startTimes={race?.startTimes} endTimes={race?.endTimes} setRegistrationWindowOpen={setRegistrationWindowOpen} raceData={race}/> */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: '#01354B',
    flex: 1
  }
})

export default RacePage