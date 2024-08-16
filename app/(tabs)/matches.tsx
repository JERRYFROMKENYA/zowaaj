import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import backgreenarrow from "../../assets/images/backgreenarrow.png"
import filterGreen from "../../assets/images/filtergreen.png"
import { Ionicons } from '@expo/vector-icons'

export const Customback = () => {
  const router = useRouter()
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
      <Image source={backgreenarrow} style={{ height: 38, width: 38, objectFit: 'contain' }} />
    </TouchableOpacity>
  )
}

const Matches = () => {
  const tabs = ['Liked you', 'Visited you', 'Favourited', 'Liked'];
  const matches = [
    { id: '1', name: 'Clyra Monica', age: 21, location: 'Thane, Czech Republic' },
    { id: '2', name: 'Maria Icabes', age: 22, location: 'Porto, Philippines' },
  ];

  const renderMatchItem = ({ item }) => (
    <View style={styles.matchCard}>
      <View style={styles.profilePicPlaceholder} />
      <Text style={styles.nameText}>{item.name}, {item.age}</Text>
      <Text style={styles.locationText}>{item.location}</Text>
    </View>
  );

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
        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity key={index} style={styles.tab}>
              <Text style={[styles.tabText, index === 0 && styles.activeTabText]}>{tab}</Text>
              {index === 0 && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.subHeaderText}>Liked you</Text>
        <FlatList
          data={matches}
          renderItem={renderMatchItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.matchList}
        />
        {/* <View style={styles.bottomNav}>
          <Ionicons name="chatbubble-outline" size={24} color="gray" />
          <Ionicons name="people" size={24} color="#20B2AA" />
          <Ionicons name="mail-outline" size={24} color="gray" />
          <Ionicons name="person-outline" size={24} color="gray" />
        </View> */}
      </SafeAreaView>
    </>
  )
}

export default Matches

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  tabText: {
    color: 'gray',
  },
  activeTabText: {
    color: '#20B2AA',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '80%',
    backgroundColor: '#20B2AA',
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
  },
  matchList: {
    justifyContent: 'space-around',
  },
  matchCard: {
    width: '45%',
    aspectRatio: 0.7,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  profilePicPlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#d0d0d0',
    borderRadius: 8,
    marginBottom: 8,
  },
  nameText: {
    fontWeight: 'bold',
  },
  locationText: {
    color: 'gray',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
  },
})