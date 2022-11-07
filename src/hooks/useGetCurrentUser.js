import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getwalletDetails } from '@/services/relysia-queries'
import { onIdTokenChanged } from 'firebase/auth'
import apiConfig from '@/config/relysiaApi'
import { firebaseAuth } from '@/firebase/init'

const useGetCurrentUser = () => {
  const dispatch = useDispatch()
  const userWalletRedux = useSelector((state) => state.wallet)

  React.useEffect(() => {
    try {
      onIdTokenChanged(firebaseAuth, (user) => {
        if (user) {
          console.log('get token id, iiiiiii')
          apiConfig.defaults.headers.common['authToken'] = user.accessToken
          getwalletDetails('00000000-0000-0000-0000-000000000000', dispatch)
        }
      })
    } catch (err) {
      console.log('err ', err.message, err.response)
    }
  }, [])

  return null
}

export default useGetCurrentUser
