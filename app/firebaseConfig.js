// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx2lZ22orRocz6_MYTScV0Z9g1t5aZx80",
  authDomain: "zowaaj-dating.firebaseapp.com",
  projectId: "zowaaj-dating",
  storageBucket: "zowaaj-dating.appspot.com",
  messagingSenderId: "158629367080",
  appId: "1:158629367080:web:7ca1fbeee1263203ddd41d",
  measurementId: "G-BTMVSN5YT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);