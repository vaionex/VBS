import { firebaseAuth, firebaseDb } from '@/firebase/init'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
  listAll,
} from 'firebase/storage'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
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
    const auth = await signInWithEmailAndPassword(firebaseAuth, email, password)
    return {
      name: auth.user.displayName,
      uid: auth.user.uid,
      email: auth.user.email,
      photoURL: auth.user.photoURL,
    }
  } catch (error) {
    return { error: 'Incorrect email or password.' }
  }
}

const firebaseRegister = async ({ username, email, password }) => {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)

    await updateProfile(firebaseAuth.currentUser, {
      displayName: `${username}`,
    })

    const infos = {
      displayName: firebaseAuth.currentUser.displayName,
      email: firebaseAuth.currentUser.email,
      uid: firebaseAuth.currentUser.uid,
      photoPATH: firebaseAuth.currentUser.photoURL,
      createdAt: firebaseAuth.currentUser.metadata.creationTime,
    }

    await setDoc(doc(firebaseDb, 'users', firebaseAuth.currentUser.uid), infos)

    const user = await firebaseGetUserInfoFromDb(firebaseAuth.currentUser.uid)

    return user.displayName
  } catch (error) {
    return { error: 'Email has already been taken.' }
  }
}

const firebaseLogout = async () => {
  await firebaseAuth.signOut()
}

const firebaseGetAuthorizedUser = () => {
  const fn = firebaseAuth.onAuthStateChanged(async (userResponse) => {
    if (userResponse) {
      const user = await firebaseGetUserInfoFromDb(userResponse.uid)
      store.dispatch(
        setUserData({
          name: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        }),
      )
    } else {
      console.log('not auth')
    }
  })

  return fn
}

const firebaseLoginWithGoogle = async () => {
  try {
    const firebaseGoogleProvider = new GoogleAuthProvider()
    const userInfo = await signInWithPopup(firebaseAuth, firebaseGoogleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        const userInfoFromDb = await firebaseGetUserInfoFromDb(user.uid)
        if (!userInfoFromDb) {
          const infos = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoPATH: null,
            createdAt: user.metadata.creationTime,
          }

          await setDoc(doc(firebaseDb, 'users', user.uid), infos)
          store.dispatch(
            setUserData({
              name: user.displayName,
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
            }),
          )
        } else {
          store.dispatch(
            setUserData({
              name: user.displayName,
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
            }),
          )
        }
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

const firebaseResetPassword = async (user, newPassword) => {
  try {
    await updatePassword(user, newPassword)

    return { success: 'Password change successful.' }
  } catch (error) {
    console.log(error)
    return {
      error: error.message,
    }
  }
}

const firebaseUpdateProfilePicture = async ({ user, file, filePath }) => {
  if (user && file && filePath) {
    const storage = getStorage()
    const userInfoFromDb = await firebaseGetUserInfoFromDb(user.uid)
    const userRef = doc(firebaseDb, 'users', user.uid)
    const fileRef = ref(storage, filePath)
    const oldRef = ref(storage, userInfoFromDb.photoPATH)

    await uploadBytes(fileRef, file).then(async (snapshot) => {
      const firebaseProfileURL = await getDownloadURL(snapshot.ref)
      await updateProfile(user, {
        photoURL: firebaseProfileURL,
      }).then(async () => {
        if (userInfoFromDb.photoPATH) {
          deleteObject(oldRef).catch((error) => console.log(error))
        }
        store.dispatch(
          setUserData({
            name: userInfoFromDb.displayName,
            uid: userInfoFromDb.uid,
            email: userInfoFromDb.email,
            photoURL: firebaseProfileURL,
          }),
        )
        await updateDoc(userRef, {
          ...userInfoFromDb,
          photoPATH: filePath,
        })
      })
    })
    return { message: 'successful' }
  }
  return { message: 'fail' }
}

const firebaseUpdateProfilDetails = async ({
  user,
  password,
  username,
  photoURL,
}) => {
  const userInfoFromDb = await firebaseGetUserInfoFromDb(user.uid)
  const userRef = doc(firebaseDb, 'users', user.uid)
  if (username) {
    await updateProfile(user, {
      displayName: username,
    }).then(async () => {
      await updateDoc(userRef, {
        ...userInfoFromDb,
        displayName: username,
        username: username,
      })
      store.dispatch(
        setUserData({
          name: username,
          uid: userInfoFromDb.uid,
          email: userInfoFromDb.email,
          photoURL: photoURL,
        }),
      )
    })
  }
  if (password) {
    await firebaseResetPassword(user, password)
  }
}

export {
  firebaseLogin,
  firebaseRegister,
  firebaseGetAuthorizedUser,
  firebaseLogout,
  firebaseUpdateProfilePicture,
  firebaseUpdateProfilDetails,
  firebaseLoginWithGoogle,
}
