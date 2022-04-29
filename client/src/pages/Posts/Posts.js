import React from "react";
import Post from "../../components/Post/Post";
import {gql, useQuery} from "@apollo/client";
import {GET_POSTS} from "../../core/queries/post.schema";

export default function Posts() {
  const {data, error, loading} = useQuery(GET_POSTS);
  console.log(data, error, loading);

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  if (data) {
    const {posts} = data;
    return (
      <div>
        {posts.map((post) => (
          <Post
            title={post.title}
            content={post.content}
            date={post.createdAt}
            id={post.id}
            user={post.user}
            published={post.published}
          />
        ))}
      </div>
    );
  }
  return <div></div>;
}
