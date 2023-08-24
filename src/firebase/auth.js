'use client'

import { useState, useEffect } from 'react'
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  linkWithPopup,
  signInWithCredential,
  signOut,
} from 'firebase/auth'
import { firebase } from './app'

export const auth = getAuth(firebase)

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  photoUrl: user.photoURL,
  name: user.displayName,
  userSubscription: user?.userSubscription ? user.userSubscription : null,
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
    const formattedUser = formatAuthUser(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
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
