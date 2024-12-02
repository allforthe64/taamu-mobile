import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect } from 'react'

//component imports
import Hero from '../components/homepage/Hero'
import LinkCards from '../components/homepage/LinkCards'
import PromoSection from '../components/homepage/PromoSection'
import Contact from '../components/homepage/Contact'
import { getUser } from '../firebase/firestore'

const index = () => {

  /* useEffect(() => {
    const getUserData = async () => {
      const userData = await getUser({uid: 'xhX6FwzcSCMkGak0nnPTbapS0ik2'})
      console.log(userData)
    } 
    getUserData()
  }, []) */

  return (
    <>
      <ScrollView style={styles.mainCon}>
        <Hero />
        <PromoSection />
        <LinkCards />
        <Contact />
      </ScrollView>
      <StatusBar />
    </>
  )
}

export default index

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#01354B',
    width: '100%'
  }
})