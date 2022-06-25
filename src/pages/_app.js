import '@/styles/globals.css'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import GetCurrentUser from '@/presets/elements/GetCurrentUser'
import AuthComponent from '@/components/auth'

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthComponent>
        <GetCurrentUser />
        <Component {...pageProps} />
      </AuthComponent>
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
