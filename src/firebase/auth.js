'use client'

import { useState, useEffect } from 'react'
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
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
import { firebase } from './app'
import { createUserAndFetchDocument } from '@/firebase/firestore'

export const auth = getAuth(firebase)

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  photoUrl: user.photoURL,
  name: user.displayName,
  firstName: user.firstName,
  lastName: user.lastName,
})

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
    const formattedUser = formatAuthUser(authState)
    setAuthUser(formattedUser)
    setIsLoading(false)
  }

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => unsubscribe()
  }, [])

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
  }
}

export const signInWithGoogle = async (authUser, updateUserData) => {
  const provider = new GoogleAuthProvider()
  try {
    let res
    if (authUser) {
      try {
        res = await linkWithPopup(auth.currentUser, provider)
        const user = res.user
        console.log('Accounts successfully linked')
        updateUserData(formatAuthUser(user))
        return { status: 'success' }
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
        return { status: 'error' }
      }
    } else {
      try {
        await signInWithPopup(auth, provider)
        console.log('Accounts successfully logged')
        return { status: 'success' }
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
  email,
  password,
  firstName,
  lastName,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user

    const userData = await createUserAndFetchDocument(user, {
      firstName,
      lastName,
      email,
    })

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
    const passwordResetEmail = await sendPasswordResetEmail(auth, email)
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
