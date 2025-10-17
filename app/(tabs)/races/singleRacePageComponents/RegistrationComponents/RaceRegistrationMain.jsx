import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'

//fontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

//component imports
import RegistrationComponentRaceInfo from './RegistrationComponentRaceInfo'

const RaceRegistrationMain = ({ keyData, raceData, organizerData, setRegistrationWindowOpen }) => {

    //get device height to be used in setting container dimension
    const ScreenHeight = Dimensions.get('window').height

    const styles = StyleSheet.create({
        mainModalContainer: {
            width: '100%',
            height: ScreenHeight,
            backgroundColor: '#01354B',
            paddingTop: '10%',
            paddingLeft: '5%',
            paddingRight: '5%'
        },
        xMarkContainer: {
            width: '100%',
            paddingRight: '5%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        mainHeader: {
            color: 'White',
            fontSize: 24,
            width: '100%',
            paddingLeft: '5%',
            paddingRight: '5%',
            textAlign: 'center',
            marginTop: '5%'
        }
    })
    
  return (
    <View style={styles.mainModalContainer}>
        <ScrollView>
            <View style={styles.xMarkContainer}>
                <TouchableOpacity onPress={() => setRegistrationWindowOpen(false)}>
                    <FontAwesomeIcon icon={faXmark} color={'white'} size={30} />
                </TouchableOpacity>
            </View>
            <Text style={styles.mainHeader}>Register for a <Text style={{ color: '#09CAC7' }}>race event</Text></Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                paddingTop: '5%',
                paddingBottom: '5%'
            }}>
                <View style={{
                    width: '90%',
                    borderWidth: 2,
                    borderColor: '#09CAC7',
                    borderRadius: 100
                }}></View>
            </View>
            {raceData &&
                <RegistrationComponentRaceInfo keyData={keyData} organizerData={organizerData} raceData={raceData}/>
            }
        </ScrollView>
    </View>
  )
}

export default RaceRegistrationMain