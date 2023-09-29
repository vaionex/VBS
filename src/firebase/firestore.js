import { firebase } from './app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { updateProfile } from '../firebase/auth'
import { auth } from './app'

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

export const storeUserData = async (formattedUser, firstName, lastName) => {
  const userRef = doc(firestore, 'users', formattedUser.uid)

  try {
    await setDoc(userRef, {
      firstName: firstName,
      lastName: lastName,
    })
    const currentUser = auth.currentUser

    await updateProfile(currentUser, {
      displayName: `${firstName} ${lastName}`,
    })
  } catch (error) {
    console.error('Error storing user data:', error)
    throw error
  }
}

export const updateUserData = async (userId, updatedObj) => {
  const docRef = doc(firestore, 'users', userId)
  await setDoc(docRef, updatedObj, { merge: true })
}
