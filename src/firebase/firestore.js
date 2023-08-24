import { firebase } from './app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

export const firestore = getFirestore(firebase)

export const createUserAndFetchDocument = async (user, additionalData) => {
  if (!user) return null

  const userRef = doc(firestore, 'users', user.uid)

  const snapshot = await getDoc(userRef)
  if (!snapshot.exists()) {
    const { email } = user
    const { firstName, lastName } = additionalData

    try {
      await setDoc(userRef, {
        firstName,
        lastName,
        email,
        // ...other data
      })
    } catch (error) {
      console.error('Error creating user document', error)
      return null
    }
  }

  const userDocument = await getDoc(userRef)
  return { uid: user.uid, ...userDocument.data() }
}

// const { user } = await createUserWithEmailAndPassword(auth, email, password);
// const userData = await createUserAndFetchDocument(user, { firstName, lastName });
