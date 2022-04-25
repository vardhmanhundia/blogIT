import {gql} from "apollo-server";

export const AuthInputs = gql`
  input CredentialsInput {
    email: String!
    password: String!
  }
`;
