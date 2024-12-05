import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
/* import { getDownloadableURL } from '../../firebase/storage' */

//encryption imports
import { getKey } from '../../firebase/firestore'
import { Buffer } from 'buffer'
import { Link } from 'expo-router'

const Hero = ({pfpRAW, racerData}) => {

    const [pfpURL, setPFPURL] = useState('')
    const [keyData, setKeyData] = useState({})
    const [decipheredDisplayName, setDecipheredDisplayName] = useState('')

   /*  useEffect(() => {
        if (pfpRAW) {
            const getPFPURL = async () => {
                const downloadedPFPURL = await getDownloadableURL(pfpRAW)
                setPFPURL(downloadedPFPURL)
            }
            getPFPURL()
        } 
    }, [pfpRAW]) */

    useEffect(() => {
        if (racerData) {
            setDecipheredDisplayName(racerData.fName + ' ' + racerData.lName)
        }
    }, [racerData])

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

  return (
    <View style={styles.mainContainer}>
        <View style={styles.pfpContainer}>
            <Image style={styles.pfp} source={{ uri: pfpURL }}/>
        </View>
        <View style={styles.racerDataContainer}>
            {racerData.captain || racerData.coach ?
                <></>
            :
                <Text style={styles.displayName}>{decipheredDisplayName}</Text>
            }
            <Text style={styles.label}>Current account type: <Text style={{color: 'white'}}>{racerData.role === 'racer' && !racerData.captain ? /* (language === "fr" ? "Individuel" : */ 'Individual'/* ) */ : racerData.captain ? /* (language === "fr" ? "Capitaine d'Equipe" : */ 'Team captain'/* ) */ : racerData.role === 'coach' ? /* (language === "fr" ? "Entraîneur" : */ 'Coach'/* ) */ : ''}</Text></Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Change Account Type</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Bio:</Text>
            <Text style={styles.bioText}>{racerData.bio}</Text>
            <Text style={styles.label}>Age Category: <Text style={{color: 'white'}}>{racerData.ageCategory}</Text></Text>
            <Text style={styles.label}>Gender: <Text style={{color: 'white'}}>{racerData.gender === 'm' ? 'Male' : racerData.gender === 'f' ? 'female' : racerData.gender}</Text></Text>
            <Text style={styles.label}>Craft Categories:</Text>
            <View style={styles.categoriesContainer}>
                {racerData.craftCategories.map((cat) => <Text key={cat} style={styles.cat}>{cat}</Text>)}
            </View>
            <Text style={styles.label}>External links/contacts:</Text>
            {racerData.contactLinks.map((link) => <Link href={link} key={link} style={styles.link} numberOfLines={1}>{link}</Link>)}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Update profile picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Edit profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default Hero