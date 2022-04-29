import {gql} from "apollo-server";

export const mutationSchema = gql`
  type Mutation {
    postCreate(post: PostInputPayload!): PostPayload!
    postUpdate(id: ID!, post: PostInputPayload!): PostPayload!
    postDelete(id: ID!): Boolean!
    signUp(credentials: CredentialsInput, name: String!, bio: String!): AuthPayload!
    signIn(credentials: CredentialsInput): AuthPayload!
  }
`;
