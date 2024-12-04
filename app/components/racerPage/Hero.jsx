import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDownloadableURL } from '../../firebase/storage'

//encryption imports
import * as crypto from 'react-native-quick-crypto'
import { getKey } from '../../firebase/firestore'
import { Buffer } from 'buffer'

const Hero = ({pfpRAW, racerData}) => {

    const [pfpURL, setPFPURL] = useState('')
    const [keyData, setKeyData] = useState({})
    const [decipheredDisplayName, setDecipheredDisplayName] = useState('')

    useEffect(() => {
        if (pfpRAW) {
            const getPFPURL = async () => {
                console.log('running getPFPURL')
                const downloadedPFPURL = await getDownloadableURL(pfpRAW)
                setPFPURL(downloadedPFPURL)
            }
            getPFPURL()
        } 

        //get decryption key data
        const getKeyData = async () => {
            const keyDataObj = await getKey('2L5AoMJxKYqiPuSERhul7wFBO')
            setKeyData(keyDataObj)
        }
        getKeyData()

        if (racerData && keyData) {

            console.log('fName: ', racerData.fName)
            console.log('typeof fName: ', typeof racerData.fName)

            const fNameBuffer = Buffer.from(racerData.fName, 'hex');
            const fNameDecipher = crypto.createDecipheriv('aes256', keyData.key, keyData.iv)
            const decipheredFName = cipher.update(fNameBuffer, 'hex', 'utf-8') + fNameDecipher.final('utf-8')
            
            const lNameBuffer = Buffer.from(racerData.lName, 'hex')
            const lNameDecipher = crypto.createDecipheriv('aes256', keyData.key, keyData.iv)
            const decipheredLName = crypto.createDecipheriv(lNameBuffer, 'hex', 'utf-8') + lNameDecipher.final('utf-8')
            setDecipheredDisplayName(decipheredFName + ' ' + decipheredLName)
        }
    }, [pfpRAW, racerData, keyData])

    console.log(decipheredDisplayName)

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
        <Image style={styles.pfp} source={{ uri: pfpURL }}/>
      </View>
    </View>
  )
}

export default Hero