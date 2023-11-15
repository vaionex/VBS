'use client'

import { useState, useEffect } from 'react'
import {
  GoogleAuthProvider,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithPopup,
  linkWithPopup,
  signInWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { firebase } from '@/firebase/app'
import { createUserDocument } from '@/utils/createUserCollection'
import { getCurrentUserData } from '@/firebase/firestore'
import { getUserCurrentPlan } from '@/utils/stripe'

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  photoUrl: user.photoURL,
  name: user.displayName,
  firstName: user.firstName,
  lastName: user.lastName,
  userSubscription: user?.userSubscription ? user.userSubscription : null,
})
let auth
if (firebase) {
  auth = getAuth(firebase)
}

export { auth }

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    let userData = await getCurrentUserData(authState.uid)
    let userSubscription = await getUserCurrentPlan(authState.uid)
    const formattedUser = formatAuthUser({
      ...authState,
      ...userData,
      userSubscription,
    })
    setAuthUser(formattedUser)
    setIsLoading(false)
  }

  // listen for Firebase state change
  useEffect(() => {
    let unsubscribe = () => {}
    if (auth) {
      unsubscribe = onAuthStateChanged(auth, authStateChanged)
    }
    return () => unsubscribe()
  }, [auth])

  const updateUserData = async (newCustomData) => {
    setAuthUser((prev) => ({
      ...prev,
      ...newCustomData,
    }))
  }
  return {
    authUser,
    isLoading,
    updateUserData,
    setAuthUser,
    updateUserData,
  }
}

export const signInWithGoogle = async (authUser, updateUserData) => {
  if (!auth) return
  const provider = new GoogleAuthProvider()
  try {
    let res

    if (authUser) {
      try {
        res = await linkWithPopup(auth.currentUser, provider)
        const user = res.user
        console.log('Accounts successfully linked')
        updateUserData(formatAuthUser(user))
        return { status: 'success', user }
      } catch (error) {
        if (error?.code === 'auth/credential-already-in-use') {
          console.log('User exists, signing user in')
          const credential = GoogleAuthProvider.credentialFromResult(
            error.customData,
          )
          await signInWithCredential(auth, credential)
          console.log('User signed in')
          return { status: 'success' }
        }
        console.error('Error linking account', error)
        return { status: 'error' }
      }
    } else {
      try {
        res = await signInWithPopup(auth, provider)
        const user = res.user
        console.log('Accounts successfully logged')
        return { status: 'success', user }
      } catch (error) {
        console.log('Signing user error', error)
        return { status: 'error' }
      }
    }
  } catch (error) {
    console.error('Error', error)
    return { status: 'error' }
  }
}

export const logoutUser = async () => {
  try {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful')
      })
      .catch((error) => {
        console.log('Sign-out fail', error)
      })
  } catch (error) {
    console.error('Error logging out user:', error)
  }
}

export const registerWithEmailAndPassword = async (
  authUser,
  updateUserData,
  { email, password, firstName, lastName },
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user
    const userData = await createUserDocument(user, {
      firstName,
      lastName,
    })

    if (!userData) {
      throw new Error('User data could not be created.')
    }

    return formatAuthUser(userData)
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

export const signInWithEmail = async (formData, rememberMe) => {
  const { email, password } = formData

  try {
    if (!rememberMe) {
      await setPersistence(auth, browserSessionPersistence)
    }
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user

    return formatAuthUser(user)
  } catch (error) {
    console.error('Error signing in with email and password:', error)
    throw error
  }
}

export const updateEmailAddress = async (currentEmail, password, newEmail) => {
  try {
    const user = auth.currentUser

    const credential = EmailAuthProvider.credential(currentEmail, password)
    await reauthenticateWithCredential(user, credential)
    await updateEmail(user, newEmail)

    return true
  } catch (error) {
    throw error
  }
}

export const updateUserPassword = async (
  email,
  currentPassword,
  newPassword,
) => {
  try {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    await updatePassword(user, newPassword)

    return true
  } catch (error) {
    throw error
  }
}

export const resetUserPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (error) {
    throw error
  }
}

export const updateUserProfile = async (obj) => {
  try {
    await updateProfile(auth.currentUser, obj)
  } catch (error) {
    throw error
  }
}
