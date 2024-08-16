import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from "react-native-progress"
import { router } from 'expo-router';
const VerificationScreen = (setData:any,setPage:any) => {

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerText}>In order to verify your identity, we require a valid ID card / Passport and a selfie to be uploaded through the APP.
      </Text>
      <Text style={styles.headerText}>
        You will be able to connect with contacts once your profile has been approved.
      </Text>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('(tabs)/home')}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>7/7</Text>
        <Progress.Bar progress={1} unfilledColor='#E9E9E9' borderColor='#e9e9e9' height={10} color='#43CEBA' width={null} style={{ width: '100%' }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: '600',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  photoInput: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#878787',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  photoUploaded: {
    borderColor: '#43CEBA',
    borderWidth: 2,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: '#43CEBA',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: 94,
    alignSelf: 'flex-end'
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'semibold',
  },
});

export default VerificationScreen;
