import React, { useState } from 'react'
import Text from '../components/Text'
import { Formik } from 'formik'
import FormikTextInput from '../components/FormikTextInput'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import theme from '../theme'
import * as yup from 'yup'
import { useSignUp } from '../hooks/useSignUp'
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
  email: yup.string().email('Invalid email').required('Email is required'),
  password1: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 charqacter long.')
    .max(50, 'Password must be maximum 50 characters long.'),
  password2: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password1'), null], "Password confirmation doesn't match the password.")
})

const SignUp = () => {
  const [signUp] = useSignUp()
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState(null)

  const onSubmit = async (values) => {
    const { email, password1, password2 } = values

    try {
      const data = await signUp({ email, password1, password2 })
      if (data.register.success === false) {
        setErrorMessage(Object.values(data.register.errors))
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
      <Formik initialValues={{ email: '', password1: '', password2: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => (
          <View style={styles.top}>
            <FormikTextInput name="email" placeholder="Email" style="inputBox" />
            <FormikTextInput name="password1" placeholder="Password" secureTextEntry />
            <FormikTextInput name="password2" placeholder="Password confirmation" secureTextEntry />
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.submitBox}>Sign up</Text>
            </TouchableOpacity>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          </View>
        )}
      </Formik>
    </View>
  )
}

export default SignUp
