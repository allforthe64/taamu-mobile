import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

//component imports
import Hero from '../components/homepage/Hero'
import LinkCards from '../components/homepage/LinkCards'
import PromoSection from '../components/homepage/PromoSection'
import Contact from '../components/homepage/Contact'

import * as Sentry from '@sentry/react-native'

const index = () => {
  
  return (
    <ScrollView style={styles.mainCon}>
      <Hero />
      <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
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