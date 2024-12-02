import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDownloadableURL } from '../../firebase/storage'

const Hero = ({pfpRAW}) => {

    const [pfpURL, setPFPURL] = useState('')

    useEffect(() => {
        if (pfpRAW) {
            const getPFPURL = async () => {
                const downloadedPFPURL = await getDownloadableURL(pfpRAW)
                setPFPURL(downloadedPFPURL)
            }
            getPFPURL()
        } 
    }, [pfpRAW])

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
        }
    })

  return (
    <View style={styles.mainContainer}>
      <View style={styles.pfpContainer}>
        <Image style={styles.pfp} source={pfpURL}/>
      </View>
    </View>
  )
}

export default Hero