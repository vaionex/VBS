'use client'

import React, { createContext, useContext } from 'react'
import { useFirebaseAuth } from '@/firebase/auth'
import { ToastContainer } from 'react-toastify'

export const FirebaseAuthContext = createContext()

export const FirebaseAuthProvider = ({ children }) => {
  const firebaseAuth = useFirebaseAuth()

  return (
    <FirebaseAuthContext.Provider value={firebaseAuth}>
      {children}
      <ToastContainer />
    </FirebaseAuthContext.Provider>
  )
}

export const useFirebaseAuthContext = () => {
  return useContext(FirebaseAuthContext)
}
