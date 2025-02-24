import { View, Text, Dimensions, StyleSheet, Image, TextInput } from 'react-native'
import React, { useState } from 'react'

const RacesHero = ({query, setQuery}) => {

    const [isFocused, setIsFocused] = useState(false)

    const screenHeight = Dimensions.get('window').height
    const screenWidth = Dimensions.get('window').width

    const styles = StyleSheet.create({
        mainContainer: {
            width: screenWidth,
            height: (screenHeight / 4) * 3,
            position: 'relative'
        },
        heroImage: {
            flex: 1,
            objectFit: 'cover'
        },
        absoluteContainer: {
            width: screenWidth,
            height: (screenHeight / 4) * 3,
            position: 'absolute',
            top: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        searchBarContainer: {
            width: '90%',
            height: '75%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, .5)'
        },
        header: {
            color: 'white',
            fontSize: 40
        },
        singleLineTextInputs: {
            backgroundColor: 'white',
            color: '#808080',
            width: '85%',
            fontSize: 18,
            borderRadius: 15,
            paddingLeft: 10,
            paddingRight: 10,
            borderColor: 'white',
            borderWidth: 2
        },
        focusedSingleLineTextInputs: {
            backgroundColor: 'white',
            color: '#808080',
            width: '85%',
            fontSize: 18,
            borderRadius: 15,
            paddingLeft: 10,
            paddingRight: 10,
            borderColor: '#09CAC7',
            borderWidth: 2
        }
    })

  return (
    <View style={styles.mainContainer}>
        <Image style={styles.heroImage} source={require('../../../assets/race_start.png')}/>
        <View style={styles.absoluteContainer}>
            <View style={styles.searchBarContainer}>
                <Text style={styles.header}>Search <Text style={{color: '#09CAC7'}}>Races</Text></Text>
                <TextInput style={isFocused ? styles.focusedSingleLineTextInputs : styles.singleLineTextInputs} onFocus={() => setIsFocused(false)} placeholder='Race title or organizer name' inputMode='text' value={query} onChangeText={(e) => setQuery(e)}/>
            </View>
        </View>
    </View>
  )
}

export default RacesHero