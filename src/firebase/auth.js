import { useState, useEffect } from 'react'
import { app } from './app'

export const auth = app.auth()

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
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
    const unsubscribe = auth().onAuthStateChanged(authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
  }
}
