import '@/styles/globals.css'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { useEffect } from 'react'
// import { firebaseGetAuthorizedUser } from '@/firebase/utils'

function App({ Component, pageProps }) {
  useEffect(() => {
    // const checkUser = localStorage.getItem('auth_user')
    // if (checkUser) {
    //   store.dispatch(setAuthenticated())
    // }
    // const unsubscribe = firebaseGetAuthorizedUser()
    // return () => unsubscribe
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
