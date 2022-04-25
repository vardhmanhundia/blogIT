import {gql} from "apollo-server";

export const postSchema = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    User: User!
  }

  type PostPayload {
    userError: [UserError!]!
    post: Post
  }
`;
