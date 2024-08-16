import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

import ProfileCard from '../components/ProfileCard';
import profileimg1 from '../../assets/images/profileimg1.jpg';
import reject from '../../assets/images/reject.png';
import match from '../../assets/images/match.png';
import stared from '../../assets/images/stared.png';

const HomeScreen = () => {


  const profiles = [
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
        keyExtractor={(item) => item.id}
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
