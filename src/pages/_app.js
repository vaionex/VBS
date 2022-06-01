import '@/styles/globals.css'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { useEffect, useState } from 'react'
import { firebaseApp } from '@/firebase/init'
import { getAnalytics, initializeAnalytics } from 'firebase/analytics'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { setAuthenticated, setUserData } from '@/redux/slices/auth'
import GetCurrentUser from '@/presets/elements/GetCurrentUser'

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
              store.dispatch(
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
          store.dispatch(setAuthenticated())
          store.dispatch(
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
