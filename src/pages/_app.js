import '@/styles/globals.css'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { useEffect } from 'react'
import { firebaseApp } from '@/firebase/init'
import { getAnalytics, initializeAnalytics } from 'firebase/analytics'
import GetCurrentUser from '../components/layout/elements/GetCurrentUser'

function App({ Component, pageProps }) {
  useEffect(() => {
    //firebase setup
    initializeAnalytics(firebaseApp)
    getAnalytics(firebaseApp)

    // const checkUser = localStorage.getItem('auth_user')
    // if (checkUser) {
    //   store.dispatch(setAuthenticated())
    // }
    // const unsubscribe = firebaseGetAuthorizedUser()
    // return () => unsubscribe
  }, [])

  return (
    <Provider store={store}>
      <GetCurrentUser />
      <Component {...pageProps} />
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
