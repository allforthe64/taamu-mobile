import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'

const Filters = ({setFiltersOpen}) => {
  return (
    <View style={styles.mainContainer}>
        <View style={styles.topButtonContainer}>
            <TouchableOpacity onPress={() => setFiltersOpen(false)}>
                <Text style={styles.closeFiltersText}>Close filters <FontAwesomeIcon style={{marginLeft: 6}} icon={faChevronDown}/></Text>
            </TouchableOpacity>
        </View>
        <View style={styles.topButtonContainer}>
            <TouchableOpacity>
                <Text style={styles.buttonText}><FontAwesomeIcon icon={faXmark} style={{marginRight: 6}}/>Clear filters</Text>
            </TouchableOpacity>
        </View>
      <Text>Filters</Text>
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
})

export default Filters