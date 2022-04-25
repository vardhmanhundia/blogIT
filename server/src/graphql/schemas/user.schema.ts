import {gql} from "apollo-server";

export const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    Profile: Profile!
    Posts: [Post!]!
  }
`;
