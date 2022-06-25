import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useAuthProtection = () => {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (!auth.user) {
      router.replace('/')
    }
  }, [auth.user, router])

  return auth.user
}

export default useAuthProtection
