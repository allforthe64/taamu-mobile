import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React from 'react'

//Picker component import
import {Picker} from '@react-native-picker/picker';

//checkbox component import
import { CheckBox } from '@rneui/themed';

const SlideOne = ({ selectedEvent, setSelectedEvent, selectedBoat, setSelectedBoat, selectedAge, setSelectedAge, events, gender, setGender, crew, currentUser, setCrew, crewAccountType, setCrewAccountType, currentUserCrews, selectedCrew, setSelectedCrew, fees, setFeeObj, parentalSignature, setParentalSignature, parentalConsent, setParentalConsent, setSlide, keyData }) => {

    const isConditionMet =
    (['Age 8 to age 10', 'J12', 'J14', 'J16', 'J19'].includes(selectedAge) &&
    (!parentalConsent || parentalSignature === ''));

    //set selectedCrew to the crew that matches the incoming crewId
    const handleCrewChange = (input) => {
        //filter for all participants who are coached crews
        const coachedCrews = selectedEvent.participants.filter(participant => participant.coachedCrew)
        if (coachedCrews.some(crew => crew.crewId === input)) {
            setMessage(/* language === "fr" ? "Oups ! Il semble que vous avez déjà inscrit l'équipage sélectionné à cet événement" : */ "Oops! Looks like you've already registered the selected crew for that event")
            setSelectedCrew({id: ''})
            return false
        } else {
            //filter for the selected crew and make sure that the selected crew matches the craft category
            const targetCrew = currentUserCrews.filter(crew => crew.id === input)[0]

            if (targetCrew.craftType === selectedBoat) {
                setSelectedCrew(targetCrew)
            } else {
                setMessage(/* language === "fr" ? "Le type de bateau de l'équipage sélectionné ne correspond pas au type de bateau de cet événement" : */ "Selected crew's craft type doesn't match this event's craft type")
                setSelectedCrew({id: ''})
            }
        }
    }

    //initialize arrays to hold the boat and age categories used when all boats or all ages are active
    const backupAgeCategories = [
        `${language === "fr" ? "Âge" : 'Age'} 8 ${language === "fr" ? "à l'âge de" : 'to age'} 10`,
        'J12',
        'J14',
        'J16',
        'J19',
        /* `${language === "fr" ? "Novice Junior" : */ 'Junior Novice'/* }` */,
        /* `${language === "fr" ? "Novice Adulte" : */ 'Adult Novice'/* }` */,
        'Open',
        'Masters 40s',
        'Masters 50s',
        'Masters 60s',
        'Masters 70s',
        'Masters 75+'
    ]

    const backupCraftCategories = [
        'V1',
        'OC1',
        'SUP',
        'Surfski Single',
    ]

    const backupCrewCraftCategories = [
        'OC2',
        'V6',
        'V12',
        'Surfski Double'
    ]

  return (
    <View>
      <Text style={styles.mainHeader}>Register for a <Text style={{ color: '#09CAC7' }}>race event</Text></Text>

        <View style={styles.formMainContainer}>
            <View style={styles.formSubContainer}>
                <Text style={styles.label}>Select an event:</Text>
                <Picker
                    mode='dropdown'
                    style={styles.singleLineTextInputs}
                    selectedValue={selectedEvent !== undefined ? events.indexOf(selectedEvent) : ''}
                    onValueChange={(itemValue, itemIndex) => {
                        if (itemValue !== '') {
                            setSelectedAge('')
                            setSelectedBoat('')
                            setSelectedCrew({id: ''})
                            setCrew(false)
                            setGender('')
                            setSelectedAge('')
                            setSelectedBoat('')
                            setCrewAccountType('')

                            //check to see if the user has already registered for this event
                            if (currentUser.role !== 'coach') {
                                if (!currentUser.captain) {
                                    if (events[itemValue].participants.some(participant => !participant.captainedCrew && (participant.user === currentUser.uid))) {
                                        setMessage(language === "fr" ? "Oups ! On dirait que vous êtes déjà inscrit à cet événement" : "Oops! Looks like you've already registered for that event")
                                        return false
                                    } else {
                                        setSelectedEvent(events[itemValue])
                
                                        //filter for a fee object with a matching event id
                                        const feeObj = fees.filter(fee => fee.eventId === events[itemValue].id)[0]
                                        setFeeObj(feeObj)
                                    }
                                } else {
                                    if (events[itemValue].participants.some(participant => participant.captainedCrew && (participant.user === currentUser.uid))) {
                                        setMessage(language === "fr" ? "Oups ! On dirait que vous êtes déjà inscrit à cet événement" : "Oops! Looks like you've already registered for that event")
                                        return false
                                    } else {
                                        if (events[itemValue].participants.some(participant => !participant.captainedCrew && !participant.coachedCrew && (participant.user === currentUser.uid))) {
                                            setMessage(language === "fr" ? "Oups ! On dirait que vous êtes déjà inscrit à cet événement" : "Oops! Looks like you've already registered for that event")
                                            return false
                                        } else {
                                            setSelectedEvent(events[itemValue])
                
                                            //filter for a fee object with a matching event id
                                            const feeObj = fees.filter(fee => fee.eventId === events[itemValue].id)[0]
                                            setFeeObj(feeObj)
                                        }
                                    }
                                }
                            } else {
                                if (events[itemValue].team === 'No') {
                                    if (events[itemValue].participants.some(participant => !participant.captainedCrew && !participant.coachedCrew && (participant.user === currentUser.uid))) {
                                        setMessage(language === "fr" ? "Oups ! On dirait que vous êtes déjà inscrit à cet événement" : "Oops! Looks like you've already registered for that event")
                                        return false
                                    } else {
                                        setSelectedEvent(events[itemValue])
            
                                        //filter for a fee object with a matching event id
                                        const feeObj = fees.filter(fee => fee.eventId === events[itemValue].id)[0]
                                        setFeeObj(feeObj)
                                    }
                                } else {
                                    setSelectedEvent(events[itemValue])
            
                                    //filter for a fee object with a matching event id
                                    const feeObj = fees.filter(fee => fee.eventId === events[itemValue].id)[0]
                                    setFeeObj(feeObj)
                                }
                            }
                        } 
                    }}
                >
                    <Picker.Item key={''} label={'Choose one...'} value={''} />
                    {
                        events.map((ev, i) => {
                            return <Picker.Item key={i} label={ev.eventName} value={i} />
                        })
                    }
                </Picker>
            </View>
            {selectedEvent !== undefined &&
                <>
                    <View style={styles.formSubContainer}>
                        <Text style={styles.label}>Select a craft category:</Text>
                        <Picker
                            mode='dropdown'
                            style={styles.singleLineTextInputs}
                            selectedValue={selectedBoat}
                            onValueChange={(itemValue, itemIndex) => {
                                if (itemValue !== '') {
                                    if (itemValue === 'V6' || itemValue === 'OC2' || itemValue === 'Surfski Double' || itemValue === 'V12' || itemValue === 'OC1 - relay' || itemValue === 'OC2 - relay' || itemValue === 'V1 - relay' || itemValue === 'Surfski Single - relay' || itemValue === 'Surfski Double - relay') {
                                        setCrew(true)
                                        setSelectedBoat(itemValue)
                                    } else {
                                        setCrew(false)
                                        setSelectedBoat(itemValue) 
                                    }
                                } else return false
                            }}
                        >
                            <Picker.Item key={''} label={'Choose one...'} value={''} />
                            {selectedEvent && !selectedEvent.craftCategories.includes('All Boats') ?
                                selectedEvent.craftCategories.map((cat, i) => {
                                    return (
                                        <Picker.Item key={i} label={cat} value={cat} />
                                    )
                                })
                            : selectedEvent ?
                                backupCraftCategories.map((cat, i) => {
                                    return (
                                        <Picker.Item key={i} label={cat} value={cat} />
                                    )
                                })
                            : 
                                <></>
                            }
                        </Picker>
                    </View>
                    {!crew ?
                        <View style={styles.formSubContainer}>
                            <Text style={styles.label}>Select an age category:</Text>
                            <Picker
                                mode='dropdown'
                                style={styles.singleLineTextInputs}
                                selectedValue={selectedBoat}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedAge(itemValue)
                                }}
                            >
                                <Picker.Item key={''} label={'Choose one...'} value={''} />
                                {selectedEvent && !selectedEvent.ageCategories.includes('All Ages') ? 
                                    selectedEvent.ageCategories.map((cat, i) => {
                                        return (
                                            <Picker.Item key={i} label={cat} value={cat} />
                                        )
                                    })
                                : selectedEvent ?
                                    backupAgeCategories.map((cat, i) => {
                                        return (
                                            <Picker.Item key={i} label={cat} value={cat} />
                                        )
                                    })
                                :
                                    <></>
                                }
                            </Picker>
                            {(selectedAge === 'Age 8 to age 10' || selectedAge === "Âge 8 à l'âge de 10" || selectedAge === 'J12' || selectedAge === 'J14' || selectedAge === 'J16' || selectedAge === 'J19') &&
                                <View style={styles.fullWithSubcontainerWithMarginTop}>
                                    <Text style={styles.label}>Parent/Guardian signature:</Text>
                                    <TextInput style={styles.singleLineTextInputs} placeholder='Parent/Guardian Signature' value={parentalSignature} onChangeText={(e) => setParentalSignature(e)}/>
                                    <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                                        <Text style={{color: 'white', fontSize: 14}}>I have parental/gaurdian consent to register:</Text>
                                        <CheckBox 
                                            center
                                            checked={check1}
                                            onPress={() => setParentalConsent(prev => !prev)}
                                            checkedColor='white'
                                            uncheckedColor='white'
                                        />
                                    </View>
                                </View>
                            }
                        </View>
                    :
                        <View style={styles.formSubContainer}>
                            <Text style={styles.label}>Register as:</Text>
                            <Picker
                                mode='dropdown'
                                style={styles.singleLineTextInputs}
                                selectedValue={selectedBoat}
                                onValueChange={(itemValue, itemIndex) => {
                                    if (itemValue === 'captain') {
                                        if (!currentUser.captain) {
                                            language === "fr" ? setMessage("Vous devez être capitaine d'équipage pour inscrire votre équipage à cette course !")
                                            : setMessage('You must be a crew captain to register your crew for this race!')
                                        } else {
                                            setCrewAccountType(itemValue)
                                        }
                                    } else if (itemValue === 'coach') {
                                        if (!currentUser.coach) {
                                            language === "fr" ? setMessage("Vous devez être coach pour inscrire un de vos équipages à cette course !")
                                            : setMessage('You must be a coach to register one of your crews for this race!')
                                        } else {
                                            setCrewAccountType(itemValue)
                                        }
                                    }
                                }}
                            >
                               <Picker.Item key={''} label={'Choose one...'} value={''} />
                               <Picker.Item key={'captain'} label={'Team captain'} value={'captain'} /> 
                               <Picker.Item key={'coach'} label={'Crew coach'} value={'coach'} />
                            </Picker>
                        </View>
                    }
                    {crewAccountType === 'coach' && selectedBoat !== 'V1' && selectedBoat !== 'OC1' && selectedBoat !== 'Surfski Single' && selectedBoat !== 'SUP' && keyData && crew &&
                        <View style={styles.formSubContainer}>
                            <Text style={styles.label}>Register as:</Text>
                            <Picker
                                mode='dropdown'
                                style={styles.singleLineTextInputs}
                                selectedValue={selectedBoat}
                                onValueChange={(itemValue, itemIndex) => {
                                    handleCrewChange(itemValue)
                                }}
                            >
                                <Picker.Item key={''} label={'Choose one...'} value={''} />
                            </Picker>
                        </View>
                    }
                </>
            }
        </View>

      {selectedEvent &&
        <View style={styles.buttonContainer}>
            {crew ?
                <TouchableOpacity style={selectedEvent === null || (crewAccountType === 'coach' && selectedCrew.id === '') ? [styles.button, {opacity: 50}] : styles.button } onPress={() => setSlide(prev => prev + 1)} disabled={selectedEvent === null || (crewAccountType === 'coach' && selectedCrew.id === '') ? true : false}>
                    <Text>Review Registration</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={() => setSlide(prev => prev + 1)} disabled={selectedEvent === null || selectedBoat === '' || selectedAge === '' || (gender === '' && selectedEvent.eventGender === 'Mixed') || isConditionMet ? true : false} style={selectedEvent === null || selectedBoat === '' || selectedAge === '' || (gender === '' && selectedEvent.eventGender === 'Mixed') || isConditionMet ? [styles.button, {opacity: 50}] : styles.button}>
                    <Text>Review Registration</Text>
                </TouchableOpacity>
            }
        </View>
      }
    </View>
  )
}

export default SlideOne

const styles = StyleSheet.create({
    formMainContainer: {
        width: 'full',
    },
    formSubContainer: {
        width: '100%',
        marginLeft: 30
    }, 
    fullWithSubcontainerWithMarginTop: {
        width: '100%',
        marginTop: 20
    }, 
    label: {
        color: '#09CAC7',
        fontWeight: '800',
        fontSize: 25,
        marginBottom: 10
    },
    singleLineTextInputs: {
        backgroundColor: 'white',
        color: '#808080',
        width: '100%',
        fontSize: 18,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'white',
        borderWidth: 2
    },
    button: {
        fontSize: 30,
        fontWeight: '500',
        paddingTop: 7,
        paddingLeft: 12,
        paddingBottom: 7,
        paddingRight: 12,
        backgroundColor: '#09CAC7',
        color: 'white',
        borderRadius: 20
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25
    }
})