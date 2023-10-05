import { firebase } from './app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

export const firestore = getFirestore(firebase)

export const updateUserDocs = async (userId, updatedObj) => {
  const docRef = doc(firestore, 'users', userId)
  await setDoc(docRef, updatedObj, { merge: true })
}
export const updateCustomerData = async (userId, updatedObj) => {
  const docRef = doc(firestore, 'users', userId)
  await setDoc(docRef, updatedObj, { merge: true })
}
export const getCurrentUserData = async (userId) => {
  const docRef = doc(firestore, 'users', userId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  }
  return null
}
