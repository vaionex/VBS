import { firebase } from './app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

export const firestore = getFirestore(firebase)

export const updateUserData = async (userId, updatedObj) => {
  const docRef = doc(firestore, 'users', userId)
  await setDoc(docRef, updatedObj, { merge: true })
}
