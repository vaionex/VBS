import supabase from '@/supabase/app'
import { useState, useEffect } from 'react'

export const useSupabaseAuth = () => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthUser(session?.user || null)
      },
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return {
    authUser,
    setAuthUser,
  }
}

export const registerWithEmailAndPassword = async (
  email,
  password,
  firstName,
  lastName,
) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  if (user) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ id: user.id, first_name: firstName, last_name: lastName }])

    if (error) throw error
  }

  return user
}

export const signInWithGoogle = async () => {
  const { user, error } = await supabase.auth.signIn({
    provider: 'google',
  })

  if (error) throw error
  return user
}

export const signInWithEmail = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  })

  if (error) throw error
  return user
}

export const logoutUser = () => supabase.auth.signOut()

export const resetUserPassword = async (email) => {
  const { error } = await supabase.auth.api.resetPasswordForEmail(email)
  if (error) throw error
}
