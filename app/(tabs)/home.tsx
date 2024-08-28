import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import ProfileCard from '../components/ProfileCard';
import profileimg1 from '../../assets/images/profileimg1.jpg';
import reject from '../../assets/images/reject.png';
import match from '../../assets/images/match.png';
import stared from '../../assets/images/stared.png';
import { Redirect } from 'expo-router';
import { auth, db } from '../firebaseConfig';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { query, where, orderBy, limit } from "firebase/firestore"; 

const HomeScreen = () => {
  // let data: ArrayLike<any> | null | undefined = [];
  const [profiles, setProfiles] = React.useState([]);
  
  // const[genderPreferece, setGenderPreference] = React.useState("");
  
  useEffect(() => {
   

  const docRef = doc(db, "users", auth.currentUser.uid);
  getDoc(docRef).then(async (docSnap) => {
    if (!docSnap.exists()) {
      // router.replace('profileDetailstwo')
      <Redirect href="/profileDetailstwo" />;
    }else{
      
      try {
        const homeScRef = collection(db, "users");
    
        // First query to exclude profiles with specific gender
        const genderQuery = query(homeScRef, where("gender", "!=", docSnap.data().gender));
        const genderSnapshot = await getDocs(genderQuery);
    
        // Extract IDs to exclude
        const excludedIds = new Set(docSnap.data().matchedProfiles);
    
        // Filter profiles by ID
        const profiles = genderSnapshot.docs.filter(doc => !excludedIds.has(doc.id))
          .map(doc => ({
            ...doc.data(),
            uid: doc.id
          }));
    
        // Update the state with the filtered profiles
        setProfiles((prevProfiles) => [...prevProfiles, ...profiles]);
    
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    
      
    }
})

  }, [1]);
  // console.log(profiles[0]);

 
  

  
  const data = [
    {
      id: '1',
      image: profileimg1,
      name: 'John Doe',
      address: '123 Street, City',
      tags: ['Divorced', 'Has Children', 'Iraq'],
      rejectIcon: reject,
      matchIcon: match,
      staredIcon: stared,
    },
    {
      id: '2',
      image: profileimg1,
      name: 'Jane Doe',
      address: '456 Avenue, City',
      tags: ['Single', 'No Children', 'USA'],
      rejectIcon: reject,
      matchIcon: match,
      staredIcon: stared,
    },
  ];



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item?.uid}
        renderItem={({ item }) => (
          

          <ProfileCard profile={item} />
        )}
        contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 30 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
