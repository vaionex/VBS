import { initializeApp } from 'firebase/app'
import { config } from 'dotenv'

config()

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
} = process.env

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY, // Auth / General Use
  authDomain: FIREBASE_AUTH_DOMAIN, // Auth with popup/redirect
  databaseURL: FIREBASE_DATABASE_URL, // Realtime Database
  storageBucket: FIREBASE_STORAGE_BUCKET, // Storage
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID, // Cloud Messaging
}

export const app = initializeApp(firebaseConfig)
