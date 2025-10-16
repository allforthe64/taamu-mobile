import { Pressable, StyleSheet, Dimensions, View, Image, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

//fontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const PhotoGallery = ({ photos }) => {

    const [focusedPhoto, setFocusedPhoto] = useState()

    //get device height to be used in setting container dimension
    const ScreenHeight = Dimensions.get("window").height

    //styles
    const styles = StyleSheet.create({
        mainContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
        pressableContainer: {
            width: '100%',
            height: (ScreenHeight / 10) * 4
        },
        racePhoto: {
            'width': '100%',
            height: '100%',
            objectFit: 'cover'
        },
        mainModalContainer: {
            width: '100%',
            height: ScreenHeight,
            backgroundColor: '#01354B',
            paddingTop: '10%'
        },
        xMarkContainer: {
            width: '100%',
            paddingRight: '5%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        image: {
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
        },
        imageContainer: {
            width: '100%',
            height: '80%', 
            marginTop: '10%'
        },
        expandedImage: {
            width: '100%', 
            height: '100%', 
            objectFit: 'contain'
        }
    })

  return (
    <>
        {focusedPhoto &&
            <Modal animationType='slide' presentationStyle='pageSheet'>
                <View style={styles.mainModalContainer}>
                    <View style={styles.xMarkContainer}>
                        <TouchableOpacity onPress={() => setFocusedPhoto(null)}>
                            <FontAwesomeIcon icon={faXmark} color={'white'} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={imageContainer}>
                        <ReactNativeZoomableView
                            maxZoom={10}
                            minZoom={1}
                            zoomStep={.5}
                            initialZoom={1}
                            bindToBorders={true}
                            captureEvent={true}
                        >
                            <Image source={{uri: `${fileURL}`}} style={styles.expandedImage}/>
                        </ReactNativeZoomableView>
                    </View>
                </View>
            </Modal>
        }
        <View style={styles.mainContainer}>
            {
                //map over array of photoUrls and display a photo for each
                photos.map((photo, i) => {
                    return (
                        <Pressable style={styles.pressableContainer} onPress={() => setFocusedPhoto(photo)} key={i}>
                            <Image style={styles.image} source={{ uri: photo }}/>
                        </Pressable>
                    )
                })
            }
        </View>
    </>
  )
}

export default PhotoGallery