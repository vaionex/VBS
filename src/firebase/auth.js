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
  signOut,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { firebase } from '@/firebase/app'
import { createUserDocument } from '@/utils/createUserCollection'

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
  const [loading, setLoading] = useState(true)

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const formattedUser = formatAuthUser({
      ...authState,
    })
    setAuthUser(formattedUser)
    setLoading(false)
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
    loading,
    setAuthUser,
    updateUserData,
  }
}

export const auth = getAuth(firebase)

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
export const resetUserPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (error) {
    console.error(error)
  }
}
