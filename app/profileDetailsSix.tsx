import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from "react-native-progress"
import { router } from 'expo-router';
const AddPhotosScreen = (setData:any,setPage:any) => {
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);

  const handlePhotoUpload = async (index) => {
    try {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access photos is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        const newPhotos = [...photos];
        newPhotos[index] = pickerResult.uri;
        setPhotos(newPhotos);
      }
    } catch (error) {
      console.log('Error picking image: ', error);
    }
  };

  const renderPhotoInputs = () => {
    return photos.map((photo, index) => (
      <TouchableOpacity key={index} style={[styles.photoInput, photo && styles.photoUploaded]} onPress={() => handlePhotoUpload(index)}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <Icon name="add-a-photo" size={24} color="#878787" />
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerText}>Add at least 2 photos to continue</Text>

      <View style={styles.photosContainer}>
        {renderPhotoInputs()}
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={()=>router.push('profileDetailsSeven')}
        // onPress={() => {
        //   // Check if at least 2 photos are uploaded
        //   const uploadedPhotos = photos.filter(photo => photo !== null);
        //   if (uploadedPhotos.length >= 2) {
        //     // Navigate to the next screen or perform action
        //     console.log('Navigate to next screen');
        //   } else {
        //     // Handle case where user hasn't uploaded enough photos
        //     alert('Please upload at least 2 photos to continue.');
        //   }
        // }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>6/7</Text>
        <Progress.Bar progress={0.85} unfilledColor='#E9E9E9' borderColor='#e9e9e9' height={10} color='#43CEBA' width={null} style={{ width: '100%' }} />
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

export default AddPhotosScreen;
