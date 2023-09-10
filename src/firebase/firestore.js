import { firebase } from './app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

export const firestore = getFirestore(firebase)

export const createUserDocument = async (
  user,
  additionalData = {},
  method = null,
) => {
  if (!user) return null

  const userRef = doc(firestore, 'users', user.uid)
  const snapshot = await getDoc(userRef)

  if (!snapshot.exists()) {
    const { email } = user
    const createdAt = new Date()

    let dataToSave = {
      email,
      createdAt,
      ...additionalData,
    }

    if (method === 'google') {
      dataToSave = {
        ...dataToSave,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
    }

    await setDoc(userRef, dataToSave)

    return { uid: user.uid, email, createdAt, ...additionalData }
  }

  return null
}
