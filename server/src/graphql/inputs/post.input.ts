import {gql} from "apollo-server";

export const PostInput = gql`
  input PostInputPayload {
    title: String
    content: String
  }
`;
