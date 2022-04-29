import {useQuery} from "@apollo/client";
import React from "react";
import {useParams} from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";
import {GET_PROFILE} from "../../core/queries";

export default function Profile() {
  const {id} = useParams();

  const {data, error, loading} = useQuery(GET_PROFILE, {
    variables: {
      userId: id,
    },
  });

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  const {profile} = data;

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{profile.user.name}</h1>
          <p>{profile.bio}</p>
        </div>
        <div>{profile.isMyProfile ? <AddPostModal /> : null}</div>
      </div>
      <div></div>
    </div>
  );
}
