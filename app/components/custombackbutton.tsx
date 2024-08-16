import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import backButton from "../../assets/images/backarrow.png"
import { useRouter } from 'expo-router'


const custombackbutton = () => {
  const router = useRouter()
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
    <Image source={backButton} style={{height:38, width:38, objectFit:'contain'}}/>
  </TouchableOpacity>
  )
}

export default custombackbutton

const styles = StyleSheet.create({})