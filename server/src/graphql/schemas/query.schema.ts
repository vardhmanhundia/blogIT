import {gql} from "apollo-server";

export const querySchema = gql`
  type Query {
    posts: [Post!]!
    me: User
    Profile(userId: ID!): Profile
  }
`;
