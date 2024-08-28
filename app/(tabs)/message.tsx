import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { Customback } from './matches'
import backgreenarrow from "../../assets/images/backgreenarrow.png"
import filterGreen from "../../assets/images/filtergreen.png"
import {  FlatList,  TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'




const message = () => {
  
  const [conversations, setConversations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const refresh =() => {
    // const chatRef = collection(db, "chats");
    const chatRef =query( collection(db, "chats"), orderBy("lastUpdated", "desc"));
     let convs=[]
    getDocs(chatRef).then((querySnapshot) => {
      setLoading(true)
      const currentUserUid = 'current-user-uid'; 
      // Replace with the current user's UID
      
     
      querySnapshot.forEach((document) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(document.id, " => ", document.data());
       
        const otherUid = document.data().users.filter((uid: string) => uid !==  auth.currentUser?.uid)[0];
        const docRef2= doc(db, "users", otherUid);
        
  
        getDoc(docRef2).then((doc) => {
          const messageRef = query(collection(db, "chats", document.id, "messages"));
           let lastMessageInConvesation=`You have just matched with this ${doc?.data()?.firstName}`;
          getDocs(messageRef).then((querySnapshot) => {
          const messages = querySnapshot.docs.map((doc) => doc.data());
          const messageData = messages[messages.length - 1];
          console.log(messageData);
          
        if(messageData){if(messageData.user?._id==otherUid){
          if(messageData.read==false){
            lastMessageInConvesation="Unread:"+messageData.text}
        
        }
        else
        {
          lastMessageInConvesation=messageData.text
        }}
        console.log(lastMessageInConvesation)
         const name=doc?.data()?.firstName+" "+doc?.data()?.lastName;
         const image=doc?.data()?.photos[0];
          const data ={
            id: document.id,
            name,
            message:lastMessageInConvesation,
            image
          }
          convs.push(data)
          
  
        });
        });
        
       
        
      });
    }).finally(()=>{
      setConversations(convs)
      console.log(conversations)
      setLoading(false)
  
    
    });
    
  }

  useEffect(()=>{refresh()},[message])

  const router = useRouter()
  const ConversationItem = ({ item }) => (
  console.log(item),
    <TouchableOpacity style={styles.conversationItem} onPress={()=>{
      router.push({
        pathname: `/(messaging)/Chat/${item.id}`,
        params: { itemId: JSON.stringify(item.id) }
      });
    }}>
      <View style={styles.avatar} >
        <Image source={{uri: item.image}} style={{ height: 50, width: 50, objectFit: 'contain',borderRadius: 25 }} />
        </View>
      <View style={styles.conversationDetails}>
        <View style={styles.nameTimeContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );



  return (
    <>
      {!loading ? (
        <>
          <Stack.Screen
            options={{
              headerLeft: () => <Customback />,
              headerTitleAlign: 'center',
              headerTitle: 'Matches',
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }}>
                  <Image
                    source={filterGreen}
                    style={{ height: 38, width: 38, objectFit: 'contain' }}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color="#888"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Chat"
                placeholderTextColor="#888"
              />
            </View>
            <FlatList
              data={conversations}
              renderItem={({ item }) => <ConversationItem item={item} />}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}

export default message

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginRight: 15,
  },
  conversationDetails: {
    flex: 1,
  },
  nameTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  time: {
    color: 'gray',
    fontSize: 12,
  },
  message: {
    color: 'gray',
  },
  unreadBadge: {
    backgroundColor: '#20B2AA',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
  },
});