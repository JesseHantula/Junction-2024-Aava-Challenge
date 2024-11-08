import { useMutation, useApolloClient } from '@apollo/client'
import { TOKENAUTH } from '../graphql/mutations'
import useAuthStorage from '../hooks/useAuthStorage'
import { useNavigation } from '@react-navigation/native'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigation = useNavigation()
  const [mutate, result] = useMutation(TOKENAUTH)

  const signIn = async ({ userIdentifier, password }) => {
    const isEmail = userIdentifier.includes('@')
    const variables = {
      password,
      ...(isEmail ? { email: userIdentifier } : { username: userIdentifier })
    }
    const { data } = await mutate({ variables })
    console.log('data inside useSignIn:', data)

    if (data?.tokenAuth?.token && data?.tokenAuth?.user?.verified) {
      console.log('data inside SignIn:', data.tokenAuth.token)
      await authStorage.setAccessToken(data.tokenAuth.token)
      await apolloClient.resetStore()
    } else if (data?.tokenAuth?.token && !data?.tokenAuth?.user?.verified) {
      await authStorage.setAccessToken(data.tokenAuth.token)
      navigation.navigate('Verify', { username: 'John Doe', email: data.tokenAuth.user.email })
    }
    console.log('data outside SignIn:', data)
    return data
  }

  return [signIn, result]
}

export default useSignIn
