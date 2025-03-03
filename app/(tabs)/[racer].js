import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import { useFocusEffect } from '@react-navigation/native'

//localSearchParams import
import { useLocalSearchParams } from 'expo-router'

//component imports
import Hero from '../components/racerPage/Hero'
import MyRaces from '../components/racerPage/MyRaces'
import PhotoGallery from '../components/racerPage/PhotoGallery'
import ManageCrews from '../components/racerPage/ManageCrews'


//firebase imports
import { getRace, singleUserListener, updateUser, getKey, getAllCrews } from '../firebase/firestore'
import { getDownloadableURL, deleteFile } from '../firebase/storage'
import { firebaseAuth } from '../firebaseConfig'

//
/* import { getUser } from '../firebase/firestore' */

const RacerPage = () => {

    /* const [racerData, setRacerData] = useState({ contactLinks: 
      [ 'https://www.instagram.com/r_d_outrigger/',
        'https://www.instagram.com/b_is_for_billiam/' ],
     gender: '31bbcb73ca9bee3bb1280e3ffb60bff1',
     DOB: '4ffee74ba1d456d2595beb4fae97ba21',
     email: 'ea620f5d238ec7edfa958adae48a5fc50e17bc90b00611fb2ea7489a687aa78b',
     captain: false,
     registeredFor: [ 'TGaWqjiX9fXvlztPCWTo' ],
     ageCategory: 'Open',
     lName: 'e143ca7ba9bb745db753eaf05d3f6523',
     bio: 'RDOutrigger 🏝️🌊🤙\nProfessional Wave Ridahs 😎 | #vaa #outrigger\nBattling Boat Feels Like Dookie Syndrome (BFLDS)\n🤧🤙🤙',
     role: 'racer',
     uid: 'xhX6FwzcSCMkGak0nnPTbapS0ik2',
     phone: '+1 fb415d4e671cb8ad624c6657a90998d7',
     coach: false,
     fName: '0985d1cc97346688386386464419838b',
     pfp: 'gs://areregsoft.appspot.com/xhX6FwzcSCMkGak0nnPTbapS0ik2/435739604_941299380908607_8170431772744954870_n.jpg.2024-11-14T14:46:54',
     countryOfOrigin: 'Canada',
     displayName: '0985d1cc97346688386386464419838b e143ca7ba9bb745db753eaf05d3f6523',
     crews: [],
     photos: 
      [ 'gs://areregsoft.appspot.com/xhX6FwzcSCMkGak0nnPTbapS0ik2/Screenshot (68).png.2024-11-15T13:18:57',
        'gs://areregsoft.appspot.com/xhX6FwzcSCMkGak0nnPTbapS0ik2/Screenshot (69).png.2024-11-15T13:18:58',
        'gs://areregsoft.appspot.com/xhX6FwzcSCMkGak0nnPTbapS0ik2/Screenshot (70).png.2024-11-15T13:18:59',
        'gs://areregsoft.appspot.com/xhX6FwzcSCMkGak0nnPTbapS0ik2/Screenshot (71).png.2024-11-15T13:19:00' ],
     craftCategories: [ 'V6', 'OC1', 'V1' ] }) */

  const [racerData, setRacerData] = useState()
  const [racerRaces, setRacerRaces] = useState([])
  const [galleryURLs, setGalleryURLs] = useState([])
  const [racerCrews, setRacerCrews] = useState([])
  const [keyData, setKeyData] = useState()

  //grab racer data
  useFocusEffect(
    useCallback(() => {
      if (firebaseAuth.currentUser.uid) {
        //activate single user listener based on the id passed through the url params
        const getRacerData = async () => {
          const unsubscribe = await singleUserListener(firebaseAuth.currentUser.uid, setRacerData)

          return () => unsubscribe()
        }
        getRacerData()

      }

    }, [firebaseAuth.currentUser.uid])
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

  useEffect(() => {
    if (racerData && keyData) {
      const getRacerRaces = async () => {
        const currentUserRaces = await Promise.all(racerData.registeredFor.map(async raceId => {
          const raceData = await getRace(raceId)
          return raceData
        }))
        setRacerRaces(currentUserRaces)
      }
      getRacerRaces()

      //get urls for photo gallery
      const getPhotoGalleryURLs = async () => {
        
        //map over urls and return the downloadable url
        const galleryDownloadLinks = await Promise.all(racerData.photos.map(async (url) => {return await getDownloadableURL(url)}))
        setGalleryURLs(galleryDownloadLinks) 
      }
      getPhotoGalleryURLs()

      const operationSigaba = async () => {

        const allCrews = await getAllCrews()

        const url = 'https://tuarolife.com/api/NSC4dp2m8SgzjOhrIybA'
        const payload = racerData.crews
        const key = keyData.key
        const iv = keyData.iv

        try {
          const response = await fetch(url, {
          method: 'POST', // Specifies the request method
          headers: {
              'Content-Type': 'application/json', // Sets the request body as JSON
          },
          body: JSON.stringify({payload: payload, allCrews: allCrews, key: key, iv: iv}), // Converts the payload to JSON string
          });

          // Check if the response was successful
          if (response.ok) {
              const data = await response.json();
              console.log('data: ', data)
              //set the deciphered display name
              setRacerCrews(data.data)
          } else {
            console.error('Failed to send data:', response.status);
          }
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
      }
      operationSigaba()
    }
  }, [racerData, keyData])

  //remove a photo from org gallery
  const removeFromGallery = async (input) => {

      try {
        //get the index of the photo gallery url/find the actual path url in orgData photos
        const photoIndex = galleryURLs.indexOf(input)
        const rawURL = racerData.photos[photoIndex]
        
        console.log('photoIndex: ', photoIndex)
        console.log('rawURL: ', rawURL)

        //delete the photo from storage
        deleteFile(racerData.photos[photoIndex])

        //create the new orgData photos array
        const newGalleryArray = racerData.photos.filter(url => url !== rawURL)

        //filter out the galleryUrls
        setGalleryURLs(prev => prev.filter(url => url !== input))

        //update org data
        const newRacerData = {
            ...racerData,
            photos: newGalleryArray,
            uid: racerData.uid
        }
        await updateUser(newRacerData)
      } catch (err) {
        console.log('error: ', err)
      }
  }

  return (
    <View style={styles.mainContainer}>
      {racerData && firebaseAuth &&
        <ScrollView>
          <Hero racerData={racerData} keyData={keyData}/>
          <ManageCrews crews={racerCrews}/>
          <MyRaces races={racerRaces}/>
          <PhotoGallery currentUser={firebaseAuth.currentUser} galleryURLs={galleryURLs} racerId={racerData.uid} removeFromGallery={removeFromGallery} racerData={racerData}/>
        </ScrollView>
      }
    </View>
  )
}

export default RacerPage

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: '#01354B',
    flex: 1
  }
})