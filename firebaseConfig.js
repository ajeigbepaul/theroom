import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Check if authentication has already been initialized
let authInstance = getAuth(app);

if (!authInstance) {
  // If not initialized, initialize with persistence
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  // If already initialized, check the persistence mechanism
  const persistenceType = authInstance.settings.persistence;
  if (!persistenceType || persistenceType !== 'LOCAL') {
    // If not using AsyncStorage, update persistence
    authInstance.settings = {
      ...authInstance.settings,
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    };
  }
}

export const FIREBASE_AUTH = authInstance;
export const FIREBASE_STORAGE = getStorage(app);
export const FIRESTORE_DB = getFirestore(app);
