import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import config from './config'

const firebaseApp = getApps().length === 0 ? initializeApp(config) : getApps()
const firebaseDb = getFirestore(firebaseApp)
const firebaseAuth = getAuth(firebaseApp)
const firebaseStorage = getStorage(firebaseApp)
const firebaseGoogleProvider = new GoogleAuthProvider()
const fireBaseSignOut = async () => await signOut(firebaseAuth)

export {
  firebaseApp,
  firebaseAuth,
  firebaseDb,
  firebaseStorage,
  firebaseGoogleProvider,
  fireBaseSignOut,
}
