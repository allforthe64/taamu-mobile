import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'

//localSearchParams import
import { useLocalSearchParams } from 'expo-router'

//component imports
import Hero from '../components/racerPage/Hero'

const RacerPage = () => {

    const {racer} = useLocalSearchParams()

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

    useEffect(() => {
      const getRacerData = async () => {
        console.log('running getRacerData')
        const racerDataObj = await getRacerData({uid: racer})
        setRacerData(racerDataObj)
      }
      getRacerData()
    }, [])

    console.log('racerData: ', racerData)

  return (
    <View style={styles.mainContainer}>
      {racerData &&
        <ScrollView>
          <Hero pfpRAW={racerData.pfp}/>
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