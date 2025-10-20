import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

//fontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

//component imports
import RegistrationComponentRaceInfo from './RegistrationComponentRaceInfo'
//slide component import
import SlideOne from './slideComponents/SlideOne'

const RaceRegistrationMain = ({ keyData, raceData, organizerData, setRegistrationWindowOpen, raceId }) => {

    //initialize state for to hold race craft categories/age categories/distances/registration info/transaction data
    const [selectedEvent, setSelectedEvent] = useState()
    const [selectedBoat, setSelectedBoat] = useState('')
    const [selectedAge, setSelectedAge] = useState('')
    const [gender, setGender] = useState('')
    const [slide, setSlide] = useState(0)
    const [crew, setCrew] = useState(false)
    const [crewAccountType, setCrewAccountType] = useState('')
    const [currentUserCrews, setCurrentUserCrews] = useState([])
    const [selectedCrew, setSelectedCrew] = useState({id: ''})
    const [tShirt, setTShirt] = useState([''])

    //initialize state to hold waiver links
    const [waiverLinks, setWaiverLinks] = useState([])
    const [parentalSignature, setParentalSignature] = useState('')
    const [parentalConsent, setParentalConsent] = useState(false)

    //payment state
    const [chosenPaymentMethod, setChosenPaymentMethod] = useState('cash')
    const [transactionData, setTransactionData] = useState()
    const [transactionDocument, setTransactionDocument] = useState()
    const [feeObj, setFeeObj] = useState()

    //message state
    const [message, setMessage] = useState('')

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

            {slide === 0 ?
                <SlideOne selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} selectedBoat={selectedBoat} setSelectedBoat={setSelectedBoat} selectedAge={selectedAge} setSelectedAge={setSelectedAge} events={raceData.raceEvents} gender={gender} setGender={setGender} crew={crew} setCrew={setCrew} currentUser={currentUser} crewAccountType={crewAccountType} setCrewAccountType={setCrewAccountType} currentUserCrews={currentUserCrews} selectedCrew={selectedCrew} setSelectedCrew={setSelectedCrew} setFeeObj={setFeeObj} fees={raceData.fees}parentalConsent={parentalConsent} setParentalConsent={setParentalConsent} parentalSignature={parentalSignature} setParentalSignature={setParentalSignature} setSlide={setSlide} keyData={keyData}/>
            : slide === 1 ?
                <></>
            :
                <></>
            }

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

            {raceData && slide !== 3 &&
                <RegistrationComponentRaceInfo keyData={keyData} organizerData={organizerData} raceData={raceData}/>
            }
        </ScrollView>
    </View>
  )
}

export default RaceRegistrationMain