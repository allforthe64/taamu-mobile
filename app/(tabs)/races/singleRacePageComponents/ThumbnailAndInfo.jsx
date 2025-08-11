import { View, Text } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useFocusEffect, useRouter } from 'expo-router'
import { format } from 'date-fns'
import { getKey } from '../../../firebase/firestore'

const ThumbnailAndInfo = ({ thumbnailURL, raceData, organizerData, setRegistrationWindowOpen, currentUser, raceId, setViewParticipants, keyData}) => {

    //initialize state
    const [keyData, setKeyData] = useState()
    const [decipheredOrgName, setDecipheredOrgName] = useState('')

    //instantiate router object
    const router = useRouter()

    //create a current date object
    const currentDate = format(new Date(), 'MM/dd/yyyy')

    

    //decipher org information
    useEffect(() => {
        if (organizerData && keyData) {
            //decipher orgName
            
        }
    }, [organizerData, keyData])

  return (
    <View>
      <Text>ThumbnailAndInfo</Text>
    </View>
  )
}

export default ThumbnailAndInfo