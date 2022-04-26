import {gql} from "@apollo/client";

export const GET_POSTS = gql`
  query {
    Posts {
      title
      content
      createdAt
      User {
        name
      }
    }
  }
`;
