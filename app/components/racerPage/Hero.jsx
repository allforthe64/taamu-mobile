import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
/* import { getDownloadableURL } from '../../firebase/storage' */

//encryption imports
import { getKey } from '../../firebase/firestore'

//expo Link component import
import { Link } from 'expo-router'

//component imports
import EditProfile from './EditProfile';

const Hero = ({pfpRAW, racerData}) => {
    
    //general state
    const [keyData, setKeyData] = useState({})
    const [openPFP, setOpenPFP] = useState(false)
    const [openEditProfile, setOpenEditProfile] = useState(false)

    //racer data state
    const [decipheredDisplayName, setDecipheredDisplayName] = useState('')
    const [decipheredGender, setDecipheredGender] = useState('')
    const [decipheredEmail, setDecipheredEmail] = useState('')
    const [decipheredPhone, setDecipheredPhone] = useState('')
    const [pfpURL, setPFPURL] = useState('')

    useEffect(() => {
        if (pfpRAW) {
            const getPFPURL = async () => {
                alert('running pfp url')
                const downloadedPFPURL = await getDownloadableURL(pfpRAW)
                setPFPURL(downloadedPFPURL)
            }
            getPFPURL()
        } 
    }, [pfpRAW])

    useEffect(() => {
        const getKeyData = async () => {
            const keyDataObj = await getKey('2L5AoMJxKYqiPuSERhul7wFBO')
            setKeyData(keyDataObj)
        }
        getKeyData()
    }, [])

    console.log('keyData: ', keyData)
    console.log('racerData: ', racerData)
    console.log(pfpURL)

    


    //get device height to be used in setting container dimension
    const ScreenHeight = Dimensions.get("window").height

    //styles
    const styles = StyleSheet.create({
        mainContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        pfpContainer: {
            width: '90%',
            height: ScreenHeight / 2.4,
            borderWidth: 1,
            borderColor: 'black',
            marginTop: '10%',
            borderRadius: 25
        },
        pfp: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 25
        },
        racerDataContainer: {
            width: '100%',
            borderWidth: 1,
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '5%'
        },
        displayName: {
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
        label: {
            color: '#09CAC7',
            fontWeight: '600',
            fontSize: 20,
            marginTop: 15
        },
        bioText: {
            color: 'white',
            fontWeight: '400',
            fontSize: 18,
            marginTop: 10,
            marginLeft: 5
        },
        categoriesContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingLeft: 10,
            paddingTop: 5
        },
        cat: {
            color: 'white',
            marginLeft: 10,
            fontSize: 18,
            fontWeight: '400'
        },
        link: {
            color: 'white',
            fontWeight: '400',
            fontSize: 18,
            marginTop: 10,
            
        },
        buttonContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '10%'
        },

    })

    console.log(openPFP)

  return (
    <View style={styles.mainContainer}>

        {/* <Modal animationType='slide' visible={openEditProfile} presentationStyle='pageSheet' supportedOrientations={['portrait']}>
            <EditProfile setOpenEditProfile={setOpenEditProfile} decipheredFName={decipheredDisplayName.split(' ')[0]} decipheredLName={decipheredDisplayName.split(' ')[1]} decipheredEmail={decipheredEmail} decipheredPhone={decipheredPhone} phoneAreaCode={racerData.phone.split(' ')[0]} incomingBio={racerData.bio} externalLinks={racerData.contactLinks} craftCategories={racerData.craftCategories} racerData={racerData} keyData={keyData}/>
        </Modal> */}

        <View style={styles.pfpContainer}>
            <Image style={styles.pfp} source={{ uri: pfpURL }}/>
        </View>
        
    </View>
  )
}

export default Hero