import '@/styles/globals.css'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { useEffect, useState } from 'react'
import { firebaseApp } from '@/firebase/init'
import { getAnalytics, initializeAnalytics } from 'firebase/analytics'
import GetCurrentUser from '@/components/elements/GetCurrentUser'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  setAuthenticated,
  setUserData,
  setUserProfilePic,
} from '@/redux/slices/auth'

function App({ Component, pageProps }) {
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
              store.dispatch(setAuthenticated())
              store.dispatch(setUserData(currentUser.displayName))
              store.dispatch(setUserProfilePic(currentUser.photoURL))
            }
            setInit(true)
          },
          reject,
        )
      }).then((currentUser) => {
        if (currentUser) {
          store.dispatch(setAuthenticated())
          store.dispatch(setUserData(currentUser.displayName))
          store.dispatch(setUserProfilePic(currentUser.photoURL))
        }
      })
    } else {
      setRender(true)
    }

    // const checkUser = localStorage.getItem('auth_user')
    // if (checkUser) {
    //   store.dispatch(setAuthenticated())
    // }
    // const unsubscribe = firebaseGetAuthorizedUser()
    // return () => unsubscribe
  }, [render])

  return (
    init && (
      <Provider store={store}>
        <GetCurrentUser />
        <Component {...pageProps} />
      </Provider>
    )
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
