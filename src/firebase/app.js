import { initializeApp } from 'firebase/app'

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID

const firebaseConfig = {
  apiKey, // Auth / General Use
  authDomain, // Auth with popup/redirect
  projectId, // General Use
  databaseURL, // Realtime Database
  storageBucket, // Storage
  messagingSenderId, // Cloud Messaging
}

export const firebase = initializeApp(firebaseConfig)
