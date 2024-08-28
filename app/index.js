import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import logo from "../assets/images/splash.png"
import fontlogo from "../assets/images/fontlogo.png"
import { useRouter } from 'expo-router'
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

const splashScreen1 = () => {
const [appUser, setAppUser] = useState({})
const router = useRouter()
// const auth = getAuth();


  useEffect(() => {

    
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAppUser(user);
        UserData = user
      } else {
        setAppUser(undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#43CEBA" }}>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flex: 1 }}>
        <Image source={logo} style={{ height: 130, width: 100, objectFit: 'contain', alignSelf: 'center' }} />
        <Image source={fontlogo} style={{ width: 184, height: 72, objectFit: 'contain' }} />
        <TouchableOpacity style={{ position: 'absolute', bottom: 22, backgroundColor: '#F1F1F1', borderRadius: 14, borderColor: 'white' }} onPress={() => {
          
          console.log(auth.currentUser?.uid)
          
          if (appUser !== undefined) {

            router.push("(tabs)/home");
          } else {
            router.push("signup");
          }
        }}>
          <Text style={{ fontSize: 20, color: '#2A2A2A', paddingHorizontal: 70, paddingVertical: 15, fontWeight: 'bold', textAlign: 'center' }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



export default splashScreen1 

const styles = StyleSheet.create({})