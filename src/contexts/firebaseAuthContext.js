'use client'

import React, { createContext, useContext } from 'react'
import { useFirebaseAuth } from '@/firebase/auth'
import { Toaster } from '@/components/UI/toaster'

export const FirebaseAuthContext = createContext()

export const FirebaseAuthProvider = ({ children }) => {
  const firebaseAuth = useFirebaseAuth()

  return (
    <FirebaseAuthContext.Provider value={firebaseAuth}>
      {children}
      <Toaster />
    </FirebaseAuthContext.Provider>
  )
}

export const useFirebaseAuthContext = () => {
  return useContext(FirebaseAuthContext)
}
