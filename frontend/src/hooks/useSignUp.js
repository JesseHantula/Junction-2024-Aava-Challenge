import { useMutation } from '@apollo/client'
import { SIGNUP } from '../graphql/mutations'
import useAuthStorage from '../hooks/useAuthStorage'
import { useNavigation } from '@react-navigation/native'

export const useSignUp = () => {
  const authStorage = useAuthStorage()
  const navigation = useNavigation()
  const [mutate, result] = useMutation(SIGNUP)

  const signUp = async ({ email, password1, password2 }) => {
    const { data } = await mutate({
      variables: {
        email,
        password1,
        password2
      }
    })
    console.log('data inside useSignUp:', data?.register)

    if (data?.register?.token) {
      console.log('data inside SignUp:', data.register.token)
      await authStorage.setAccessToken(data.register.token)
      navigation.navigate('Verify', { username: 'John Doe', email })
    }
    console.log('data outside SignUp:', data)
    return data
  }

  return [signUp, result]
}
