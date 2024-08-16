import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as eva from '@eva-design/eva';
import { Image, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

import backButton from "../assets/images/backarrow.png";
import {GestureHandlerRootView} from "react-native-gesture-handler"

import { Customback } from './(tabs)/matches';
import AuthProvider from './providers/AuthProvider';

SplashScreen.preventAutoHideAsync();

// Custom back button component
const CustomBackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
      <Image source={backButton} style={{ height: 38, width: 38, objectFit: 'contain' }} />
    </TouchableOpacity>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
  <GestureHandlerRootView>
      <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name='signup' options={{ headerShown: false }} />
        <Stack.Screen
          name='profileDetailsone'
          options={{
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: 'Profile Details',
            headerLeft: () => <CustomBackButton />
          }}
        />
        <Stack.Screen
          name='profileDetailstwo'
          options={{
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: 'Profile Details',
            headerLeft: () => <CustomBackButton />
          }}
        />
        <Stack.Screen
          name='profilesScreenthree'
          options={{
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: 'Profile Details',
            headerLeft: () => <CustomBackButton />
          }}
        />
        <Stack.Screen
          name='profileDetailsfour'
          options={{
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: 'Profile Details',
            headerLeft: () => <CustomBackButton />
          }}
        />

        <Stack.Screen
          name='profileDetailsFive'
          options={{
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: 'Profile Details',
            headerLeft: () => <CustomBackButton />
          }}
        />

        <Stack.Screen
          name='profileDetailsSix'
          options={{
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: 'Add your Photos',
            headerLeft: () => <CustomBackButton />
          }}
        />
        <Stack.Screen
          name='profileDetailsSeven'
          options={{
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: 'Verify who you are',
            headerLeft: () => <CustomBackButton />
          }}
        />
        <Stack.Screen name='notificationscreen' options={{ headerTitle: 'Notification', headerTitleAlign: 'center', headerLeft: () => <Customback /> }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

      </Stack>
    </AuthProvider>
  </GestureHandlerRootView>
  );
}