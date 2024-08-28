import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import Toast from 'react-native-toast-message';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from '../lib/cloudinary';
import { router, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const ProfileScreen = () => {

  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {


if (docSnap.exists()) {
  setName(docSnap.data().firstName+" "+docSnap.data().lastName)
  setLocation(docSnap.data().jobTitle);
  // router.replace('profileDetailstwo')
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}})
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

  const logout = async () => {
    signOut(auth) // Pass the auth object as an argument
    .then(() => {
      console.log('Successfully logged out');
      router.replace('/signup');
      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have successfully logged out.',
        visibilityTime: 2000,
        onHide: () => {
          router.replace('/');
        }
      });
    })
    .catch((error) => {
      console.error('Error logging out:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Logout Error',
        text2: error.message,
      });
    });
  };
  
  
useEffect(()=>{
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {
if (docSnap.exists()) {
const currentPhotos: string[] = Object.values(docSnap.data().photos)


if(currentPhotos.length>0){
  console.log(docSnap.data().photos)
  setProfileImage(currentPhotos[0])
  setBannerImage(currentPhotos[1])

}
}
 else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}})
  },[1])

  const myProfileImage = cld.image("profileimages/your_profile_image_id");
  const userBannerImage = cld.image("profileimages/file_byouqy");

  // Apply the transformation.
  myProfileImage
    .resize(thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face())))
    .roundCorners(byRadius(100));

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      uploadProfileImage(result.assets[0].uri)
    }
  };

  const { width } = Dimensions.get('window');
  userBannerImage
    .resize(thumbnail().width(width).height(150).gravity(focusOn(FocusOn.face())));

  const pickBannerImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setBannerImage(result.assets[0].uri)
      uploadBannerImage(result.assets[0].uri)
    }
  };

  const uploadProfileImage = async (file) => {
    setLoading(true)
   const downloadURL = await uploadImageAsync(file,0);
      updateDoc(doc(db, "users", auth.currentUser.uid), {
        [`photos.${0}`]: downloadURL
      }).then(() => {
        setLoading(false);
        router.push('/(tabs)/profile')
      });
  };

  const uploadBannerImage = async (file) => {
    setLoading(true)
    const downloadURL = await uploadImageAsync(file,1);

      updateDoc(doc(db, "users", auth.currentUser.uid), {
        [`photos.${1}`]: downloadURL
      }).then(() => {
        setLoading(false);
        router.push('/(tabs)/profile')
      });
  };

  return (
    <>
      <StatusBar style='light' backgroundColor='black' />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={pickBannerImage}>
            <Image source={{ uri: bannerImage }} style={{ height: 200, objectFit: 'cover' }} />
          </TouchableOpacity>
          

          <View style={styles.profileInfo}>
            <TouchableOpacity onPress={pickProfileImage}>
              <Image source={{uri: profileImage}} style={styles.profileImage} />
            </TouchableOpacity>
            
             
           
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.location}>{location}</Text>
          </View>

          <View style={styles.settingsSection}>
            <TouchableOpacity style={styles.settingItem} onPress={()=>{router.push('/(account)/profileDetailsone')}}>
              <Ionicons name="person-outline" size={24} color="#20B2AA" />
              <Text style={styles.settingText}>My Account</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </TouchableOpacity>

            <View style={styles.settingItem}>
              <Ionicons name="finger-print-outline" size={24} color="#20B2AA" />
              <Text style={styles.settingText}>Face ID / Touch ID</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#20B2AA" }}
                thumbColor={true ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={true}
              />
            </View>

            <TouchableOpacity style={styles.settingItem} onPress={logout}>
              <Ionicons name="log-out-outline" size={24} color="#20B2AA" />
              <Text style={styles.settingText}>Log Out</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>More</Text>

          <View style={styles.settingsSection}>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="help-circle-outline" size={24} color="#20B2AA" />
              <Text style={styles.settingText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="information-circle-outline" size={24} color="#20B2AA" />
              <Text style={styles.settingText}>About App</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 20,
  },
  editButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',


  },
  profileInfo: {
    alignItems: 'center',
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  settingsSection: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ProfileScreen;