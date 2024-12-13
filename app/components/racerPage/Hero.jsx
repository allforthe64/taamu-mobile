import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
/* import { getDownloadableURL } from '../../firebase/storage' */

//encryption imports
import { getKey } from '../../firebase/firestore'

//expo Link component import
import { Link } from 'expo-router'

//component imports
import EditProfile from './EditProfile';

const Hero = ({racerData}) => {
    
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
        if (racerData) {
            const getPFPURL = async () => {
                alert('running pfp url')
                const downloadedPFPURL = await getDownloadableURL(racerData.pfp)
                setPFPURL(downloadedPFPURL)
            }
            getPFPURL()
        } 
    }, [racerData])

    useEffect(() => {
        const getKeyData = async () => {
            const keyDataObj = await getKey('2L5AoMJxKYqiPuSERhul7wFBO')
            setKeyData(keyDataObj)
        }
        getKeyData()
    }, [])

    useEffect(() => {
        if (racerData && keyData) {
            try {
                const operationDetachment = async () => {
                    const url = 'https://tuarolife.com/api/cU5hF0mLrS7wyiRIIJ58'; // Replace with your API URL
                    const payload = [racerData.fName, racerData.lName, racerData.gender, racerData.email, racerData.phone.split(' ')[1]]
                    const key = keyData.key /* '84f863ea1090484b804f4ac1bc12b677' */
                    const iv = keyData.iv /* 'a4c3a43d571b53a3' */
    
                    try {
                        const response = await fetch(url, {
                        method: 'POST', // Specifies the request method
                        headers: {
                            'Content-Type': 'application/json', // Sets the request body as JSON
                            'Authorization': 'Bearer your-token', // Optional: Add an authorization token if needed
                        },
                        body: JSON.stringify({payload: payload, key: key, iv: iv}), // Converts the payload to JSON string
                        });
    
                        // Check if the response was successful
                        if (response.ok) {
                            const data = await response.json(); // Parse JSON response
                            console.log(data)
    
                            //set the deciphered display name
                            setDecipheredDisplayName(data.data[0] + ' ' + data.data[1])
    
                            //set the deciphered gender
                            setDecipheredGender(data.data[2])
    
                            //set the deciphered email
                            setDecipheredEmail(data.data[3])
    
                            //set the deciphered phone
                            setDecipheredPhone(data.data[4])
                        } else {
                        console.error('Failed to send data:', response.status);
                        }
                    } catch (error) {
                        console.error('Error sending POST request:', error);
                    }
                }
                operationDetachment()
            }
            catch (err) {
                console.log('err within decipher function: ', err)
            }
        }
    }, [])


    console.log('keyData: ', keyData)
    console.log('racerData: ', racerData)
    console.log('pfpURL: ', pfpURL)

    


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

        <Modal animationType='slide' visible={openEditProfile} presentationStyle='pageSheet' supportedOrientations={['portrait']}>
            <EditProfile setOpenEditProfile={setOpenEditProfile} decipheredFName={decipheredDisplayName.split(' ')[0]} decipheredLName={decipheredDisplayName.split(' ')[1]} decipheredEmail={decipheredEmail} decipheredPhone={decipheredPhone} phoneAreaCode={racerData.phone.split(' ')[0]} incomingBio={racerData.bio} externalLinks={racerData.contactLinks} craftCategories={racerData.craftCategories} racerData={racerData} keyData={keyData}/>
        </Modal>

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
            <Text style={styles.label}>Gender: <Text style={{color: 'white'}}>{decipheredGender === 'm' ? 'Male' : decipheredGender === 'f' ? 'female' : decipheredGender}</Text></Text>
            <Text style={styles.label}>Craft Categories:</Text>
            <View style={styles.categoriesContainer}>
                {racerData.craftCategories.map((cat) => <Text key={cat} style={styles.cat}>{cat}</Text>)}
            </View>
            <Text style={styles.label}>External links/contacts:</Text>
            {racerData.contactLinks.map((link) => <Link href={link} key={link} style={styles.link} numberOfLines={1}>{link}</Link>)}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setOpenPFP(true)}>
                    <Text style={styles.buttonText}>Update profile picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setOpenEditProfile(true)}>
                    <Text style={styles.buttonText}>Edit profile</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    </View>
  )
}

export default Hero