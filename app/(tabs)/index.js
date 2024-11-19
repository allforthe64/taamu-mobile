import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

//component imports
import Hero from '../components/homepage/Hero'
import LinkCards from '../components/LinkCards'

const index = () => {
  return (
    <ScrollView style={styles.mainCon}>
      <Hero />
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