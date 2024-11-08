import { useEffect } from 'react'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const SignOut = () => {
  const authStorage = useAuthStorage()
  const client = useApolloClient()

  useEffect(() => {
    const signOut = async () => {
      await authStorage.removeAccessToken()
      await client.resetStore()
    }
    signOut()
  }, [authStorage, client])

  return null
}

export default SignOut
