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
    const { data, error: insertError } = await supabase.from('users').insert([
      {
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
    ])

    if (insertError) throw insertError
    return data
  } else {
    throw new Error(
      'User registration completed, but user object is not available.',
    )
  }
}

export const signInWithGoogle = async () => {
  try {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) throw error
    return user
  } catch (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
}

export const signInWithEmail = async (formData, rememberMe) => {
  const { email, password } = formData

  try {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      throw error
    }
    return user
  } catch (error) {
    console.error('Error signing in with email and password:', error)
    throw error
  }
}

export const logoutUser = () => supabase.auth.signOut()

export const resetUserPassword = async (email) => {
  const { error } = await supabase.auth.api.resetPasswordForEmail(email)
  if (error) throw error
}
