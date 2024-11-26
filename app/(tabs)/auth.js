import { View, Text, StatusBar } from 'react-native'
import React from 'react'

//AuthComponent import
import AuthComponent from '../components/auth/register/AuthComponent'

const auth = () => {
  return (
    <>
      <AuthComponent />
      <StatusBar />
    </>
  )
}

export default auth