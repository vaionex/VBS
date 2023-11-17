import { initializeApp, getApps } from 'firebase/app'

const backendPlatform = process.env.NEXT_PUBLIC_BACKEND_PLATFORM
let firebase

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
}

if (backendPlatform === 'firebase' && !getApps().length) {
  firebase = initializeApp(firebaseConfig)
}

export { firebase }
