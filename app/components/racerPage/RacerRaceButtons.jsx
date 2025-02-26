import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const RacerRaceButtons = ({mode, setMode}) => {
  return (
    <>
        <TouchableOpacity onPress={() => setMode('upcoming')}>
            <Text style={mode === 'upcoming' ? styles.highlightedTextButton : styles.nonHighlightedTextButton}>Upcoming Races</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('ongoing')}>
            <Text style={mode === 'ongoing' ? styles.highlightedTextButton : styles.nonHighlightedTextButton}>Ongoing Races</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('results')}>
            <Text style={mode === 'results' ? styles.highlightedTextButton : styles.nonHighlightedTextButton}>Past race results</Text>
        </TouchableOpacity>
    </>
  )
}

export default RacerRaceButtons

const styles = StyleSheet.create({
    nonHighlightedTextButton: {
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
        textDecorationLine: 'underline',
        textDecorationColor: 'white',
        marginBottom: 18
    },
    highlightedTextButton: {
        color: '#09CAC7',
        fontSize: 30,
        fontWeight: '600',
        textDecorationLine: 'underline',
        textDecorationColor: 'white',
        marginBottom: 18
    }
})