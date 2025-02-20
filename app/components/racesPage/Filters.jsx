import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

//fontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'

//craft category and distance filter imports
import { craftCategories, raceDistances } from './categoriesAndDistances'

const Filters = ({setFiltersOpen, raceTypefilter}) => {
  return (
    <View style={styles.mainContainer}>
        <ScrollView style={{width: '100%'}}>
            <View style={[styles.topButtonContainer, {marginTop: 18}]}>
                <TouchableOpacity onPress={() => setFiltersOpen(false)}>
                    <Text style={styles.closeFiltersText}>Close filters <FontAwesomeIcon style={{marginLeft: 10}} icon={faChevronDown}/></Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topButtonContainer}>
                <TouchableOpacity style={[styles.button, {display: 'flex', flexDirection: 'row', alignItems: 'center'}]}>
                    <Text style={[styles.buttonText, {marginLeft: 10}]}><FontAwesomeIcon icon={faXmark} style={{fontSize: 18}}/>Clear filters</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.filtersContainer}>
                <Text style={{color: '#09CAC7', fontSize: 22, fontWeight: '600', marginTop: 12}}>Filter by:</Text>
                <View style={styles.singleFilterContainer}>
                    <Text style={styles.filterLabel}>Craft Type:</Text>
                    <Picker
                        mode='dropdown'
                        style={styles.singleLineTextInputs}
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
                        >
                        {
                            raceDistances[raceTypefilter].map((dist, i) => {
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
                        >
                            <Picker.Item key={'upcoming'} label={'Upcoming races'} value={'upcoming'} />
                            <Picker.Item key={'ongoing'} label={'Ongoing Race Results'} value={'ongoing'} />
                            <Picker.Item key={'results'} label={'Past Race Results'} value={'results'} />
                    </Picker>
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
        marginTop: 18
    },
    singleFilterContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
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
        width: '95%',
        fontSize: 18,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'white',
        borderWidth: 2
    },
})

export default Filters