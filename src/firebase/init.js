import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import config from './config'

const firebaseApp = initializeApp({ ...config })
const firebaseDb = getFirestore(firebaseApp)
const firebaseAuth = getAuth(firebaseApp)
const firebaseStorage = getStorage(firebaseApp)

export { firebaseApp, firebaseAuth, firebaseDb, firebaseStorage }
