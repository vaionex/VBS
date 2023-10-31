import supabase from './app'

export const signUpWithSupabase = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
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
