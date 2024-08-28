import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { router } from 'expo-router';


const AddPhotosScreen = (setData:any,setPage:any) => {
  const [photos, setPhotos] = useState([null,null,null,null,null,null]);
  const storage = getStorage(); // Initialize photos as an empty array
  const [loading, setLoading] = useState(false);



  useEffect(()=>{
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {
if (docSnap.exists()) {
const currentPhotos: string[] = Object.values(docSnap.data().photos)


if(currentPhotos.length>0){
  console.log(docSnap.data().photos)
  setPhotos(currentPhotos)

}
}
 else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}})
  },[1])

  const handlePhotoUpload = async (index) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newPhotos = [...photos];
        newPhotos[index] = result.assets?.[0].uri;
        setPhotos(newPhotos);
        console.log(newPhotos);
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
  
  async function uploadImageAsync(uri,i) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = ref(getStorage(), `users/${auth.currentUser?.uid}/photos/${i}`);
    const result = await uploadBytes(fileRef, blob);
    console.log("Uploaded a blob or file!", result);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await getDownloadURL(fileRef);
  }


const grabData = async () => {
    for (let i = 0; i < photos.length; i++) {
      if (photos.length < 2) {
        alert('Please upload atleast 2 photos');
        return;
      }
      setLoading(true);

      const downloadURL = await uploadImageAsync(photos[i],i);

      updateDoc(doc(db, "users", auth.currentUser.uid), {
        [`photos.${i}`]: downloadURL
      }).then(() => {
        setLoading(false);
        router.push('/(tabs)/profile')
      });
    }

  }
  const grabDataAndClose = async () => {
    for (let i = 0; i < photos.length; i++) {
      if (photos.length < 2) {
        alert('Please upload atleast 2 photos');
        return;
      }
      setLoading(true);

      const downloadURL = await uploadImageAsync(photos[i],i);

      updateDoc(doc(db, "users", auth.currentUser.uid), {
        [`photos.${i}`]: downloadURL
      }).then(() => {
        setLoading(false);
        router.push('/(tabs)/profile')
      });
    }

  }









  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerText}>Add at least 2 photos to continue</Text>

      <View style={styles.photosContainer}>
        {renderPhotoInputs()}
      </View>

      <View style={{
  flexDirection: 'row',
  padding: 20}}>

<TouchableOpacity style={{ width: 100, backgroundColor: '#43CEBA', display: 'flex', paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, borderRadius: 14, marginTop: 20, gap: 10, alignSelf: 'flex-end', marginRight: 16 }} 
        onPress={() => {
          grabData()
         
        }} >
          <Text style={{ fontWeight: 'semibold', fontSize: 14, color: 'white', }} >
            Close
          </Text>
        </TouchableOpacity>
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
