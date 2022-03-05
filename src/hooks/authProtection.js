import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NotLoggedIn = () => {
  return <div></div>
}

const WithAuthProtection = (Component) => {
  const Authenticated = () => {
    const router = useRouter()
    const auth = useSelector((state) => state.auth)

    useEffect(() => {
      if (!auth.user) {
        router.replace('/')
      }
    }, [auth.user, router])

    return auth.user ? <Component /> : <NotLoggedIn />
  }

  return Authenticated
}

export default WithAuthProtection
