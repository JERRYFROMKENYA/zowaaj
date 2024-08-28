import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import splashscreenimage from "../assets/images/splashscreen2image.png"
import appleicon from "../assets/images/appleicon.png"
import googleicon from "../assets/images/googleicon.png"
import { Redirect, useRouter } from 'expo-router'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import { useAuth } from './providers/AuthProvider'
import {auth} from './firebaseConfig'
const signup = () => {
  const { isAuthenticated, user } = useAuth()
  console.log(user)
  if (!auth.currentUser?.emailVerified && auth.currentUser) {
    return <Redirect href="profileDetailsone" />;
  }
  const router = useRouter()
  return (
    // <View style={{flex:1,}}>
    <ImageBackground source={splashscreenimage} style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 45, flex: 1, display: 'flex', justifyContent: 'flex-end', marginBottom: '10%' }}>

        <TouchableOpacity style={{ backgroundColor: 'white', display: 'flex', paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 14, gap: 10, marginBottom: 10 }} onPress={() => router.push('emailPasswordsignup')}>
          <Fontisto name="email" size={24} color="black" />
          <Text style={{ fontWeight: 'bold', fontSize: 18, }} >
            Continue with Email/Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'white', display: 'flex', paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 14, gap: 10 }} onPress={() => router.push('profileDetailsone')}>
          <Image source={appleicon} style={{ height: 28, width: 28, objectFit: 'contain', }} />
          <Text style={{ fontWeight: 'bold', fontSize: 18, }} >
            Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: 'white', display: 'flex', paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 14, marginTop: 20, gap: 10 }} onPress={() => router.push('(tabs)/home')} >
          <Image source={googleicon} style={{ height: 28, width: 28, objectFit: 'contain', marginRight: 4 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 18, }} >
            Continue with Google
          </Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', marginTop: 8 }}>By continuing you agree to our Terms and Conditions</Text>
      </View>
    </ImageBackground>

  )
}

export default signup

const styles = StyleSheet.create({})