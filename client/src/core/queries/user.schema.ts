import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(credentials: {
      password: $email,
      email: $password
    }) {
      userErrors {
        message
      }
      token
    }
  }
`

export const SIGNUP = gql`
  mutation SignUp($email: String!, $password: String!, $bio: String!) {
    signup(credentials: {
      password: $email,
      email: $password
      bio: $bio
      name: $name
    }) {
      userErrors {
        message
      }
      token
    }
  }
`