 import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text } from 'react-native';
import { supabase } from './lib/supabase';
import Button from './components/Button';
// import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import {BASE_URL} from '@env'
import axios from 'axios'
import * as Device from 'expo-device';

export default function Auth() {
  const[error, setError] = useState({email:"", password:""})
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    setError({email:"", password:""})
    console.log(email, password)
    await axios.post(`${BASE_URL}/api/register`, {
      email: email,
      password: password,
      deviceName: Device.modelName
    }).then((response) => {
      console.log(response.data)

      if(response.data.status){
        Alert.alert("Welcome to Zowaaj")
        router.push('/onboarding')
      }
      else{
        console.log(response.data.message)
      setError({email:response.data.message?.email?.[0], password:response.data.message?.password?.[0]})
      }
    })






    // const {
    //   data: { session },
    //   error,
    // } = await supabase.auth.signUp({
    //   email: email,
    //   password: password,
    // });

    // if (error) Alert.alert(error.message);
    // setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
  
      
        <Text>Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          style={styles.input}
        />
      {error.email ? <Text style={{color:"red"}}>{error.email}</Text> : null}
      </View>
      <View style={styles.verticallySpaced}>
        <Text>Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          style={styles.input}
        />
          {error.password ? <Text style={{color:"red"}}>{error.password}</Text> : null}
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    color: '#374151', // equivalent to text-gray-600
    borderColor: '#d1d5db', // equivalent to border-gray-300
    borderWidth: 1,
    padding: 12, // equivalent to p-3
    borderRadius: 8, // equivalent to rounded-md
  },
});
