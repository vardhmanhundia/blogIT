import {useMutation} from "@apollo/client";
import React from "react";
import {PUBLISH_POST, UNPUBLISH_POST} from "../../core/queries";
import "./Post.css";

const getShortDate = (date) => {
  const formatedDate = new Date(Number(date));

  return `${formatedDate}`.split(" ").splice(0, 3).join(" ");
};

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const [publishPost, {data, loading}] = useMutation(PUBLISH_POST);
  const [unpublishPost, {data, loading}] = useMutation(UNPUBLISH_POST);

  return (
    <div
      className="Post"
      style={published === false ? {backgroundColor: "hotpink"} : {}}
    >
      {isMyProfile ? (
        <p
          className="Post__publish"
          onClick={() => {
            published
              ? unpublishPost({
                  variables: {
                    postId: id,
                  },
                })
              : publishPost({
                  variables: {
                    postId: id,
                  },
                });
          }}
        >
          {published ? "unpublish" : "publish"}
        </p>
      ) : (
        <p></p>
      )}

      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {getShortDate(date)} by {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
