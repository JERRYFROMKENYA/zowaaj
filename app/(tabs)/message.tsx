import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Customback } from './matches'
import backgreenarrow from "../../assets/images/backgreenarrow.png"
import filterGreen from "../../assets/images/filtergreen.png"

import {  FlatList,  TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const conversations = [
  { id: '1', name: 'Muhammad Sumbul', message: 'You: Hey! how are you?', time: '5:00 AM', unread: 1 },
  { id: '2', name: 'Surya Al Khwarizmi', message: 'Thanks', time: '5:15 AM', unread: 2 },
  { id: '3', name: 'Arya Holoand', message: 'Same to me, let\'s our photos in the same...', time: '5:30 AM', unread: 0 },
  { id: '4', name: 'Haaland Wiyono', message: 'I\'m thinking of getting a new camera lenses...', time: '5:45 AM', unread: 0 },
  { id: '5', name: 'Bot KenChan', message: 'Hey! Wanna train in Phasmaphobia tonight...', time: '6:00 AM', unread: 0 },
  { id: '6', name: 'Ridwan Gotze', message: 'You: How was our app for so long? Can\'t...', time: '6:30 AM', unread: 0 },
  { id: '7', name: 'Mas Rijal', message: 'What\'s your take on dating?', time: '8:10 AM', unread: 0 },
  { id: '8', name: 'Endrick Felipe', message: 'Are you someone who enjoys the thrill of meeting...', time: '9:00 AM', unread: 0 },
];
const ConversationItem = ({ item }) => (
  <TouchableOpacity style={styles.conversationItem}>
    <View style={styles.avatar} />
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

const message = () => {
  return (
    <>
    <Stack.Screen options={{
        headerLeft: () => <Customback />,
        headerTitleAlign: 'center',
        headerTitle: 'Matches',
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Image source={filterGreen} style={{ height: 38, width: 38, objectFit: 'contain' }} />
          </TouchableOpacity>
        )
      }} />
      
      <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
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
  )
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