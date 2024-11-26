import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

//component imports
import Hero from '../components/homepage/Hero'
import LinkCards from '../components/homepage/LinkCards'
import PromoSection from '../components/homepage/PromoSection'
import Contact from '../components/homepage/Contact'

const index = () => {

  return (
    <ScrollView style={styles.mainCon}>
      <Hero />
      <PromoSection />
      <LinkCards />
      <Contact />
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#01354B',
    width: '100%'
  }
})