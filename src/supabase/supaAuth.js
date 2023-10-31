import supabase from '@/supabase/app'
import { useState, useEffect } from 'react'

export const useSupabaseAuth = () => {
  const [supabaseUser, setSupabaseUser] = useState(null)

  useEffect(() => {
    // Oturum durumundaki değişiklikleri dinleyen listener.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSupabaseUser(session?.user || null)
      },
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  // ... (diğer fonksiyonlarınız)

  return {
    user: supabaseUser,
    setSupabaseUser,
    // Diğer fonksiyonlarınızı da burada döndürebilirsiniz.
  }
}

export const signUpWithSupabase = async (
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

export const signUpWithGoogleSupabase = async () => {
  const { user, error } = await supabase.auth.signIn({
    provider: 'google',
  })

  if (error) throw error
  return user
}

export const signInWithSupabase = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  })

  if (error) throw error
  return user
}

export const signInWithGoogleSupabase = async () => {
  const { user, error } = await supabase.auth.signIn({
    provider: 'google',
  })

  if (error) throw error
  return user
}

export const signOut = () => supabase.auth.signOut()
