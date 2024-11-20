import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const LinkCards = () => {

  //instantiate router object
  const router = useRouter()

  //get device height to be used in setting container dimension
  const ScreenHeight = Dimensions.get("window").height

  const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: ScreenHeight / 3,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    mainContainer: {
      width: '100%',
      paddingTop: '25%',
      paddingBottom: '25%'
    },
    linkCardImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    PromoCardButton: {
      backgroundColor: '#09CAC7',
      paddingTop: 7,
      paddingLeft: 15,
      paddingBottom: 7,
      paddingRight: 15,
      borderRadius: 100,
      position: 'absolute',
      bottom: 20
    },
    buttonText: {
        fontSize: 22,
        color: 'white'
    }
  })

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.linkCardImg} source={require('../../../assets/link_card_1.png')} />
        <TouchableOpacity style={styles.PromoCardButton} onPress={() => router.push('/races')}>
          <Text style={styles.buttonText}>Search for races</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.linkCardImg} source={require('../../../assets/link_card_2.png')}/>
        <TouchableOpacity style={styles.PromoCardButton}
          onPress={() => router.push({pathname: '/races', params: 'results'})}
        >
          <Text style={styles.buttonText}>Find race results</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LinkCards