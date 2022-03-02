import {
  firebaseAuth,
  firebaseDb,
} from '@/firebase/init'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import store from '@/redux/store'
import { setUserData } from '@/redux/slices/auth'

const firebaseGetUserInfoFromDb = async (id) => {
  try {
    const docRef = doc(firebaseDb, 'users', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  } catch (error) {
    console.error(error)
  }
}

const firebaseLogin = async ({ email, password }) => {
  try {
    const user = await signInWithEmailAndPassword(firebaseAuth, email, password)

    return user
  } catch (error) {
    console.error(error)
  }
}

const firebaseRegister = async ({ firstname, lastname, email, password }) => {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)

    await updateProfile(firebaseAuth.currentUser, {
      displayName: `${firstname} ${lastname}`,
    })

    const infos = {
      name: firstname,
      lastname: lastname,
      displayName: firebaseAuth.currentUser.displayName,
      email: firebaseAuth.currentUser.email,
      uid: firebaseAuth.currentUser.uid,
      createdAt: firebaseAuth.currentUser.metadata.creationTime,
    }

    await setDoc(doc(firebaseDb, 'users', firebaseAuth.currentUser.uid), infos)

    const user = await firebaseGetUserInfoFromDb(firebaseAuth.currentUser.uid)

    return user
  } catch (error) {
    console.error(error)
  }
}

const firebaseLogout = async () => {
  await firebaseAuth.signOut()
}

const firebaseGetAuthorizedUser = () => {
  const fn = firebaseAuth.onAuthStateChanged(async (userResponse) => {
    if (userResponse) {
      const user = await firebaseGetUserInfoFromDb(userResponse.uid)
      store.dispatch(setUserData(user))
      localStorage.setItem('auth_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('auth_user')
    }
  })

  return fn
}

const firebaseLoginWithGoogle = async () => {
  try {
    const firebaseGoogleProvider = new GoogleAuthProvider()
    const userInfo = await signInWithPopup(firebaseAuth, firebaseGoogleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        return { credential, token, user }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.error({ errorCode, errorMessage, email, credential })
      })
    return userInfo?.user
  } catch (error) {
    console.error(error)
  }
}

export {
  firebaseLogin,
  firebaseRegister,
  firebaseGetAuthorizedUser,
  firebaseLogout,
  firebaseLoginWithGoogle,
}
