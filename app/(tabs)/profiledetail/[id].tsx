import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import reject from '../../../assets/images/reject.png';
import match from '../../../assets/images/match.png';
import stared from '../../../assets/images/stared.png';
import { db, auth } from '@/app/firebaseConfig';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { notify } from '@/components/reusables/reusables';

const { width, height } = Dimensions.get('window');
function findValue(arr: any[], key: any){
  return arr.findIndex(function(o){ return o.label===key });
}


const rejectAction = async (uid) => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let rejectedProfiles = docSnap.data().rejectedProfiles||[];
    // console.log(rejectedProfiles.includes(uid));
    if (!rejectedProfiles.includes(uid)) {
      rejectedProfiles.push(uid);
      updateDoc(docRef, {
        rejectedProfiles: rejectedProfiles
      });
    }
  }

}
const matchAction = async (uid) => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let matchedProfiles = docSnap.data().matchedProfiles||[];
    // console.log(matchedProfiles.includes(uid));
    if (!matchedProfiles.includes(uid)) {
      matchedProfiles.push(uid);
      updateDoc(docRef, {
        matchedProfiles: matchedProfiles
      });
    }
  }
  checkMatches(uid);

}


const checkMatches = async (uid) => {

  const homeScRef = collection(db, "chats");

  try {
    // Query for documents where `users` array contains `uid`
    const q1 = query(homeScRef, where("users", "array-contains", uid));
    // Query for documents where `users` array contains `auth.currentUser.uid`
    const q2 = query(homeScRef, where("users", "array-contains", auth.currentUser.uid));

    // Get the documents for both queries
    const [docsWithUid, docsWithCurrentUserUid] = await Promise.all([
      getDocs(q1),
      getDocs(q2)
    ]);

    // Create a set of document IDs where `uid` is present
    const docsWithUidIds = new Set(docsWithUid.docs.map(doc => doc.id));

    // Check if any of the documents with `auth.currentUser.uid` also have `uid`
    for (const doc of docsWithCurrentUserUid.docs) {
      if (docsWithUidIds.has(doc.id)) {
        console.log("Already matched");
        return; // Exit the function if a match is found
      }
    }}
    catch (error) {

    }

  //check if the users have both matched each other
  const docRef = doc(db, "users", uid);
  const docRef2 = doc(db, "users", auth.currentUser.uid);
 const docSnap = await getDoc(docRef);
 const docSnap2 = await getDoc(docRef2);
  if (docSnap.exists() && docSnap2.exists()) {
    let matchedProfiles = docSnap.data().matchedProfiles||[];
    let matchedProfiles2 = docSnap2.data().matchedProfiles||[];


    if (matchedProfiles.includes(auth.currentUser.uid) && matchedProfiles2.includes(uid)) {

      notify("Match",
        "You have been matched");


      const docRef3 = await addDoc(collection(db, "chats"), {
        users: [auth.currentUser.uid, uid],
        messages: [{
          _id: 1,
          text: 'You have been matched',
          createdAt: new Date(),
          system: true,
          // Any additional custom parameters are passed through
        }]
      });
        const chats1= docSnap.data().chats||[]
        chats1.push(docRef3.id)
         updateDoc(docRef, {
          chats: chats1});
          const chats2= docSnap2.data().chats||[]
          chats2.push(docRef3.id)
           updateDoc(docRef2, {
            chats: chats2});
            console.log(docRef3.id);
      return true;
     }

  }

}

const starredAction = async (uid) => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let starredProfiles = docSnap.data().starredProfiles||[];
    // console.log(starredProfiles.includes(uid));
    if (!starredProfiles.includes(uid)) {
      starredProfiles.push(uid);
      updateDoc(docRef, {
        starredProfiles: starredProfiles
      });
    }
  }

}

const interests = [
  { label: 'Photography', icon: 'camera-alt' },
  { label: 'Shopping', icon: 'shopping-cart' },
  { label: 'Karaoke', icon: 'mic' },
  { label: 'Yoga', icon: 'self-improvement' },
  { label: 'Cooking', icon: 'kitchen' },
  { label: 'Tennis', icon: 'sports-tennis' },
  { label: 'Running', icon: 'directions-run' },
  { label: 'Swimming', icon: 'pool' },
  { label: 'Art', icon: 'palette' },
  { label: 'Travelling', icon: 'flight' },
  { label: 'Extreme Sports', icon: 'sports-mma' },
  { label: 'Music', icon: 'music-note' },
  { label: 'Drinking', icon: 'local-bar' },
  { label: 'Video Games', icon: 'videogame-asset' }
];

const religiosity = [
  { label: "Sunni", icon: "brightness-5" },
  { label: "Halal Only", icon: "restaurant" },
  { label: "Moderately Practicing", icon: "event" },
  { label: "Smokes Occasionally", icon: "smoking-rooms" }
];

const futurePlans = [
  { label: "Wants Children", icon: "child-care" },
  { label: "Will not move abroad", icon: "home" }
];

const languageEth = [
  { label: "English", icon: "language" },
  { label: "Pakistani", icon: "flag" },
  { label: "Grew up in Australia", icon: "place" }
];

const ProfileDetailScreen = () => {
  const [isPaid, setIsPaid] = React.useState(false);
  useEffect(()=>{
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {

if (docSnap.exists()) {
  if(docSnap.data().accountType === "paid"){
    setIsPaid(true);
  }
  else if(docSnap.data().accountType === "free"){
    setIsPaid(false);
  }
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}})
  })
  
  const { profile: profileString } = useLocalSearchParams();
  const profile = JSON.parse(profileString);
  console.log(profile);

  const renderButtons = (title, items) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.buttonContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.button}>
            <Icon name={item.icon} size={16} color="#43CEBA" />
            <Text style={styles.buttonText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
  const renderInterests = (title, items) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.buttonContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.button}>
            <Icon name={interests[findValue(interests,item)].icon} size={16} color="#43CEBA" />
            <Text style={styles.buttonText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderReligousity = (title, items) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.buttonContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.button}>
            {/* <Icon name={interests[findValue(interests,item)].icon} size={16} color="#43CEBA" /> */}
            <Text style={styles.buttonText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
           {!profile.isPaid ? (
            <Image source={{uri: profile.photos[0]}} style={styles.image} blurRadius={10}/>
          ) : (
            <Image source={{uri: profile.photos[0]}} style={styles.image} />
          )}
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={()=>{
              rejectAction(profile.uid);
              // console.log("Reject");
            }}>
              <Image source={reject} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              matchAction(profile.uid);
              //
              // console.log("Reject");
            }}>
            <Image source={match} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              starredAction(profile.uid);
              // console.log("Reject");
            }}>
              <Image source={stared} style={styles.icon} />
            </TouchableOpacity>
           
           
            
          </View>
          <Text style={styles.nameText}>{profile.firstName} {profile.lastName}</Text>
          <Text style={styles.locationText}>{profile.address}</Text>
          
          <Text style={styles.bioTitle}>About Me</Text>
          <Text style={styles.bioText}>
          {profile.biography}
          {"\n\n"}
          {profile.tagline}
          </Text>

          {renderReligousity("Religiosity", [profile.diet, profile.sect])}
          {renderButtons("Future Plans", [profile.livingArrangements])}
          {renderInterests("Interests", profile.selectedInterests)}
          {renderButtons("Language and Ethnicity", [profile.language, profile.ethnicOrigin, profile.ethnicGroup])}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    opacity: 1,
    height: height * 0.6,
  },
  image: {
    opacity: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -height * 0.1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: -50,
  },
  icon: {
    width: 56,
    height: 56,
    marginHorizontal: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  bioTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  bioText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#43CEBA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default ProfileDetailScreen;