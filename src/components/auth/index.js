/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { firebaseApp } from '@/firebase/init'
import { getAnalytics, initializeAnalytics } from 'firebase/analytics'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { setAuthenticated, setUserData } from '@/redux/slices/auth'
import { useDispatch } from 'react-redux'

const AuthComponent = ({ children }) => {
  const dispatch = useDispatch()
  const [render, setRender] = useState(false)
  const [init, setInit] = useState(false)

  useEffect(() => {
    //firebase setup
    if (render) {
      initializeAnalytics(firebaseApp)
      getAnalytics(firebaseApp)
      const auth = getAuth()
      // eslint-disable-next-line no-undef
      new Promise((resolve, reject) => {
        resolve(auth.currentUser)
        const unsubscribe = onAuthStateChanged(
          auth,
          (currentUser) => {
            unsubscribe()
            resolve(currentUser)
            if (currentUser) {
              dispatch(setAuthenticated())
              dispatch(
                setUserData({
                  name: currentUser.displayName,
                  uid: currentUser.uid,
                  email: currentUser.email,
                  photoURL: currentUser.photoURL,
                }),
              )
            }
            setInit(true)
          },
          reject,
        )
        return () => unsubscribe
      }).then((currentUser) => {
        if (currentUser) {
          dispatch(setAuthenticated())
          dispatch(
            setUserData({
              name: currentUser.displayName,
              uid: currentUser.uid,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
            }),
          )
        }
      })
    } else {
      setRender(true)
    }
  }, [render])

  return init && <>{children}</>
}

export default AuthComponent
