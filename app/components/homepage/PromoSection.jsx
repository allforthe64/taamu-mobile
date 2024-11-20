import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

//expo router import
import { useRouter } from 'expo-router'

const PromoSection = () => {

    //instantiate router obj
    const router = useRouter()

  return (
    <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
            <Text style={styles.sectionHeading}>Taamu:</Text>
            <Text style={styles.sectionTagLine}>Two ways to register, two ways to interact with the paddling community</Text>
        </View>
        <View style={styles.promoSectionContainer}>
            <View style={styles.promoCard}>
                <View style={styles.imageContainer}>
                    <Image style={styles.promoPics} source={require('../../../assets/race_finish.png')}/>
                </View>
            </View>
            <Text style={styles.promoCardHeadings}>Register as an organizer</Text>
            <Text style={styles.promoCardText}>A Taamu Orginization account makes it easy to create and edit races, view participants, and enter live race results. Get access to the information you need to keep your next event ticking over smoothly. Hit the button below to get started:</Text>
            <TouchableOpacity style={styles.PromoCardButton} onPress={() => router.push('/register')}>
                <Text style={styles.buttonText}>Go to registration</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.promoSectionContainer, {marginTop: '15%'}]}>
            <View style={styles.promoCard}>
                <View style={styles.imageContainer}>
                    <Image style={styles.promoPics} source={require('../../../assets/racer_pic.png')}/>
                </View>
            </View>
            <Text style={styles.promoCardHeadings}>Register as a racer</Text>
            <Text style={styles.promoCardText}>A Taamu racer account keeps the latest races right at the tips of your fingers. With our augmented registration process, it&#39;s never been this easy to register yourself for your next race. Hit the button below to get started:</Text>
            <TouchableOpacity style={styles.PromoCardButton} onPress={() => router.push('/register')}>
                <Text style={styles.buttonText}>Go to registration</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default PromoSection

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingTop: '10%',
        paddingBottom: '10%'
    },
    headingContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginBottom: '15%'
    },  
    sectionHeading: {
        fontSize: 35,
        textShadowColor: '#09CAC7',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
        color: 'white',
        fontWeight: '600',
        marginBottom: 10
    },
    sectionTagLine: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 500
    },
    promoSectionContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    promoCard: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    imageContainer: {
        height: 350,
        width: '100%',
        marginBottom: 20,
        borderRadius: 20
    },
    promoPics: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    promoCardHeadings: {
        fontSize: 25,
        color: 'white',
        marginBottom: 20,
        fontWeight: 500
    },
    promoCardText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
        paddingLeft: 10,
        paddingRight: 10
    },
    PromoCardButton: {
        backgroundColor: '#09CAC7',
        paddingTop: 7,
        paddingLeft: 15,
        paddingBottom: 7,
        paddingRight: 15,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 22,
        color: 'white'
    }
})