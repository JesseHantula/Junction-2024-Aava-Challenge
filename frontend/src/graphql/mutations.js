import { gql } from '@apollo/client'

export const TOKENAUTH = gql`
  mutation TokenAuth($username: String, $email: String, $password: String!) {
    tokenAuth(username: $username, email: $email, password: $password) {
      success
      errors
      token
      refreshToken
      user {
        email
        verified
      }
    }
  }
`

export const SIGNUP = gql`
  mutation Register($email: String!, $password1: String!, $password2: String!) {
    register(email: $email, password1: $password1, password2: $password2) {
      success
      errors
      token
      refreshToken
    }
  }
`
