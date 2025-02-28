import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Modal, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

//FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

//expo image picker import
import * as ImagePicker from 'expo-image-picker'

//firebase imports
import { uploadImage } from '../../firebase/storage'
import { updateUser } from '../../firebase/firestore'

const PhotoGallery = ({ currentUser, galleryURLs, racerId, removeFromGallery, racerData }) => {

    //initialize state for loading
    const [isLoading, setIsLoading] = useState(false)

    //handle selecting new images from the gallery
    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            quality: 1
        })

        //upload the images into the user's photo gallery
        if (!result.canceled) {

            setIsLoading(true)

            const newImageURLs = await Promise.all(result.assets.map(async asset => {
                const result = await uploadImage(asset, currentUser.uid)
                return `gs://${result.metadata.bucket}/${result.metadata.fullPath}`
            }))

            const newUserObject = {
                ...racerData,
                photos: [...racerData.photos, ...newImageURLs],
                uid: racerId
            }
            await updateUser(newUserObject)

            setIsLoading(false)
        }
    }

    //get device height to be used in setting container dimension
    const ScreenHeight = Dimensions.get("window").height
    const styles = StyleSheet.create({
        mainContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        mainHeading: {
            fontSize: 30,
            fontWeight: '600',
            color: '#09CAC7',
            width: '100%',
            textAlign: 'center'
        },
        galleryButtonCon: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 15,
            paddingLeft: '5%',
            paddingRight: '5%'
        },
        addPhotosHeading: {
            fontSize: 20,
            fontWeight: '600',
            color: '#09CAC7'
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
        galleryContainer: {
            width: '100%',
            paddingTop: 20
        },
        photoContainer: {
            width: '100%',
            height: (ScreenHeight / 10) * 4
        },
        photo: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        xMarkContainer: {
            width: '100%',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: '5%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        loadingContainer: {
            width: '100%',
            height: ScreenHeight,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        loadingText: {
            fontSize: 30,
            color: '#09CAC7',
            fontWeight: '600',
            marginLeft: 20
        }
    })

  return (
    <View style={styles.mainContainer}>
        <Modal animationType='slide' visible={isLoading} presentationStyle='pageSheet' supportedOrientations={['portrait']}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator color={'#09CAC7'}/>
                <Text style={styles.loadingText}>Loading</Text>
            </View>
        </Modal>
        <Text style={styles.mainHeading}>Photos:</Text>
        {currentUser.uid === racerId &&
            <View style={styles.galleryButtonCon}>
                <Text style={styles.addPhotosHeading}>Add photos to your gallery:</Text>
                <TouchableOpacity style={styles.button} onPress={pickImages}>
                    <Text style={styles.buttonText}>Select Photos</Text>
                </TouchableOpacity>
            </View>
        }
        <View style={styles.galleryContainer}>
            {galleryURLs.map((galleryURL, i) => {
                if (currentUser && currentUser.uid === racerId) {
                    return (
                        <View style={{ width: '100%', marginTop: 15 }} key={i}>
                            <View style={styles.xMarkContainer}>
                                <TouchableOpacity onPress={() => removeFromGallery(galleryURL)}>
                                    <FontAwesomeIcon style={{ color: '#09CAC7'}} size={30} icon={faXmark}/>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.photoContainer}>
                                <Image source={{ uri: galleryURL }} style={styles.photo}/>
                            </TouchableOpacity>
                        </View>
                    )
                } else {
                    return (
                        <TouchableOpacity style={styles.photoContainer} key={i}>
                            <Image source={{ uri: galleryURL }} style={styles.photo}/>
                        </TouchableOpacity>
                    )
                }
            })}
        </View>
    </View>
  )
}

export default PhotoGallery