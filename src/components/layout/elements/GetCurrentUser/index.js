import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getwalletDetails } from '../../../../services/relysia-queries'
import { onIdTokenChanged } from 'firebase/auth'
import apiConfig from '../../../../config/relysiaApi'
import { firebaseAuth } from '@/firebase/init'

function GetCurrentUser() {
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      onIdTokenChanged(firebaseAuth, (user) => {
        if (user) {
          apiConfig.defaults.headers.common['authToken'] = user.accessToken
          getwalletDetails('00000000-0000-0000-0000-000000000000', dispatch)
        }
      })
    } catch (err) {
      console.log('err ', err.message, err.response)
    }
  }, [])

  return <></>
}

export default GetCurrentUser
