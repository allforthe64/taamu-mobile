import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'

//fontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'

//craft category and distance filter imports
import { craftCategories, raceDistances } from './categoriesAndDistances'

//Picker component import
import {Picker} from '@react-native-picker/picker';

//DateTimePickerModal component import
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Filters = ({setFiltersOpen, craftTypeFilter, setCraftTypeFilter, raceTypeFilter, setRaceTypeFilter, distanceFilter, setDistanceFilter, timeFilter, setTimeFilter, setQuery}) => {

    //initialize state for date pickers
    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)

    //initialize functions to control datePicker state
    const showStartDatePickerFunction = () => setShowStartDatePicker(true)
    const hideStartDatePickerFunction = () => setShowStartDatePicker(false)
    const showEndDatePickerFunction = () => setShowEndDatePicker(true)
    const hideEndDatePickerFunction = () => setShowEndDatePicker(false)

    const clearFiltersFunction = () => {
        setRaceTypeFilter('All Race Types')
        setTimeFilter('upcoming')
        setCraftTypeFilter('')
        setDistanceFilter({value: {}, index: '0'})
        setInvalid(false)
        setQuery('')
    }

  return (
    <View style={styles.mainContainer}>
        <DateTimePickerModal
            isVisible={showStartDatePicker}
            mode="date"
            minimumDate={new Date()}
            onConfirm={() => false}
            onCancel={hideStartDatePickerFunction}
        />
        <DateTimePickerModal
            isVisible={showEndDatePicker}
            mode="date"
            minimumDate={new Date()}
            onConfirm={() => false}
            onCancel={hideEndDatePickerFunction}
        />
        <ScrollView style={{width: '100%'}}>
            <View style={[styles.topButtonContainer, {marginTop: 18}]}>
                <TouchableOpacity onPress={() => setFiltersOpen(false)}>
                    <Text style={styles.closeFiltersText}>Close filters</Text>
                    <FontAwesomeIcon style={{marginLeft: 16, color: 'white'}} icon={faChevronDown}/>
                </TouchableOpacity>
            </View>
            <View style={styles.topButtonContainer}>
                <TouchableOpacity style={[styles.button, {display: 'flex', flexDirection: 'row', alignItems: 'center'}]} onPress={clearFiltersFunction}>
                    <FontAwesomeIcon icon={faXmark} style={{fontSize: 18, color: 'white', marginRight: 16}}/>
                    <Text style={styles.buttonText}>Clear filters</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.filtersContainer}>
                <Text style={{color: '#09CAC7', fontSize: 22, fontWeight: '600', marginTop: 12}}>Filter by:</Text>
                <View style={styles.singleFilterContainer}>
                    <Text style={styles.filterLabel}>Craft Type:</Text>
                    <Picker
                        mode='dropdown'
                        style={styles.singleLineTextInputs}
                        selectedValue={craftTypeFilter}
                        onValueChange={(itemValue, itemIndex) => {
                            setCraftTypeFilter(itemValue)
                        }}
                        >
                        {
                            craftCategories.map((category) => {
                                return <Picker.Item key={category} label={category} value={category} />
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.singleFilterContainer}>
                    <Text style={styles.filterLabel}>Craft Type:</Text>
                    <Picker
                        mode='dropdown'
                        style={styles.singleLineTextInputs}
                        selectedValue={raceTypeFilter}
                        onValueChange={(itemValue, itemIndex) => {
                            setRaceTypeFilter(itemValue)
                            setDistanceFilter({value: {}, index: '0'})
                        }}
                        >
                            <Picker.Item key={'All Race Types'} label={'All Distances'} value={'All Race Types'} />
                            <Picker.Item key={'Sprints'} label={'Sprints'} value={'Sprints'} />
                            <Picker.Item key={'Distance'} label={'Distance'} value={'Distance'} />
                    </Picker>
                </View>
                <View style={styles.singleFilterContainer}>
                    <Text style={styles.filterLabel}>Race Distance:</Text>
                    <Picker
                        mode='dropdown'
                        style={styles.singleLineTextInputs}
                        selectedValue={distanceFilter.index}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue !== '0') setDistanceFilter({value: raceDistances[raceTypeFilter][itemValue], index: itemValue}) 
                                else {
                                    setDistanceFilter({value: {}, index: '0'})
                                }
                        }}
                        >
                        {
                            raceDistances[raceTypeFilter].map((dist, i) => {
                                if (i === 0) {
                                    return <Picker.Item key={i} label={'Any distance'} value={i} />
                                } else {
                                    return <Picker.Item key={i} label={dist.text} value={i} />
                                }
                            })
                        }
                    </Picker>
                </View>

                <View style={styles.singleFilterContainer}>
                    <Text style={styles.filterLabel}>View:</Text>
                    <Picker
                        mode='dropdown'
                        style={styles.singleLineTextInputs}
                        selectedValue={timeFilter}
                        onValueChange={(itemValue, itemIndex) => {
                            setTimeFilter(itemValue)
                        }}
                        >
                            <Picker.Item key={'upcoming'} label={'Upcoming races'} value={'upcoming'} />
                            <Picker.Item key={'ongoing'} label={'Ongoing Race Results'} value={'ongoing'} />
                            <Picker.Item key={'results'} label={'Past Race Results'} value={'results'} />
                    </Picker>
                </View>

                <View style={styles.singleFilterContainer}>
                    <Text style={styles.filterLabel}>By Date:</Text>
                    <TouchableOpacity style={styles.dateContainer} onPress={showStartDatePickerFunction}>
                        <Text style={{color: 'white', fontSize: 18}}>MM/DD/YYYY</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{width: '100%', textAlign: 'center', marginTop: 18, fontSize: 18, color: '#09CAC7'}}>To</Text>
                <View style={styles.singleFilterContainer}>
                    <TouchableOpacity style={styles.dateContainer} onPress={showEndDatePickerFunction}>
                        <Text style={{color: 'white', fontSize: 18}}>MM/DD/YYYY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#01354B'
    },
    topButtonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 8,
        paddingRight: 8,
        paddingBottom: 8
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
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '600'
    },
    closeFiltersText: {
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        fontSize: 22
    },
    filtersContainer: {
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    singleFilterContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20
    },
    filterLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#09CAC7'
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
    dateContainer: {
        width: '100%',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 12,
        paddingRight: 12
    }
})

export default Filters