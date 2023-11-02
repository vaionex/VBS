'use client'

import React, { createContext, useContext } from 'react'
import { useFirebaseAuth } from '@/firebase/auth'
import { Toaster } from '@/components/UI/toaster'
import { useSupabaseAuth } from '@/supabase/supaAuth'

export const FirebaseAuthContext = createContext()

export const SupabaseAuthContext = createContext()

export const FirebaseAuthProvider = ({ children }) => {
  const firebaseAuth = useFirebaseAuth()

  return (
    <FirebaseAuthContext.Provider value={firebaseAuth}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export const SupabaseAuthProvider = ({ children }) => {
  const supabaseAuth = useSupabaseAuth()

  return (
    <SupabaseAuthContext.Provider value={supabaseAuth}>
      {children}
    </SupabaseAuthContext.Provider>
  )
}

export const CombinedAuthProvider = ({ children }) => {
  return (
    <>
      {process.env.NEXT_PUBLIC_BACKEND_PLATFORM === 'supabase' ? (
        <SupabaseAuthProvider>{children}</SupabaseAuthProvider>
      ) : (
        <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
      )}
      <Toaster />
    </>
  )
}

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext)
export const useSupabaseAuthContext = () => useContext(SupabaseAuthContext)
