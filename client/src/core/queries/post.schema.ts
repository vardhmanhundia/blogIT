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

export const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

export const UNPUBLISH_POST = gql`
  mutation UnPublishPost($postId: ID!) {
    postUnublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    postCreate(post: {
      title: $title,
      content: $content
    }) {
      post {
        title
        content
        published
        createdAt
        user {
          name
        }
      }
    }
  }
`
