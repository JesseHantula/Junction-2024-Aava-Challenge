import React, { useState } from 'react'
import Text from '../components/Text'
import { Formik } from 'formik'
import FormikTextInput from '../components/FormikTextInput'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import theme from '../theme'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigation } from '@react-navigation/native'

const styles = StyleSheet.create({
  submitBox: {
    color: '#ffffff',
    fontWeight: theme.fontWeights.bold,
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 3,
    padding: 10,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    fontFamily: theme.fonts
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  },
  top: {
    marginTop: 50
  }
})

const validationSchema = yup.object().shape({
  userIdentifier: yup.string().required('Username or Email is required'),
  password: yup.string().required('Password is required')
})

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState(null)

  const onSubmit = async (values) => {
    const { userIdentifier, password } = values

    try {
      const data = await signIn({ userIdentifier, password })
      if (data.tokenAuth.success === false) {
        setErrorMessage(data.tokenAuth.errors.message)
        console.log('error message:', errorMessage)
      } else {
        setErrorMessage(null)
        console.log('data at the other side:', data)
      }
    } catch (e) {
      console.log(e)
      setErrorMessage('An error occurred. Please try again.')
    }
  }

  return (
    <View>
      <Formik initialValues={{ userIdentifier: '', password: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => (
          <View style={styles.top}>
            <FormikTextInput name="userIdentifier" placeholder="Username or Email" style="inputBox" testID="user-identifier" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry testID="password-input" />
            <TouchableOpacity onPress={handleSubmit} testID="log-in-button">
              <Text style={styles.submitBox}>Log in</Text>
            </TouchableOpacity>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          </View>
        )}
      </Formik>
    </View>
  )
}

export default SignIn
