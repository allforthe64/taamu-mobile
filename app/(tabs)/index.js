import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

//component imports
import Hero from '../components/homepage/Hero'
import LinkCards from '../components/homepage/LinkCards'
import PromoSection from '../components/homepage/PromoSection'

const index = () => {
  return (
    <ScrollView style={styles.mainCon}>
      <Hero />
      <PromoSection />
      <LinkCards />
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