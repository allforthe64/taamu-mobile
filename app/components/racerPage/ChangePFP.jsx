import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

//fontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

//expo image picker import
import * as ImagePicker from 'expo-image-picker'

//import uploadImage function/updateUser function
import { uploadImage } from '../../firebase/storage'
import { updateUser } from '../../firebase/firestore'

const ChangePFP = ({setOpenPFP, racerData}) => {

    const [newPFPUrl, setNewPFPUrl] = useState('')

    //select an image from the phone using expo image picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!result.canceled) {
            setNewPFPUrl(result.assets[0].uri)
        }
    }

    //upload new profile picture and update user
    const updatePFP = async () => {
        //if the pfp is still a default, upload the new one and change the url held in firestore
        if (racerData.pfp === 'gs://areregsoft.appspot.com/default_pfp.png') {
            
            //upload the new image and set the new path
            const result = await uploadImage(newPFPUrl, racerData.uid)

            //create a new racer data object
            const newRacerData = {
                ...racerData,
                pfp: `gs://${result.metadata.bucket}/${result.metadata.fullPath}`
            }

            //update the existing racer's data
            await updateUser(newRacerData)
            setOpenPFP(false)

        } 
        //if pfp has already been changed, remove the existing pfp, upload the new one, replace the url within the racer data structure
        else {

            //delete the current pfp
            deleteFile(racerData.pfp)
            
            //upload the new image and set the new path
            const result = await uploadImage(newPFPUrl, racerData.uid)

            //create a new racerData object
            const newRacerData = {
                ...racerData,
                pfp: `gs://${result.metadata.bucket}/${result.metadata.fullPath}`,
                uid: racerId
            }

            //update the existing racer's data
            await updateUser(newRacerData)
            setOpenPFP(false)

        }
    }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.xMarkContainer}>
        <TouchableOpacity onPress={() => setOpenPFP(false)}>
            <FontAwesomeIcon icon={faXmark} color='white' size={40}/>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Replace <Text style={{color: '#09CAC7'}}>profile picture</Text></Text>
        <View style={styles.pfpContainer}>
            {newPFPUrl === '' ?
                <Text style={styles.noPFPSelected}>No new profile picture selected...</Text>
            :
                <Image source={{uri: newPFPUrl}} style={styles.newPFPImage}/>
            }
        </View>
        <TouchableOpacity style={[styles.button, {marginBottom: '2%'}]} onPress={pickImage}>
            <Text style={styles.buttonText}>Select a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={updatePFP} style={newPFPUrl === '' ? [styles.button, {opacity: .5}] : styles.button} disabled={newPFPUrl === '' ? true : false}>
            <Text style={styles.buttonText}>Upload new profile picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChangePFP

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#01354B'
    },
    xMarkContainer: {
        width: 'full',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: '5%',
        paddingRight: '5%'
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10%'
    },
    heading: {
        color: 'white',
        fontSize: 35,
        fontWeight: '600',
        marginBottom: '5%'
    },
    pfpContainer: {
        width: '90%',
        height: '50%',
        marginBottom: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noPFPSelected: {
        color: 'white',
        fontSize: 22
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
    newPFPImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
})