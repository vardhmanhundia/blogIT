import {gql} from "apollo-server";

export const authSchema = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    User: User!
  }

  type AuthPayload {
    userError: [UserError!]
    token: String
  }
`;
