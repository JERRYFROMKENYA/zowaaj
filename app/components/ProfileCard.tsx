import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import reject from '../../assets/images/reject.png';
import match from '../../assets/images/match.png';
import stared from '../../assets/images/stared.png';
import { addDoc, collection, CollectionReference, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import message from '../(tabs)/message';

const { width } = Dimensions.get('window');

const ProfileCard = ({ profile }) => {
  const router = useRouter();
  const [isPaid, setIsPaid] = React.useState(false);

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

       const docRef3 = await addDoc(collection(db, "chats"), {
          users: [auth.currentUser.uid, uid],
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

  const handleProfilePress = () => {
    // console.log(profile);
    router.push({
      pathname: `/profiledetail/${profile.uid}`,
      params: { profile: JSON.stringify(profile) }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={handleProfilePress} >
          {!profile.isPaid ? (
            <Image source={{uri: profile.photos[0]}} style={styles.image} blurRadius={10}/>
          ) : (
            <Image source={{uri: profile.photos[0]}} style={styles.image} />
          )}
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{profile.firstName} {profile.lastName}</Text>
            <Text style={styles.locationText}>{profile.ethnicOrigin??" "}</Text>
            <View style={styles.tagsContainer}>
              {/* {profile.tags.map((item, index) => (
                <Text key={index} style={styles.tagText}>{item}</Text>
              ))} */}
            </View>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={
            () => {
              rejectAction(profile.uid);
              // console.log("Reject");
            }
          }>
            <Image source={reject} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}
          onPress={
            () => {
              matchAction(profile.uid);
              // console.log("Reject");
            }
          }
          >
            <Image source={match} style={styles.icon} 
            
            
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={
            () => {
              starredAction(profile.uid);
              // console.log("Reject");
            }
          }>
            <Image source={stared} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

export default ProfileCard

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginBottom: 30,
  },
  cardContainer: {
    position: 'relative',
    marginTop: 10,
    borderRadius: 26,
    overflow: 'visible',
  },
  image: {
    height: 400,
    width: '100%',
    borderRadius: 26,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  nameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  locationText: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tagText: {
    color: "white",
    fontSize: 14,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -28,
    left: 0,
    right: 0,
  },
  iconButton: {
    // width: 56,
    // height: 56,
    // marginHorizontal: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    // elevation: 5, // This will give a raised effect on Android
  },
  icon: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
    elevation: 5,
    marginHorizontal: 14
  },
})