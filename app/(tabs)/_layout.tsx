import React from 'react';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';

// Import PNG images
import marriageIcon from '../../assets/images/homeicon.png';
import matchesIcon from '../../assets/images/matches.png';
import messageIcon from '../../assets/images/message.png';
import profileIcon from '../../assets/images/profile.png';

import notificationIcon from "../../assets/images/notificationicon.png";
import filterIcon from "../../assets/images/filtericon.png";
import { useAuth } from '../providers/AuthProvider';

const _layout = () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60, // Increase the height of the tab bar
          paddingBottom: 10, // Add padding at the bottom
          paddingTop: 10, // Add padding at the top
        },
        tabBarActiveTintColor: '#43CEBA', // Color for active tab
        tabBarInactiveTintColor: 'black', // Color for inactive tab
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          headerTitle: 'Discover',
          headerShadowVisible: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={marriageIcon}
              style={{
                width: 24,
                height: 24,
                objectFit: 'contain',
                tintColor: focused ? '#43CEBA' : 'black'
              }}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => router.push('notificationscreen')}>
                <Image source={notificationIcon} style={{ width: 38, height: 38, marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={filterIcon} style={{ width: 38, height: 38, marginRight: 15 }} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='matches'
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={matchesIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#43CEBA' : 'black'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='message'
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={messageIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#43CEBA' : 'black'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={profileIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#43CEBA' : 'black'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen name='profiledetail/[id]' options={{ href: null, headerShown: false }} />
      {/* <Tabs.Screen name='profile/[id]' options={{ href: null, headerShown: false }} /> */}
      {/* <Tabs.Screen name='[profile]/page' options={{ href: null, headerShown: false }} /> */}
    </Tabs>
  );
};

export default _layout;