import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const useAuthProtection = () => {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  React.useEffect(() => {
    if (!auth.user) {
      router.replace('/')
    }
  }, [auth.user, router])

  return auth.user
}

export default useAuthProtection
